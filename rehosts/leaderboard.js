//!$(document).ready(runProgram)
//!!function runProgram() {
var leaderboard = {
    tetris: {
        top: [],
        add: function () {
            addScore("Rowan", 209983, 'tetris')
            addScore("Remy", 128942, 'tetris')
            addScore("Jace", 90931, 'tetris')
            addScore("Benji", 41207, 'tetris')
            addScore("Jonah", 30672, 'tetris')
            addScore("Jayvyn", 10820, 'tetris')
        },
        scores: {
            /*Rowan: {
                name: "Rowan",
                score: 209983,
            },
            Remy: {
                name: "Remy",
                score: 128942,
            },
            Jace: {
                name: "Jace",
                score: 90931,
            },
            Benji: {
                name: "Benji",
                score: 41207,
            },
            Jonah: {
                name: "Jonah",
                score: 30672,
            },
            Jayvyn: {
                name: "Jayvyn",
                score: 10820,
            }*/
        },
        names: ["Rowan", "Remy", "Jace", "Benji", "Jonah", "Jayvyn"]
    },
    dino: {
        top: [],
        scores: {
            Jonathan: {
                score: 4527,
            },
            Jayden: {
                score: 4122,
            },
            Benji: {
                score: 3289,
            },
            Jayvyn: {
                score: 2460,
            },
            Remy: {
                score: 2148,
            },
            Caleb: {
                score: 1674,
            },
            Ben: {
                score: 1334,
            },
        },
        names: ["Jonathan", "Jayden", "Benji", "Jayvyn", "Remy", "Caleb", "Ben"],
    },

    sort: function (array) {
        function selectionSort(inputArr) {
            let n = inputArr.length;
            for (let i = 0; i < n; i++) {
                // Finding the smallest number in the subarray
                let min = i;
                for (let j = i + 1; j < n; j++) {
                    if (inputArr[j] < inputArr[min]) {
                        min = j;
                    }
                }
                if (min != i) {
                    // Swapping the elements
                    let tmp = inputArr[i];
                    inputArr[i] = inputArr[min];
                    inputArr[min] = tmp;
                }
            }
            return inputArr;
        }
    },

    textChange: function (id, text) {
        $(id).text(text)
    },

}

function existingPlayer(name, score, game) {
    leaderboard[game].scores[name].score = score
}

function addScore(name, score, game) {
    /*
    !?
    if (leaderboard[game].names.includes(name)) {
        //if existing player
        existingPlayer(name, score, game)
    } else if (!leaderboard[game].names.includes(name)) {
        //if new player
        !?
        */
    newPlayer(name, score, game);
    //!?}
    console.log(leaderboard[game].scores[name])
}

function newPlayer(name, score, game) {
    //carpet function for new players

    //add object to leaderboard
    leaderboard[game].scores = {
        name: name,
        score: score,
    }
    //add name to array
    leaderboard[game].names.push(name)
}

function selectionSort(inputArr, secondaryArr) {
    let n = inputArr.length;
    var temp = secondaryArr;
    for (let i = 0; i < n; i++) {
        // Finding the smallest number in the subarray
        let min = i;
        for (let j = i + 1; j < n; j++) {
            if (inputArr[j] < inputArr[min]) {
                min = j;
            }
        }
        if (min != i) {
            // Swapping the elements
            let tmp = inputArr[i];
            inputArr[i] = inputArr[min];
            inputArr[min] = tmp;

        }
    }
    return inputArr;
}

function printGameScores(game) {
    console.log("start")
    for (var i = 0; i < (leaderboard[game].names).length; i++) {
        var name = leaderboard[game].names[i]
        console.log(name)
        console.log(leaderboard[game].scores[name])
    }
    console.log("end")
}


//ADD SCORES HERE
//addScore(playerName, playerScore, game)
leaderboard.tetris.scores.add()
printGameScores('tetris')
//!}