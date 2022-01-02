const fs = require("fs")
const {
    stringify
} = require("querystring")
const {
    setTimeout
} = require("timers/promises")

var text = ""
var preserveText = ""
var defaultValue = ""
var preserveBool
var path = "writeTest.js"
var finalTimeout = 0

function writeFile(path, value) {
    fs.writeFileSync(path, value, function (err) {
        if (err) {
            return console.log(err)
        } else {
            return (data)
        }
    })
}

function readFile(path) {
    var x;
    x = fs.readFileSync(path, {
        encoding: 'utf8',
        flag: 'r'
    }, function (err, data) {
        if (err) {
            return err;
        } else {
            return data
        }
    })
    console.log("'" + path + "' contents: " + x)
    return x;
}

//just a template for objects in the future
function newObject(key, value) {
    var data = '"' + key + '": "' + value + '", ';
    text += data;
}


function newText(value) {
    if (value !== "undefined" && value !== undefined) {
        text += value;
    } else if (value === "undefined" || value === undefined) {
        console.log("'undefined' found")
    }
}

function finalWrite(path, value) {
    var x = readFile(path);
    console.log("Timeout Complete, Results Printing");
    if (preserveBool) {
        newText(preserveText);
        console.log(text);
        var last = findLast(value, "}")
        text.slice(-1)
        writeFile(path, value);
    } else {
        writeFile(path, value)
    }

    console.log('Final Write Complete')
    console.log('Final Contents: ' + x)
    preserveText, text = ""
}

function wipeText(path) {
    //writeFile(path, "")
    text = ""
    finalWrite(path, text)
    console.log("Wipe completed")
    console.log(readFile(path))
}

function preserveOld(path) {
    //log state of preserveBool
    console.log("Preserve?: " + preserveBool)
    //define temp var
    var x;
    if (preserveBool) {
        //if the previous text should be saved
        //x is the temporary variable the document should be saved to
        x = readFile(path)
        if (x) {
            console.log("Preserve complete")
            newText(x);
        } else if (!x) {
            console.log("Issue occurred while preserving data, defaulting value to " + defaultValue)
            x = defaultValue
            console.log(x)
        };
        //return value of x

    } else if (!preserveBool) {
        //if the previous text should not be saved, wipe the file
        wipeText(path);
    };

}
//yep, lemme run it a few times to show you
function newLine() {
    text += "\r"
}

function findLast(string, find) {
    var lastIndex = string.lastIndexOf(find)
    return (lastIndex)
}

preserveBool = true;
preserveOld(path);
finalWrite(path, text)
//to be less close to function names
//just removing extra wait
//console.log("Start Timeout For " + finalTimeout / 1000 + " Seconds")
//setTimeout(finalTimeout, finalWrite(path, text))