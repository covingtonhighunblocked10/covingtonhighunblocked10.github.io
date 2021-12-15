$(document).ready(sortAll)
var leaderboard;
leaderboard = {
    x: 0
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
    for (var i = 0; i <= (leaderboard[game].names).length - 1; i++) {
        var name = leaderboard[game].scores[i].name
        var score = leaderboard[game].scores[i].score
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

function topArr(arr, length) {
    var array = arr.splice(0, length)
    //console.log(array)
    return (array)
}

//USE TO RETRIEVE STATS
function playerStat(g, pr, pl) {
    //g is game, pl is player, pr is property to return
    var game = g;
    var player = pl ? pl : game;
    var prop = pr ? pr : "none"
    if (prop === "Score") {
        return leaderboard[game].scores[player].score;
    } else if (prop === "All_Scores") {
        return leaderboard[game].scores
    } else if (prop === "Player_Name") {
        return leaderboard[game].scores[player].name
    } else if (prop === "All_Names") {
        return leaderboard[game].names
    } else if (prop === "none") {
        return ("No property inserted")
    }
}

function retrieveStats(game, prop, player) {
    var stats = playerStat(game, prop, player)
    console.log("Stats for " + player)
    console.log(stats)
}

function sortLeaderboard(game, length) {
    function sortScores(game) {
        var tempArray = objsToArray(game)
        tempArray = selectionSort(tempArray, 'score')
        return (tempArray)
    }
    var newArr = sortScores(game)
    console.log(newArr)
    newArr = topArr(newArr, length)
    //console.log(newArr)
    return (newArr)
}

//append highScores
function setLeaderboard(game, length) {
    var newId = game
    var temp = sortLeaderboard(game, length);
    //console.log(temp)
    leaderboard[game].scores = temp;
    var places = ["First", "Second", "Third", "Fourth", "Fifth"];
    for (var i = 0; i < (leaderboard[game].scores).length; i++) {
        newId = "#" + newId + (i + 1)
        console.log(newId)
        let newText = (places[i] + ": " + leaderboard[game].scores[i].score + " (" + leaderboard[game].scores[i].name + ")")
        //alert(newText)
        console.log(newText)
        //document.getElementById(newId).innerHTML = newText
        $(newId).text(newText)
        //console.log(newText)
        //reset newId
        newId = game
    }
    console.log()
}

function newGame(title) {
    leaderboard[title] = {
        top: [],
        scores: {},
        names: [],
    }
}

function leadTetris() {
    newGame('tetris')
    tetris()
    setLeaderboard('tetris', 5)
}

function leadDino() {
    newGame('dino')
    dino()
    setLeaderboard('dino', 5)
}

function leadEventDino() {
    newGame('dinoEvent')
    dinoEvent()
    setLeaderboard('dinoEvent', 3)
}

function leadEventTetris() {
    newGame('tetrisEvent')
    tetrisEvent()
    setLeaderboard('tetrisEvent', 3)
}

function tetris() {
    var game = 'tetris'
    newPlayer("Melon Man", 830561, game)
    newPlayer("Jayvyn", 10820, game)
    newPlayer("Jace", 90931, game)
    newPlayer("Benji", 41207, game)
    newPlayer("Rowan", 470536, game)
    newPlayer("Jonah", 71337, game)
    newPlayer("Remy", 805720, game)
    newPlayer("Silas", 199722, game)
    newPlayer("Gabriel", 150781, game)
    newPlayer("Chris", 171646, game)
    newPlayer("Loopysix246", 106949, game)
    newPlayer("Cameron", 174448, game)
    newPlayer("Hayden", 231092, game)
}

function dino() {
    var game = 'dino'
    //newPlayer("Gaylord(chaisse benson)", 69696969, game)
    newPlayer("Elyssa", 7667, game)
    newPlayer("Cameron Gauthier", 3806, game)
    newPlayer("Colton Watts", 2938, game)
    newPlayer("Benji", 3289, game)
    newPlayer("Jonathan", 4527, game)
    newPlayer("Jayden", 4122, game)
    newPlayer("Jayvyn", 4753, game)
    newPlayer("Caleb", 1674, game)
    newPlayer("Remy", 2148, game)
    newPlayer("Seth D.", 2459, game)
    newPlayer("Bill", 10255, game)
    newPlayer("Jace E.", 7691, game)
    newPlayer("Jacob", 5362, game)
    //newPlayer("Gaylord(chaisse benson)", 69696969, game)
}

function tetrisEvent() {
    var game = 'tetrisEvent'
    newPlayer("Melon Man", 830561, game)
    newPlayer("Cameron", 174448, game)
    newPlayer("Rowan", 470536, game)
    newPlayer("Remy", 805720, game)
    newPlayer("Chris", 171646, game)
    newPlayer("Loopysix246", 106949, game)
    newPlayer("Hayden", 231092, game)
}

function dinoEvent() {
    var game = 'dinoEvent'
    //newPlayer("Gaylord(chaisse benson)", 69696969, game)
    newPlayer("Elyssa", 7667, game)
    newPlayer("Cameron Gauthier", 3806, game)
    newPlayer("Colton Watts", 2938, game)
    newPlayer("Jayvyn", 4753, game)
    newPlayer("Seth D.", 2459, game)
    newPlayer("Bill", 10255, game)
    newPlayer("Jace E.", 7691, game)
    newPlayer("Jacob", 5362, game)
}

function sortAll() {
    console.log("start sortAll")
    leadTetris()
    leadDino()
    leadEventDino()
    leadEventTetris()
    console.log("Finish")
}
/* leadEventDino()
leadEventTetris()
leadTetris()
leadDino()
retrieveStats('tetrisEvent', "All_Scores") */
//Finished December 1st 2021, 5:16PM

//Velkhana
