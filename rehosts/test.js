const fs = require("fs")

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
            if (err)
                console.log(err);
            else
                console.log(data);
        });
}
var text = ""

function addText(key, value) {
    var data = '"' + key + '": "' + value + '", '
    text += data
}

function shazam(value) {
    writeFile("test.txt", value)
}

function wipeFile(path) {
    writeFile(path, "")
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
        this.name.score = score;
    }
    /*  [{
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
    leaderboard[game].names.push(name)
    leaderboard[game].scores[leaderboard[game].scores.length].push(new player(name, score))
}

function sortScores(array) {
    var arrayNames = []
    for (var i in array) {
        arrayNames.push(array[i])
    }
    alert(arrayNames);
}
newPlayer("jace", 37451, "tetris")
console.log(leaderboard)