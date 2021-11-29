const fs = require("fs")

var text = ""
var preserveText = ""
var preserveBool = true
var path = "test69.js"

function writeFile(path, value) {
    fs.writeFile(path, value, (err) => {
        // In case of a error throw err.
        if (err) throw err;
    })
}

function readFile(path) {
    fs.readFile(path, {
            encoding: 'utf8',
            flag: 'r'
        },
        function (err, data) {
            if (err) {
                console.log(err);
            } else {
                //console.log(data);
                return (data)
            }
        });
}

function newObject(key, value) {
    var data = '"' + key + '": "' + value + '", ';
    text += data;
}

function newText(value) {
    var data = value;
    text += data;
}

function finalWrite(path, value) {
    if (preserveBool) {
        newLine()
        text += preserveText
        writeFile(path, value)
    } else {
        writeFile(path, value)
    }
    console.log("write complete")
}

function wipeText(path) {
    //writeFile(path, "")
    text = ""
    finalWrite(path, text)
}

function preserveOld(tf) {
    if (tf === true) {
        preserveBool = true
        preserveText = readFile(path)
        console.log(preserveText)
        return preserveText;
    } else {
        preserveBool = false
        console.log("do not preserve")
    };
    if (preserveText !== "") {
        console.log("preserve complete")
    } else {
        console.log("issue occurred while preserving data")
    }
}

function newLine() {
    text += "\r"
}
//shazam("fuck?", "me")
/*addText("Brain?", "obliterated")
newLine()
addText("Brain?", "obliterated")
newLine()
shazam(text);
readFile("test.txt")*/
{
    var leaderboard = {
        tetris: {
            top: [1, 2, 3, 4],
            scores: [5, 6, 7, 8],
            names: [9, 10, 11, 12],
        },
        dino: {
            top: [],
            scores: [],
            names: [],
        },

        sort: function (array) {
            [array].sort(function (a, b) {
                if (a > b) return 1;
                if (a < b) return -1;
                return 0;
            })
        },

        textChange: function (id, text) {
            $(id).text(text)
        },
    }
    class player {
        //class for any player
        constructor(name, score) {
            this.name = name;
            this.score = score;
        }
        /*  
            Outline for storage
            [{
            name: {
                score: x
            }
        }]*/
    }


    function existingPlayer(name, score, game) {
        leaderboard[game].scores[name].score = score
    }

    function addScore(name, score, game) {
        if (leaderboard[game].names.includes(name)) {
            //if existing player
            existingPlayer(name, score, game)
        } else if (!leaderboard[game].names.includes(name)) {
            //if new player
            newPlayer(name, score, game);
        }
    }

    function newPlayer(name, score, game) {
        //carpet function for new players
        var x = new player(name, score)
        console.log(x)
        leaderboard[game].names.push(name)
        //leaderboard[game].scores.push(new player(name, score))

    }

    function sortScores(array) {
        var arrayNames = []
        for (var i in array) {
            arrayNames.push(array[i])
        }
        alert(arrayNames);
    }
}
/*newPlayer("jace", 37451, "tetris")
console.log(leaderboard)
*/
preserveOld(true)
newText("hello world");
newLine();
finalWrite(path, text);
readFile(path);