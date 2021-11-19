$(document).ready(runJs);

function runJs() {
    var player = {
        score: 0,
        name: 0,
    };
    var leaderboard = {
        tetris: {
            top: [],
            scores: [{
                name: "x",
                score: 17
            }],
        },
        dino: {
            top: [],
            scores: [],
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

    function newScore(name, score, game) {
        if (leaderboard[game].scores.includes(name)) {
            //if existing player
            existingPlayer(name, score, game)
        } else if (!leaderboard[game].scores.includes(name)) {
            //if new player
            newPlayer(name, score, game);
        }
    }

    function existingPlayer(name, score, game) {
        leaderboard[game].scores[name] = score
    }

    function newPlayer(name, score, game) {
        //carpet function for new players
        var nm = name;
        var sc = score

        function create(nm, sc) {
            //constructor for new player
            this.info.name = nm;
            this.info.score = sc;
        };
        leaderboard[game].scores.push(new create(name, score))
    }

    function sortScores(array) {
        var arrayNames = []
        for (var i in array) {
            arrayNames.push(array[i])
        }
        alert(arrayNames);
    }
    sortScores([736, 183, 1351, 93, 1, 735, 9917, 0]);
}