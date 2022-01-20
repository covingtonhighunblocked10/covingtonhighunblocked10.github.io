$(document).ready(startBigMan)

//this program has 420 lines, thank you for reading this. just kidding how the fuck are you here did you steal the code or something??? or did you visit the github page?? or maybe i released this project publically, im not sure. anyways bye
var TBhits = 0
var wallHits = 0
var cornerHits = 0

function startBigMan() {
    var colors = ["AliceBlue",
        "AntiqueWhite",
        "Aqua",
        "Aquamarine",
        "Azure",
        "Beige",
        "Bisque",
        "Black",
        "BlanchedAlmond",
        "Blue",
        "BlueViolet",
        "Brown",
        "BurlyWood",
        "CadetBlue",
        "Chartreuse",
        "Chocolate",
        "Coral",
        "CornflowerBlue",
        "Cornsilk",
        "Crimson",
        "Cyan",
        "DarkBlue",
        "DarkCyan",
        "DarkGoldenRod",
        "DarkGray",
        "DarkGrey",
        "DarkGreen",
        "DarkKhaki",
        "DarkMagenta",
        "DarkOliveGreen",
        "DarkOrange",
        "DarkOrchid",
        "DarkRed",
        "DarkSalmon",
        "DarkSeaGreen",
        "DarkSlateBlue",
        "DarkSlateGray",
        "DarkSlateGrey",
        "DarkTurquoise",
        "DarkViolet",
        "DeepPink",
        "DeepSkyBlue",
        "DimGray",
        "DimGrey",
        "DodgerBlue",
        "FireBrick",
        "FloralWhite",
        "ForestGreen",
        "Fuchsia",
        "Gainsboro",
        "GhostWhite",
        "Gold",
        "GoldenRod",
        "Gray",
        "Grey",
        "Green",
        "GreenYellow",
        "HoneyDew",
        "HotPink",
        "IndianRed",
        "Indigo",
        "Ivory",
        "Khaki",
        "Lavender",
        "LavenderBlush",
        "LawnGreen",
        "LemonChiffon",
        "LightBlue",
        "LightCoral",
        "LightCyan",
        "LightGoldenRodYellow",
        "LightGray",
        "LightGrey",
        "LightGreen",
        "LightPink",
        "LightSalmon",
        "LightSeaGreen",
        "LightSkyBlue",
        "LightSlateGray",
        "LightSlateGrey",
        "LightSteelBlue",
        "LightYellow",
        "Lime",
        "LimeGreen",
        "Linen",
        "Magenta",
        "Maroon",
        "MediumAquaMarine",
        "MediumBlue",
        "MediumOrchid",
        "MediumPurple",
        "MediumSeaGreen",
        "MediumSlateBlue",
        "MediumSpringGreen",
        "MediumTurquoise",
        "MediumVioletRed",
        "MidnightBlue",
        "MintCream",
        "MistyRose",
        "Moccasin",
        "NavajoWhite",
        "Navy",
        "OldLace",
        "Olive",
        "OliveDrab",
        "Orange",
        "OrangeRed",
        "Orchid",
        "PaleGoldenRod",
        "PaleGreen",
        "PaleTurquoise",
        "PaleVioletRed",
        "PapayaWhip",
        "PeachPuff",
        "Peru",
        "Pink",
        "Plum",
        "PowderBlue",
        "Purple",
        "RebeccaPurple",
        "Red",
        "RosyBrown",
        "RoyalBlue",
        "SaddleBrown",
        "Salmon",
        "SandyBrown",
        "SeaGreen",
        "SeaShell",
        "Sienna",
        "Silver",
        "SkyBlue",
        "SlateBlue",
        "SlateGray",
        "SlateGrey",
        "Snow",
        "SpringGreen",
        "SteelBlue",
        "Tan",
        "Teal",
        "Thistle",
        "Tomato",
        "Turquoise",
        "Violet",
        "Wheat",
        "White",
        "WhiteSmoke",
        "Yellow",
        "YellowGreen"
    ]
    $(document).on('keydown', keydown)

    function keydown(key) {
        if (key.which === 13) {
            pullSpeedInput()
        }
    }

    //setup intervals
    var fps = 60
    var interval = 1000 / fps
    setInterval(update, interval)

    //use to test
    class Board {
        constructor(name) {
            var id = "#" + name
            var pos = $(id).offset()
            return {
                name: name,
                id: id,
                position: {
                    x: parseFloat(pos.left), //$("$"),
                    y: parseFloat(pos.top),
                },
                middle: {
                    x: 0,
                    y: 0,
                },
                sides: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                },
                height: parseFloat($("#" + name).css('height')),
                width: parseFloat($("#" + name).css('width')),
            }
        }
    };

    //add data from bounding boxes for stage
    var board = new Board("board")
    var roof = new Board("roof")
    var leftWall = new Board("left-wall")
    var rightWall = new Board("right-wall")
    var floor = new Board("floor")
    findSides(board)
    findSides(roof)
    findSides(leftWall)
    findSides(rightWall)
    findSides(floor)

    console.log(board)
    console.log(floor)
    console.log(roof)
    console.log(leftWall)
    console.log(rightWall)

    var bigMan
    bigMan = {
        name: "bigMan",
        id: "#bigMan",
        position: {
            x: 0,
            y: 0,
        },
        middle: {
            x: 0,
            y: 0,
        },
        sides: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
        },
        speed: {
            x: 0,
            y: 0,
        },
        height: parseFloat($("#bigMan").css('height')),
        width: parseFloat($("#bigMan").css('width')),
    };
    console.log(bigMan)
    bigMan.position.x = (board.position.x + board.width / 2) + getRandom(-30, 30)
    bigMan.position.y = (board.position.y + board.height / 2) + getRandom(-30, 30)
    randomAngle()
    /* bigMan.position.x = board.position.x + leftWall.width
    bigMan.position.y = board.position.y + (board.height / 2) */
    //bigMan.speed.x = 5
    //setInterval (sine, 10)
    function sine() {
        bigMan.position.y = Math.sin(bigMan.position.x)
        let a
        let x
        let h
        let b
        let k
        bigMan.position.y = a*Math.sin((x - h)/b) + k
    }
    updateHTML()

    function wait(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
            currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    }

    function update() {
        collisions()
        updateSpeed()
        updateHTML()
    }
    //randomAngle()

    function limitSpeed() {
        if (Math.abs(bigMan.speed.x) + Math.abs(bigMan.speed.y) < 15) {
            return;
        } else {
            if (bigMan.speed.x > 0) {
                bigMan.speed.x -= 1
            } else if (bigMan.speed.x < 0) {
                bigMan.speed.x += 1
            }
            if (bigMan.speed.y > 0) {
                bigMan.speed.y -= 1
            } else if (bigMan.speed.y < 0) {
                bigMan.speed.y += 1
            }
            limitSpeed();
            return;
        }
    }

    function randomAngle() {
        bigMan.speed.x = getRandom(-10, 10)
        bigMan.speed.y = getRandom(-10, 10)
    }

    function updateSpeed() {
        bigMan.position.x += bigMan.speed.x
        bigMan.position.y += bigMan.speed.y
        if (!bigMan.position.x) {
            bigMan.position.x = parseFloat($("#bigMan").css('left'))
        }
        if (!bigMan.position.y) {
            bigMan.position.y = parseFloat($("#bigMan").css('top'))
        }
        if (!handleCollisionObjects(board, bigMan)) {
            bigMan.position.x = (board.position.x + board.width / 2) + getRandom(-80, 80)
            bigMan.position.y = (board.position.y + board.height / 2) + getRandom(-80, 80)
            $("#bg").css("visibility", "visible");
            //randomAngle()
            updateHTML()
        } else {
            $("#bg").css("visibility", "hidden");
        }
        /* if (bigMan.speed.x === NaN) {
            bigMan.speed.x = 0;
        }
        if (!bigMan.speed.y === NaN) {
            bigMan.speed.y = 0;
        } */
    }

    function getRandom(min, max) {
        var random = Math.round(Math.random() * (max - min) + min)
        if (random) {
            return (random);
        } else {
            return (getRandom(min, max))
        }
    }

    function alertHits() {
        alert("Roof/Floor Hits: " + wallHits + "\r" + "Wall Hits: " + wallHits + "\r" + "Corner hits: " + cornerHits)
    }

    function collisions() {
        if (handleCollisionObjects(roof, bigMan) || handleCollisionObjects(floor, bigMan)) {
            TBhits++
            console.log("collide roof/floor")
            bigMan.speed.y *= -1
            $("body").css("background-color", colors[getRandom(0, colors.length)])
        } else {
            //$("body").css("background-color", "black")
        }
        if (handleCollisionObjects(leftWall, bigMan) || handleCollisionObjects(rightWall, bigMan)) {
            wallHits++
            console.log("collide wall")
            bigMan.speed.x *= -1
            $("body").css("background-color", colors[getRandom(0, colors.length)])
            //$("#bg").css("visibility", "visible");
        } else {
            //$("body").css("background-color", "black")
            //$("#bg").css("visibility", "hidden");
        }
        if ((handleCollisionObjects(leftWall, bigMan) || handleCollisionObjects(rightWall, bigMan)) && (handleCollisionObjects(roof, bigMan) || handleCollisionObjects(floor, bigMan))) {
            cornerHits++
            //alert ("x: " + bigMan.position.x + "\r" + "y: " + bigMan.position.x)
        }

    }

    function pullSpeedInput() {
        var x = $("#xSpeed").val() ? $("#xSpeed").val() : bigMan.speed.x;
        var y = $("#ySpeed").val() ? $("#ySpeed").val() : bigMan.speed.y;
        if (x) {
            bigMan.speed.x = parseFloat(x)
            $("#xSpeed").val("")
        }
        if (y) {
            bigMan.speed.y = parseFloat(y)
            $("#ySpeed").val("")
        }
    }

    function handleCollisionObjects(obj1, obj2) {
        findSides(obj1);
        findSides(obj2);
        //if colliding with player

        if (obj1.sides.left <= obj2.sides.right &&
            obj1.sides.right >= obj2.sides.left &&
            obj1.sides.top <= obj2.sides.bottom &&
            obj1.sides.bottom >= obj2.sides.top) {
            // collision detected!
            return true;
        }
    };

    /* function handleCollisionObjects(obj1, obj2) {
        if (obj1.position.x < obj2.position.x + obj2.width &&
            obj1.position.x + obj1.width > obj2.position.x &&
            obj1.position.y < obj2.position.y + obj2.height &&
            obj1.height + obj1.position.y > obj2.position.y) {
            // collision detected!
            return true;
        } else {
            // no collision
            return false;
        }
    }

    function handleCollisionSide(obj1, obj2, side1, side2) {
        findSides(obj1);
        findSides(obj2);
        if (obj1.sides[side1] <= obj2.sides[side2]) {
            // return true if collision detected
            return true;
        }
    } */

    function findSides(object) {
        //find the sides of any given object by using its width, height, x, and y
        object.sides = {
            right: object.position.x + object.width,
            left: object.position.x,
            top: object.position.y,
            bottom: object.position.y + object.height,
        };
        object.middle = {
            x: findMiddle(object, "x"),
            y: findMiddle(object, "y"),
        };
    };

    function findMiddle(object, xy) {
        var wh = (xy === "x" ? "width" : "height")
        return object.position[xy] + (object[wh] / 2)
    }

    function updateHTML() {
        $("#bigMan").css('left', bigMan.position.x + "px")
        $("#bigMan").css('top', bigMan.position.y + "px")
        $("#x").text("Position X: " + parseFloat(bigMan.position.x))
        $("#y").text("Position Y: " + parseFloat(bigMan.position.y))
        $("#speedX").text("Speed X: " + bigMan.speed.x)
        $("#speedY").text("Speed Y: " + bigMan.speed.y)
        $("#abSpeed").text("Absolute Speed: " + Math.abs(bigMan.speed.x) + Math.abs(bigMan.speed.y))
        $("#TBhits").text("Top/Bottom Hits: " + TBhits)
        $("#wallHits").text("Wall Hits: " + wallHits)
        $("#cornerHits").text("Corner Hits: " + cornerHits)
    }
}