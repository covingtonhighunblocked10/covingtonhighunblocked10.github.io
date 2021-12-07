$(document).ready(runProgram)

function runProgram() {
    var board = {
        html: {
            width: parseFloat($("#board").attr('width')),
            height: parseFloat($("#board").attr('height')),
            id: "#board",
            x: parseFloat($("#board").attr('left')),
            y: parseFloat($("#board").attr('top')),
        },
    }
    var game = {
        players: {
            names: [],
            all: [],
        },
    };
    var _ = {
        update: {
            single: function (object) {
                object.data = {
                    position: {
                        x: functions.game.set.position.x(object),
                        y: functions.game.set.position.y(object),
                    },
                    middle: {
                        x: functions.game.get.middle.x(object),
                        y: functions.game.get.middle.y(object),
                    },
                    sides: function () {
                        return (functions.game.get.sides(object))
                    },
                }
            },
        },
        html: {
            set: {
                position: {
                    x: function (object) {
                        return ($(object.html.id).css('left', object.data.position.x));
                    },
                    y: function (object) {
                        return ($(object.html.id).css('top', object.data.position.y))
                    },
                },
                color: function (object, color) {
                    $(object.html.id).attr('color', color)
                },
            },
            get: {
                position: {
                    x: function (object) {
                        return ($(object.html.id).css('left'))
                    },
                    y: function (object) {
                        return ($(object.html.id).css('top'))
                    },
                },
                width: function (object) {
                    return ($(object.html.id).attr('width'))
                },
                height: function (object) {
                    return ($(object.html.id).attr('height'))
                },
            },
        },
        game: {
            set: {
                position: {
                    x: function (object) {
                        return (object.game.position.x += object.game.speed.x);
                    },
                    y: function (object) {
                        return (object.game.position.y += object.game.speed.y);
                    },
                },
                velocity: {
                    x: function (object, speed) {
                        object.game.speed.x = speed;
                    },
                    y: function (object, speed) {
                        object.game.speed.y = speed;
                    },
                }
            },
            get: {
                distance: function (obj1, obj2, xy) {
                    var distance = Math.abs(obj1.game.middle[xy] - obj2.game.middle[xy]);
                    return distance;
                },
                collisionStatus: function (obj1, obj2, side1, side2) {
                    this.sides(obj1);
                    this.sides(obj2);
                    if (obj1.game.sides[side1] <= obj2.game.sides[side2]) {
                        // collision detected!
                        return true;
                    };
                },
                sides: function (object) {
                    //find the sides of any given object by using its width, height, x, and y
                    var temp = {
                        right: object.game.position.x + object.html.width,
                        left: object.game.position.x,
                        top: object.game.position.y,
                        bottom: object.game.position.y + object.html.height,
                    };
                    return temp
                },
                middle: {
                    x: function (object) {
                        return (object.game.position.x + (object.html.width / 2))
                    },
                    y: function (object) {
                        return (object.game.position.y + (object.html.height / 2))
                    },
                },
            },
        },
    };
    //var interval = setInterval(update, 1000)

    function objsToArray() {
        var newArr = []
        var names = game.players
        var length = names.length
        for (var i = 0; i < length; i++) {
            var entry = game.names[i]
            //console.log(entry)
            newArr.push(game.all[entry])
        }
        return (newArr);
    }

    function newPlayer(parent, type, classes) {
        var player = {
            html: {
                id: ("#player" + game.players.names.length),
                src: "img/" + type + ".png",
                content: ("<img class='sprite " + classes + "' src='" + this.src + "'>"),
            },
            data: {
                id: ("player" + game.players.names.length),
                position: {
                    x: _.html.get.position.x(player),
                    y: _.html.get.position.y(player),
                },
                middle: {
                    x: _.game.get.middle.x(player),
                    y: _.game.get.middle.y(player),
                },
                sides: function () {
                    return (_.game.get.sides(player))
                },
                speed: {
                    x: _.game.set.velocity.x(player, 0),
                    y: _.game.set.velocity.y(player, 0),
                },
            },
            type: "player",
        };
        var name = player.data.id
        game.players.push(name)
        console.log(player)
        //appendNew(parent, player.html.content)
        game.players.names.push(player.html.id)
        game.players.all.push(player)
        console.log(game.players)
    }

    function appendNew(parent, content, classes) {
        $(parent).append(content).addClass(classes)
    }

    function changePosition(id, x, y) {
        //alert("hello")
        $(id).attr({
            'left': x,
            'top': y
        })
    }

    function placeRandom(amount) {
        for (var i = 0; i < amount; i++) {
            var x = getRandom()
            var y = getRandom()
        }
    }

    function getRandom(max) {
        return (Math.round(Math.random(max)))
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
    //alert($("#board").css('width'))
    newPlayer("#board", "scissors", "rock")
    console.log(game)
}