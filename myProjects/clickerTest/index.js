$(document).ready(runClicker)

function runClicker() {

    var clickValue = 1;
    var totalSleep = 0;
    var testIdleValue = 0.1;
    var testIdleOwned = 5;

    var fps = 60

    setInterval(updateLoop, 1000 / fps)
    setInterval(addIdle, 1000)

    function addIdle() {
        totalSleep += (testIdleValue * testIdleOwned)
    }

    function updateLoop() {
        updateText("#totalSleep", totalSleep.toFixed(1))
        updateText("#testIdle", testIdleOwned)
    }

    function updateText(id, text) {
        $(id).text(text);
    }

    $("#clickerPNG").on('click', click)

    function click() {
        totalSleep += clickValue
    }
}