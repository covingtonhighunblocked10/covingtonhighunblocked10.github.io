var mouse = {
    x: 0,
    y: 0,
    held: false,
    track: "",
    previous: {
        x: 0,
        y: 0,
    }
}
var drawActive = false
var c = document.getElementById("canvas")
var ctx = c.getContext("2d");

async function handleMouseMove(event) {
    //find mouse position

    //save previous mouse position
    mouse.previous.x = mouse.x;
    mouse.previous.y = mouse.y;
    if (mouse.track === "canvas") {
        //if inside canvas bounding box
        if (mouse.previous.x !== mouse.x || mouse.previous.y !== mouse.y) {
            mouse.previous.x = mouse.x;
            mouse.previous.y = mouse.y;
        }
        mouse.x = event.clientX - $("#canvas").offset().left;
        mouse.y = event.clientY - $("#canvas").offset().top;

    } else if (mouse.track === "window") {
        //if inside window, not canvas
        if (mouse.previous.x !== mouse.x || mouse.previous.y !== mouse.y) {
            mouse.previous.x = mouse.x
            mouse.previous.y = mouse.y
        }
        mouse.x = event.clientX;
        mouse.y = event.clientY;

    } else {
        mouse.track = "window"
    }

    $("#mouseX").text("Current X: " + mouse.x)
    $("#mouseY").text("Current Y: " + mouse.y)
    $("#previousX").text("Previous X: " + mouse.previous.x)
    $("#previousY").text("Previous Y: " + mouse.previous.y)
    $("#mouseTrack").text("Element Mouse is Relative to: " + mouse.track)
}
async function startDraw(type) {
    drawActive = true
    //alert(drawActive);
    if (mouse.track === "canvas") {
        while (mouse.held || drawActive) {
            if (type === "line") {
                ctx.moveTo(mouse.previous.x, mouse.previous.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke()
            }
        }
        drawActive = toggle(drawActive)
    }

}

async function handleMouseDown() {
    mouse.held = toggle(mouse.held)
    if (!drawActive) {
        startDraw("line")
    }
    $("#drawActive").text("Draw Active: " + drawActive);
    $("#mouseHeld").text("Mouse Held: " + mouse.held);
};

async function handleMouseUp() {
    mouse.held = toggle(mouse.held)
    $("#drawActive").text("Draw Active: " + drawActive);
    $("#mouseHeld").text("Mouse Held: " + mouse.held);
};

async function mouseEnter() {
    mouse.track = "canvas"
}

async function mouseLeave() {
    mouse.track = "window"
}

function toggle(variable) {
    return (variable ? false : true)
}