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
}

function textChange(id, text) {
    $(id).text(text)
};

function newPlayer(name, score, game) {
    //add object to leaderboard game
    leaderboard[game].scores[name] = {
        name: name,
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
    //console.log(names)
    for (var i = 0; i < length; i++) {
        var entry = leaderboard[game].names[i]
        //console.log(entry)
        newArr.push(leaderboard[game].scores[entry])
    }
    return (newArr);
}

function topFive(arr) {
    var array = arr.splice(0, 5)
    //console.log(array)
    return (array)
}

//USE TO RETRIEVE STATS
function playerStat(g, pr, pl) {
    //g is game, pl is player, pr is property to return
    var game = g;
    var player = pl ? pl : "All";
    var prop = pr ? pr : "none"
    if (prop === "Score") {
        return leaderboard[game].scores[player].score;
    } else if (prop === "All_Scores") {
        return leaderboard[game].scores
    } else if (prop === "Player_Name") {
        return leaderboard[game].scores[player].name
    } else if (prop === "All_Names") {
        return leaderboard[game].names
    } else if (prop === "Top") {
        return leaderboard[game].top
    } else if (prop === "none") {
        return ("No property inserted")
    }
}

function retrieveStats(game, prop, player) {
    var stats = playerStat(game, player, prop)
    console.log("Stats for " + player)
    console.log(stats)
}

function sortLeaderboard(game) {
    function sortScores(game) {
        var tempArray = objsToArray(game)
        //console.log("Sorting scores for " + game)
        //console.log("Unsorted Array: ")
        //console.log(tempArray)
        tempArray = selectionSort(tempArray, 'score')
        return (tempArray)
    }
    var newArr = sortScores(game)
    newArr = topFive(newArr)
    //console.log(newArr)
    return (newArr)
}

//append highScores
function setLeaderboard(game) {
    var newId = game
    var score, name, newText
    var temp = sortLeaderboard(game);
    console.log(temp)
    leaderboard[game].scores = temp
    var arr = leaderboard[game].scores
    var places = ["First", "Second", "Third", "Fourth", "Fifth"]
    for (var i = 0; i < 5; i++) {
        newId = "#" + newId + (i + 1)
        console.log(newId)
        name = arr[i].name
        score = arr[i].score
        newText = places[i] + ": " + leaderboard[game].scores[i].score + " (" + leaderboard[game].scores[i].name + ")"
        $(newId).text(newText)
        console.log(newText)
        //reset newId
        newId = game
    }
}
//setLeaderboard('tetris', )
//TETRIS SCORES
function leadTetris() {
    function addTetris() {
        //add players here
        newPlayer("Jayvyn", 10820, 'tetris')
        newPlayer("Jace", 90931, 'tetris')
        newPlayer("Benji", 41207, 'tetris')
        newPlayer("Rowan", 248205, 'tetris')
        newPlayer("Jonah", 71337, 'tetris')
        newPlayer("Remy", 264488, 'tetris') 
NewPlayer("Silas", 199722, 'tetris') 
NewPlayer("Gabriel", 150781, 'tetris')
    };
    addTetris();
    setLeaderboard('tetris')
}

//TREX GAME SCORES
function leadDino() {
    function addDino() {
        //here too
        newPlayer("Benji", 3289, 'dino')
        newPlayer("Caleb", 1674, 'dino')
        newPlayer("Jayden", 4122, 'dino')
        newPlayer("Jonathan", 4527, 'dino')
        newPlayer("Jayvyn", 2460, 'dino')
        newPlayer("Remy", 2148, 'dino')
    };
    addDino();
    setLeaderboard('dino')
}

//Node.js test code here \/ \/ \/ \/ \/

//retrieveStats('tetris', "All_Scores", "All_Scores")
//sortLeaderboard('tetris')
//retrieveStats('tetris', "All_Scores", "All_Scores")

//Finished December 1st 2021, 5:16PM

//Velkhana
