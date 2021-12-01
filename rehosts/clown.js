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
var printActive

////////////////////////////////////
//Timing and Screen Update Speeds//
///////////////////////////////////

/*{ //clear previous interval
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
}*/
/////////////////////////////////////////
//Haha Hehe Funny Functions Go BRRRRRRR//
/////////////////////////////////////////

/*function getRandomLines(digits, lines, delay) {
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
            $(id).html(line);
            line += temp;
            temp = "";
            wait(delay);
        }
        line = temp
        temp = ""
        console.log(".")
    }
    console.log("finished");
}*/
var Clock = {
    totalSeconds: 0,
    start: function () {
        if (!this.interval) {
            var self = this;

            function pad(val) {
                return val > 9 ? val : "0" + val;
            }
            this.interval = setInterval(function () {
                self.totalSeconds += 1;
            }, 1000);
        }
    },

    reset: function () {
        Clock.totalSeconds = null;
        clearInterval(this.interval);
        delete this.interval;
    },
    pause: function () {
        clearInterval(this.interval);
        delete this.interval;
    },

    resume: function () {
        this.start();
    },

    restart: function () {
        this.reset();
        Clock.start();
    }
};

function printMatrix(length, minDelay, randomDelay, searchText) {
    var temp = "";
    var line = "";
    var arr, probability;
    probability = chance(searchText.length)
    for (var i = 0; i < length; i++) {
        if (printActive) {
            var arr = Math.round(Math.random() * 3)
            if (arr === 1) {
                temp = letters[getRandom(letters.length - 1)]
            }
            if (arr === 2) {
                temp = numbers[getRandom(numbers.length - 1)]
            }
            if (arr === 3) {
                temp = characters[getRandom(characters.length - 1)]
            }
            stdout.write(temp);
            line += temp
            temp = ""
            wait(minDelay - getRandom(randomDelay));
            //!$(id).text($(id).text() + temp);
            if (line.includes(searchText)) {
                printActive = false
            }
        }
        if (!printActive) {
            //once found
            console.log()
            console.log("----------------------------------")
            console.log(searchText + " Found!")
            console.log(line.length + (" Digits Printed Total"))
            //console.log("This text had a " + (probability) + "% chance of appearing, and took " + Clock.totalSeconds + " seconds to print")
            return;
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

function toggle(variable) {
    variable = variable ? false : true;
    console.log(variable);
    alert(variable)
}

function startPrint(digits, minDelay, randomDelay, textFind) {
    printActive = true;
    printMatrix(digits, minDelay, randomDelay, textFind);
}

function clearText(id) {
    //!$(id).text("")
}

function chance(x) {
    var chance
    var probability
    probability = (1 / (letters.length + characters.length + numbers.length))
    //console.log(probability)
    chance = probability ^ x
    chance *= 100

    var temp
    /*!!for (var i = 0; i < x - 1; i++) {
        chance *= probability
    }*/
    temp = chance
    temp = temp.toString()
    chance = chance.toFixed(temp.length)
    //wait(1000);
    console.log(chance)
    return (chance)
}


//first value is the number of digits to print at max
//second value is the base digits to print per minute(1000 max, no min value: to go as fast as possible set this to 0)
//third value is the max random range, this just makes it look cooler to me(value will slow down the process to a random amount if value is negative)
//^^(positive values will speed up the digits a random amount, up to 1000 max still)
//last value is text to search for, and will stop the function when it is found

startPrint(9999999, 0, 25, "cunt")





//Velkhana