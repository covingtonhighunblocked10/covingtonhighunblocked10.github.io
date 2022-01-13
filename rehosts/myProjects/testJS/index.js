$(document).ready(startBigMan)

function startBigMan() {

    //setup intervals
    var fps = 60
    var interval = 1000 / fps
    setInterval(update, interval)

    //use to test
    setInterval(randomAngle, 1000)
    var i = 0;
    class Board {
        constructor(name) {
            var id = "#" + name
            return {
                name: name,
                id: id,
                position: {
                    x: parseFloat($(id).css('left')),
                    y: parseFloat($(id).css('top')),
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
                height: parseFloat($(id).css('height')),
                width: parseFloat($(id).css('width')),
            }
        }
    };

    //add data from bounding boxes for stage
    var board = new Board("board")
    var roof = new Board("roof")
    var leftWall = new Board("left-wall")
    var rightWall = new Board("right-wall")
    var floor = new Board("floor")

    /* console.log(board)
    console.log(floor)
    console.log(roof)
    console.log(leftWall)
    console.log(rightWall) */

    var bigMan = {
        name: "bigMan",
        id: "#bigMan",
        position: {
            //set spawn positioning here or below
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
        height: parseFloat($(id).css('height')),
        width: parseFloat($(id).css('width')),
    };
    bigMan.position.x = board.position.x + board.width / 2
    bigMan.position.y = board.position.y + board.height / 2

    function wait(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
            currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    }

    function update() {
        //collisions()
        i++
        $("#status").text(i)
        updateSpeed()
        updateHTML()
    }

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
        //alert("Random Angle")
        bigMan.speed.x = getRandom(-10, 10)
        bigMan.speed.y = getRandom(-10, 10)
    }

    function updateSpeed() {
        bigMan.position.x += bigMan.speed.x
        bigMan.position.y += bigMan.speed.y
    }

    function getRandom(min, max) {
        return (Math.round(Math.random() * (max - min) + min));
    }

    function collisions() {
        if (handleCollision(roof, bigMan) || handleCollision(floor, bigMan)) {
            alert("collide roof/floor")
            bigMan.speed.y *= -1
        }
        if (handleCollision(leftWall, bigMan) || handleCollision(rightWall, bigMan)) {
            alert("collide wall")
            bigMan.speed.x *= -1
        }
    }

    function handleCollisionObjects(obj1, obj2) {
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
    }

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
        $("#bigMan").css('left', bigMan.position.x * -1)
        $("#bigMan").css('top', bigMan.position.y * -1)

        $("#x").text(bigMan.position.x)
        $("#y").text(bigMan.position.y)
        $("#speedX").text(bigMan.speed.x)
        $("#speedY").text(bigMan.speed.y)
    }
}