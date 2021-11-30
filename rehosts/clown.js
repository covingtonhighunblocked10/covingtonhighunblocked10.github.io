//modules//
const fs = require("fs");
const {
    stdout
} = require("process");
const {
    setInterval,
    setTimeout
} = require("timers/promises");

/////////////////////////
//Variable Declarations//
/////////////////////////
var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
var characters = [".", ",", "/", "<", ">", "?", "'", '"', ":", ";", "[", "]", "{", "}", "|", "=", "+", "-", "_", ")", "(", "*", "&", "^", "%", "$", "#", "@", "!", "~", "`"]
var printActive = false

////////////////////////////////////
//Timing and Screen Update Speeds//
///////////////////////////////////

{ //clear previous interval
    clearInterval(interval);
    //rate of updates
    var updateRate = 1;
    //updates per second
    var UPS = 1000 / updateRate;
    //loop to update
    var interval = setInterval(updateScreen, 1000);

    ////////////////////
    //Game Update Loop//
    ////////////////////
    function updateScreen() {
        getRandomLines(9999, 9999, 100)
    }
}
/////////////////////////////////////////
//Haha Hehe Funny Functions Go BRRRRRRR//
/////////////////////////////////////////
function getRandomLines(digits, lines, delay) {
    var temp = ""
    var line = ""
    for (var x = 0; x < lines; x++) {
        for (var i = 0; i < digits; i++) {
            if (printActive)
                arr = Math.round(Math.random() * 3)
            if (arr === 1) {
                temp = letters[getRandom(letters.length - 1)]
            }
            if (arr === 2) {
                temp = numbers[getRandom(numbers.length - 1)]
            }
            if (arr === 3) {
                temp = characters[getRandom(characters.length - 1)]
            }
            //stdout.write(temp);
            $("#matrix").text(line)
            line += temp
            temp = ""
            wait(delay);
        }
        line = temp
        temp = ""
        console.log(".")
    }
    console.log("finished");
}

function printMatrix(length, minDelay, randomDelay) {
    var temp = ""
    var line = ""
    for (var i = 0; i < length; i++) {
        if (printActive) {
            arr = Math.round(Math.random() * 3)
            if (arr === 1) {
                temp = letters[getRandom(letters.length - 1)]
            }
            if (arr === 2) {
                temp = numbers[getRandom(numbers.length - 1)]
            }
            if (arr === 3) {
                temp = characters[getRandom(characters.length - 1)]
            }
            //stdout.write(temp);
            $("#matrix").text(line);
            line += temp
            temp = ""
            wait(minDelay - getRandom(randomDelay));
        }
    }
}

function getRandom(max) {
    return (Math.round(Math.random() * max))
}

function wait(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

/*function foreverLoop() {
    for (var i = 2; i < 1; i++) {
        getRandomLines(50000, 1, 1000 / (200 + getRandom(150)))
        console.log("done")
    }
}*/

function toggle(variable) {
    if (variable) {
        variable = false;
    } else if (!variable) {
        variable = true
    }
    console.log(variable);
}
function startPrint () {
    printActive = true;
    printMatrix(99999999999, 0, 99);
}
//?foreverLoop()
//!getRandomLines(50000, 1, 1000 / (200 + getRandom(150)))
$("#start").on("click", startPrint())
$("#toggle").on("click", toggle(printActive))