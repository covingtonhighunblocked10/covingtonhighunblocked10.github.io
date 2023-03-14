const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const app = express();
// Set up middleware to serve static files (e.g. CSS, images) 
app.use(express.static('public'));
// Set up middleware to parse JSON and URL encoded data 
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
const port = process.env.PORT || 3000;
const serverUrl = `http://localhost:${port}`;
// Route to handle incoming search requests 
app.post('/search', (req, res) => {
    const {
        url
    } = req.body;
    // Make request to external website 
    request(url, (error, response, body) => {
        if (error || response.statusCode !== 200) {
            res.status(400).send('Error retrieving website.');
        } else {
            const $ = cheerio.load(body);
            // Get all external resources (e.g. CSS, JavaScript, images) and replace URLs to use server URL instead 
            $('link[href], script[src], img[src]').each(function () {
                const originalUrl = $(this).attr('href') || $(this).attr('src');
                const newUrl = `${serverUrl}/proxy?url=${encodeURIComponent(originalUrl)}`;
                $(this).attr('href', newUrl);
                $(this).attr('src', newUrl);
            });
            // Add an overlay with server information to the body 
            $('body').append(` <div style="position: fixed; top: 0; left: 0; background-color: #222; color: #fff; padding: 5px;"> Server is running on port ${port} </div> `);
            // Return modified HTML 
            res.send($.html());
        }
    });
});
// Route to handle proxy requests 
app.get('/proxy', (req, res) => {
    const url = decodeURIComponent(req.query.url);
    // Make request to external resource 
    request.get(url).pipe(res);
});
// Start server 
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});