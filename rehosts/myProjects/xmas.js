var names = ["Jace", "Kaylee", "Kinsley", "Alyssa"]

function pickNames() {
    var temp = names
    var picked, picker
    for (var i = 0; i <= names.length - 1; i ++) {
        picker = names[i]
        picked = randomValid(temp, picker)

        //console.log(picker + " Is the Picker Now")
        //console.log (picked + " Is the Picked Person")

        //console.log(picker + ", step up, your pick is in 5 seconds")
        
        //wait(1000);
        
        //console.log(picker + " picks a gift for " + temp[picked])
        
        temp.splice(picked, 1)
        
        //console.log(names[i] + ", step away, " + names[i + 1] + "'s pick is in 5 seconds")
        //wait(1000);
    }
    console.log("_______________________")
    console.log("Finished")
}

function randomValid(array, name) {
    var o = Math.round(Math.random() * (array.length - 1))
    if (array[o] !== name) {
        console.log(array[o])
        console.log([o])
        return array[o]
    } else {
        randomValid(array, name)
    }
}

function wait(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}
pickNames();