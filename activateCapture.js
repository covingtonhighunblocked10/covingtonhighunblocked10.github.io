$(document).ready(runProgram)

function runProgram() {
    addElements();
    $("#captureMenu").show();
    $("#captureResult").show();
    setKeybinds();
    console.log("finish load")
}

function capture(get, set) {
    const element = document.querySelector(get);
    html2canvas(element).then(function (canvas) {
        document.querySelector(set).prepend(canvas);
        let cvs = document.querySelector("canvas");
        let download = document.querySelector("#download");
        download.href = cvs.toDataURL();
        download.download = "html2canvas.png";
    })
};

function toggleMenu(event) {
    if (event.which === 48) {
        states.menu.appear = toggle(states.menu.appear);
        hideshow("menu")
    }
    if (event.which === 49) {
        states.result.appear = toggle(states.result.appear);
        hideshow("result")
        console.log("result")
        capture("body", "#captureResult")
    }
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
    $("body").prepend('<div id="captureMenu"><p id="text">Capture Menu</p><div id="menuClose" class="close>X</div></div><div id="captureResult"><div id="captureClose" class="close">X</div><a id="download" href>Download</a></div>')
}