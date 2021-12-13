$(document).ready(runProgram)
var get, set
function runProgram() {
    addElements();
    $("#captureMenu").hide();
    $("#captureResult").hide();
    setKeybinds();
    console.log("finish load")
}

function capture(get, set) {
    const element = document.querySelector(get);
    html2canvas(element).then(function (canvas) {
        document.querySelector(set).append(canvas);
        let cvs = document.querySelector("canvas");
        let download = document.querySelector("#download");
        download.href = cvs.toDataURL();
        download.download = window.location.pathname + ".png";
    })
};

function toggleMenu(event) {
    if (event.which === 48) {
        states.menu.appear = toggle(states.menu.appear);
        takeScreenshot("body", "#captureResult")
        hideshow("menu")
    }
    if (event.which === 49) {
        takeScreenshot("body", "#captureResult")
    }
}

function takeScreenshot(get, set) {
    //states.result.appear = toggle(states.result.appear);
    //hideshow("result")
    console.log("result")
    capture(get, set)
}

function setKeybinds() {
    $(document).on('keydown', toggleMenu);
}
var states = {
    menu: {
        appear: false,
        id: "#captureMenu",
    },
    result: {
        appear: false,
        id: "#captureResult",
    },
}

function hideshow(element) {
    if (states[element].appear) {
        $(states[element].id).show()
    } else if (!states[element].appear) {
        $(states[element].id).hide()
    }
}

function toggle(variable) {
    return (variable ? false : true)
}

function addElements() {
    $("body").prepend('<div id="captureMenu"><p id="text">Capture Menu</p><a id="download" href>Download</a></div><div id="captureResult"><div id="captureClose" class="close">X</div><a id="download" href>Download</a></div>')
}