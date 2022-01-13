$(document).ready(startBigMan)

function startBigMan() {
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
    //setInterval(randomAngle, 3000)

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
        bigMan.speed.x = getRandom(-7, 7)
        bigMan.speed.y = getRandom(-7, 7)
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
            bigMan.position.x = (board.position.x + board.width / 2) + getRandom(-20, 20)
            bigMan.position.y = (board.position.y + board.height / 2) + getRandom(-20, 20)
            randomAngle()
            updateHTML()
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

    function collisions() {
        if (handleCollisionObjects(roof, bigMan) || handleCollisionObjects(floor, bigMan)) {
            console.log("collide roof/floor")
            bigMan.speed.y *= -1
            //$("#bg").css("visibility", "visible");
        } else {
            $("#bg").css("visibility", "hidden");
        }
        if (handleCollisionObjects(leftWall, bigMan) || handleCollisionObjects(rightWall, bigMan)) {
            console.log("collide wall")
            bigMan.speed.x *= -1
            //$("#bg").css("visibility", "visible");
        } else {
            $("#bg").css("visibility", "hidden");
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
        $("#x").text(parseFloat(bigMan.position.x))
        $("#y").text(parseFloat(bigMan.position.y))
        $("#speedX").text(bigMan.speed.x)
        $("#speedY").text(bigMan.speed.y)
        $("#abSpeed").text(Math.abs(bigMan.speed.x) + Math.abs(bigMan.speed.y))
    }
}