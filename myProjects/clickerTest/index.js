$(document).ready(runClicker)

function runClicker() {

    var clickValue = 100;
    var totalSleep = 10000;
    var upgrades = []
    var listUpgrades = []

    //use "node" for node debugging, "html" for display mode
    var node_or_html = "html"

    var fps = 60

    setInterval(updateLoop, 1000 / fps)
    setInterval(addIdle, 1000)
    setInterval(updateOwned, 1000)
    //setInterval(alert(upgrades["pebbles"].cost), 3000)

    if (node_or_html === "html") {
        alert("newTest")
        $("#clickerPNG").on('click', click)
    }


    function addIdle() {
        console.log("Add Idle List Upgrades: " + listUpgrades);
        for (var i = 0; i <= listUpgrades.length - 1; i++) {
            var current = upgrades[listUpgrades[i]]
            console.log("Add Idle Current: ");
            console.log(current)
            totalSleep += (current.value * current.owned)
            //console.log("Current Sleep: " + totalSleep)
        }
    }

    function updateOwned() {
        for (var i = 0; i <= listUpgrades.length - 1; i++) {
            let current = upgrades[listUpgrades[i]]
            //alert(current.nameProper)
            console.log(current.nameProper + " Cost: " + current.cost)
            console.log(current.nameProper + " Owned: " + (current.owned ? current.owned : "0"))
            updateText(("#" + current.name + "Cost"), current.cost)
            updateText(("#" + current.name + "Owned"), (current.owned ? current.owned : "0"))
            //testing purchase
            //purchaseUpgrade("twine")
        }
    }

    function updateLoop() {
        updateText("#totalSleep", totalSleep.toFixed(2))
        updateOwned()
    }

    function updateText(id, text) {
        if (node_or_html === "html") {
            $(id).text(text);
        }

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

    /////////////////////////////////
    ////////Debug Keybinds//////////
    ////////////////////////////////
    if (node_or_html === "html") {
        $(document).on('keypress', handleKeyDown)
    }


    function handleKeyDown(event) {
        if (event.key === "d") {
            alert("d presses")
        }
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
            var div = "<div id='" + (name + 'Upgrade') + "' class='upgrade'> <img class='icon' src='" + image + "'><p>" + nameProper + "</p> <p><span>" + description + "</span></p> <p><span>" + value + "</span> sleep per second</p> <p>Cost: <span id='" + name + "Cost" + "'>" + x.cost + " sleep</span></p> <p>" + nameProper + " Owned: <span id='" + (name + "Owned") + "'></span></p> </div>";
            upgrades[name] = x
            listUpgrades.push(name)
            if (node_or_html === "html") {
                $("#upgradesList").append(div)
                $(x.id).on('click', function () {
                    purchaseUpgrade(upgrades[name].name)
                })
            }
            //alert(div)
        }
    }
    new Upgrade("cobblestone.png", "pebbles", "Pebbles", 0, 0.1, 10, "A small rock, to lay your head on");
    new Upgrade("string.png", "twine", "Twine", 0, 1, 100, "A strand of fibers, useful for assorted crafts!");
}

///USE FOR NODE DEBUGGING
//runClicker()