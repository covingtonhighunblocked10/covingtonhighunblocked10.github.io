$(document).ready(runClicker)

function runClicker() {

    var clickValue = 100;
    var totalSleep = 0;
    var upgrades = []
    var listUpgrades = []

    var fps = 60

    setInterval(updateLoop, 1000 / fps)
    setInterval(addIdle, 1000)
    //setInterval(alert(upgrades["pebbles"].cost), 3000)

    $("#clickerPNG").on('click', click)

    function addIdle() {
        for (var i = 0; i <= upgrades.length; i++) {
            var current = upgrades[listUpgrades[i]]
            totalSleep += (current.value * current.owned)
        }
    }

    function updateOwned() {
        for (var i = 0; i <= upgrades.length; i++) {
            var current = upgrades[listUpgrades[i]]
            updateText(("#" + current.name + "Cost"), current.cost)
            updateText(("#" + current.name + "Owned"), current.owned)
            if (current.name = "twine") {
                alert("wtf did i do wrong")
            }
        }
    }

    function updateLoop() {
        updateText("#totalSleep", totalSleep.toFixed(2))
        updateOwned()
    }

    function updateText(id, text) {
        $(id).text(text);
    }

    function purchaseUpgrade(upgrade) {
        increasePrice(upgrades[upgrade].name)
        var current = upgrades[upgrade]
        if (totalSleep >= current.cost) {
            totalSleep -= current.cost;
            current.owned += 1;
        } else {
            //alert("Insufficient Sleep")
        }
    }

    function increasePrice(upgrade) {
        var newPrice = upgrades[upgrade].baseCost * Math.pow(1.15, (upgrades[upgrade].owned))
        upgrades[upgrade].cost = newPrice.toFixed(2)
    }

    function click() {
        totalSleep += clickValue
    }

    //////////////////////////////////////////
    ////////Constructor for Upgrades//////////
    //////////////////////////////////////////
    class Upgrade {
        constructor(image, name, nameProper, owned, value, baseCost, description) {
            var x = {
                name: name,
                nameProper: nameProper,
                description: description,
                owned: owned,
                value: value,
                baseCost: baseCost,
                cost: baseCost,
                image: image,
                id: "#" + name + "Upgrade",
            }
            var div = "<div id='" + (name + 'Upgrade') + "' class='upgrade'> <img class='icon' src='" + image + "'><p>" + nameProper + "</p> <p><span>" + description + "</span></p> <p><span>" + value + "</span> sleep per second</p> <p>Cost: <span id='" + name + "Cost" + "'>" + x.cost + " sleep</span></p> <p>" + nameProper + " Owned: <span id='" + (name + "Owned") + "'></span></p> </div>"
            $("#upgradesList").append(div)
            upgrades[name] = x
            listUpgrades.push(name)
            $(x.id).on('click', function () {
                purchaseUpgrade(upgrades[name].name)
            })
            //alert(div)
        }
    }
    new Upgrade("cobblestone.png", "pebbles", "Pebbles", 1, 0.1, 10, "A small rock, to lay your head on");
    new Upgrade("string.png", "twine", "Twine", 1, 1, 100, "A strand of fibers, useful for assorted crafts!");
    //alert(upgrades["twine"].owned)
}