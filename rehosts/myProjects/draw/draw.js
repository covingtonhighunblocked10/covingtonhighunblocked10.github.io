var mouse = {
    x: 0,
    y: 0,
    held: false,
    track: "window",
    previous: {
        x: "",
        y: "",
    }
}
var c = document.getElementById("#canvas")
var ctx = c.getContext("2d");

function handleMouseMove(event) {
    //find mouse position

    //save previous mouse position

    if (mouse.track === "canvas") {
        //if inside canvas bounding box
        mouse.previous.x = mouse.x
        mouse.previous.y = mouse.y
        mouse.x = event.pageX - $("#canvas").offset().left;
        mouse.y = event.pageY - $("#canvas").offset().top;
    } else if (mouse.track === "window") {
        //if inside window, not canvas
        mouse.previous.x = mouse.x
        mouse.previous.y = mouse.y
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    }
    else {
        mouse.track = "window"
    }
    if (mouse.held || !mouse.held) {
        ctx.moveTo(mouse.previous.x, mouse.previous.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
    }
    $("#mouseX").text(mouse.x)
    $("#mouseY").text(mouse.y)
    $("#mouseTrack").text(mouse.track)
}

function handleMouseDown() {
    mouse.held = toggle(mouse.held)
    $("#mouseHeld").text("Mouse Held: " + mouse.held);
};

function handleMouseUp() {
    mouse.held = toggle(mouse.held)
    $("#mouseHeld").text("Mouse Held: " + mouse.held);
};

function mouseEnter() {
    mouse.track = "canvas"
}

function mouseLeave() {
    mouse.track = "window"
}

function toggle(variable) {
    return (variable ? false : true)
}