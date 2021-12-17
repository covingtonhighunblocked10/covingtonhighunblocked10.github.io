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

//uses all letters, numbers, and special characters available to me
var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
var characters = [".", ",", "/", "<", ">", "?", "'", '"', ":", ";", "[", "]", "{", "}", "|", "=", "+", "-", "_", ")", "(", "*", "&", "^", "%", "$", "#", "@", "!", "~", "`"]
var printActive

/////////////////////////////////////////
//Haha Hehe Funny Functions Go BRRRRRRR//
/////////////////////////////////////////

function print(length, minDelay, randomDelay, searchText, id) {
    var temp = "";
    var line = "";
    var arr;
    var probability;
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
            line += temp;
            //$(id).text(line);
            temp = "";
            wait(minDelay - getRandom(randomDelay));
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
            //console.log("This text had a " + (probability) + "% chance of appearing every " + (minDelay * searchText.length) + " millisecondseconds")
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

function setFind () {
    
}

function monkeyStart(digits, minDelay, randomDelay, textFind, id) {
    //var textFind = $("#textFind").text()
    //alert(textFind)
    printActive = true;
    print(digits, minDelay, randomDelay, textFind, id);
}

function clearText(id) {
    $(id).text("")
}

function chance(x) {
    var chance
    var probability
    probability = (1 / (letters.length + characters.length + numbers.length))
    //console.log(probability)
    chance = probability ^ x
    //chance *= 100

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
//second value is the base digits to print per minute(1000 max per second, no min per second: to go as fast as possible set this to 0)
//third value is the max random range, this just makes it look cooler to me(positive value will slow down the process to a random amount)
//^^(negative values will speed up the digits a random amount, up to 1000 max still)
//last value is text to search for, and will stop the function when it is found

monkeyStart(9999999, 0, 0, "kek")

//Velkhana