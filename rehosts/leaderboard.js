//!$(document).ready(runProgram)
//!function runProgram() {
    var leaderboard = {
        tetris: {
            top: [0, 0, 0, 0, 0 ],
            scores: [{
                "Jonathan": {
                    name: "Jonathan",
                    score: 4527,
                }
            }],
            names: ["Jonathan", ]
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
    function existingPlayer (name, score, game) {
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
        leaderboard[game].scores.push(new player(name, score))
    }

    function sortScores(array) {
        var arrayNames = []
        for (var i in array) {
            arrayNames.push(array[i])
        }
        alert(arrayNames);
    }
    console.log(leaderboard.tetris.scores[0])
//!}
