//!$(document).ready(runProgram)
//!!function runProgram() {
var leaderboard = {
    tetris: {
        top: [],
        scores: {},
        names: []
    },
    dino: {
        top: [],
        scores: {},
        names: [],
    },

    textChange: function (ID, TEXT) {
        $(ID).text(TEXT)
    },

}
function newPlayer(name, score, game) {
    //carpet function for new players//

    //add object to leaderboard
    leaderboard[game].scores[name] = {
        score: score,
    }
    //add name to array
    leaderboard[game].names.push(name)
}

function selectionSort(inputArr, prop) {
    let n = inputArr.length;
    for (let i = 0; i < n; i++) {
        // Finding the smallest number in the subarray
        let min = i;
        for (let j = i + 1; j < n; j++) {
            if (inputArr[j][prop] > inputArr[min][prop]) {
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
        var name = leaderboard[game].names[i];
        var score = leaderboard[game].scores[name].score
        console.log(name)
        console.log(score)
        //alert("Index: " + i + "\r" + "Name: " + name + "\r" + "Score: " + score)
    }
    console.log("end")
}

function objsToArray(game) {
    var newArr = []
    var names = leaderboard[game].names
    var length = names.length
    console.log(names)
    for (var i = 0; i < length; i++) {
        newArr.push(leaderboard[game].scores[names[i]])
    }
    return (newArr);
}

function topFive(arr) {
    var array = arr.splice(0, 5)
    console.log(array)
    return (array)
}

//TETRIS SCORES
function leadTetris() {
    function addTetris() {
        newPlayer("Rowan", 209983, 'tetris')
        newPlayer("Remy", 128942, 'tetris')
        newPlayer("Jace", 90931, 'tetris')
        newPlayer("Benji", 41207, 'tetris')
        newPlayer("Jonah", 30672, 'tetris')
        newPlayer("Jayvyn", 10820, 'tetris')
    };
    addTetris();
}

//TREX GAME SCORES
function leadDino() {
    function addDino() {
        newPlayer("Jonathan", 4527, 'dino')
        newPlayer("Jayden", 4122, 'dino')
        newPlayer("Benji", 3289, 'dino')
        newPlayer("Jayvyn", 2460, 'dino')
        newPlayer("Remy", 2148, 'dino')
        newPlayer("Caleb", 1674, 'dino')
    };
    addDino();
}
leadTetris()
leadDino()
var x = objsToArray('tetris')
console.log(x)
selectionSort(x, "score")
console.log(x)




//!}