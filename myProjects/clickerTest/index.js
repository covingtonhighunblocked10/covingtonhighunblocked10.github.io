$(document).ready(runClicker)

function runClicker() {

    var baseClickValue = 1;
    var clickValue = baseClickValue
    var totalSleep = 10000;
    var sleepPerSecond = 0
    var upgrades = []
    var listUpgrades = []
    var inventory = []
    var tools = {
        prefix: "img/tools/",
        materials: ["wood", "stone", "iron", "gold", "diamond", "netherite"],
        names: ["shovel", "pickaxe", "hoe", "sword", "axe"],
    }
    var items = {
        prefix: "img/blocks/",
        names: ["cobblestone", "string"]
    }
    var all = {
        sources: ["cobblestone", "string", "wood_hoe", "wood_shovel", "wood_pickaxe", "wood_sword"],
    }
    var example_descriptions = ["Test Description 1", "Test Description 2", "Test Description 3"];

    //audio elements
    //working on this later

    //use "node" for node debugging, "html" for display mode
    var node_or_html = "html"

    var fps = 60

    //use these variables when using clearInterval, they contain the ID for each interval.
    //typing this because I will absolutely forget it

    var updateInterval = setInterval(updateLoop, 1000 / fps)
    var idleInterval = setInterval(addIdle, 10)

    //setInterval(alert(upgrades["pebbles"].cost), 3000)

    if (node_or_html === "html") {
        $("#clickerPNG").on('click', click)
    }


    function addIdle() {
        sleepPerSecond = 0
        var clickValTemp = 0;
        console.log("Add Idle List Upgrades: " + listUpgrades);
        for (var i = 0; i <= listUpgrades.length - 1; i++) {
            var current = upgrades[listUpgrades[i]]
            console.log("Add Idle Current: ");
            console.log(current)
            if (current.type === "idle") {
                sleepPerSecond += (current.value * current.owned)
                totalSleep += (current.value * current.owned)
            }
            if (current.type === "click") {
                clickValTemp += (current.value * current.owned)
            }
            //console.log("Current Sleep: " + totalSleep)
        }
        clickValue = baseClickValue + clickValTemp
        updateText("#clickValue", clickValue)
    }

    function updateOwned() {
        for (var i = 0; i <= listUpgrades.length - 1; i++) {
            let current = upgrades[listUpgrades[i]]
            //alert(current.nameProper)
            /* console.log(current.nameProper + " Cost: " + current.cost)
            console.log(current.nameProper + " Owned: " + (current.owned ? current.owned : "0")) */
            updateText(("#" + current.name + "Cost"), current.cost)
            updateText(("#" + current.name + "Owned"), (current.owned ? current.owned : "0"))
        }
    }

    function updateLoop() {
        updateText("#totalSleep", totalSleep.toFixed(2))
        updateText("#sleepPerSecond", sleepPerSecond.toFixed(2))
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

    function getRandom(min, max) {
        var random = Math.round(Math.random() * (max - min) + min)
        if (random) {
            return (random);
        } else {
            return (getRandom(min, max))
        }
    }

    ///////////////////////////
    ////////Keybinds//////////
    //////////////////////////

    if (node_or_html === "html") {
        $(document).on('keypress', handleKeyDown)
    }

    //debug keybinds
    function handleKeyDown(event) {
        if (event.key === "d") {
            alert("d presses")
        }
        if (event.key === "e") {
            if ($("#inventory").css('display') === "none") {
                $("#inventory").css('display', "block")
            } else if ($("#inventory").css('display') === "block") {
                $("#inventory").css('display', "none")
            }
        }
    }


    //////////////////////////////////////////
    ////////Constructor for Inventory/////////
    //////////////////////////////////////////

    /* class Inventory_Object {
        constructor(image, name, nameProper, owned, description) {
            var x = {
                name: name,
                nameProper: nameProper,
                description: description,
                owned: owned,
                image: image,
                type: "inventory_object",
                id: "#" + name + "InventoryObject",
            }
        }
    } */

    /////////////////////////////////////////////
    //////Constructor for Inventory Items////////
    ////////////////////////////////////////////

    class Inventory_Item {
        constructor(image, name, nameProper, owned, description, srcPrefix) {
            var x = {
                name: name,
                nameProper: nameProper,
                description: description,
                owned: owned,
                image: image,
                type: "inventory_object",
                id: "#inventory_" + nameProper,
            };
            var div = "<div class='inventoryObject'><img src='" + srcPrefix + x.image + "' class='inventoryIcon'></img><p class='inventoryDescription' id='Inventory_" + x.name + "_Description'>" + x.description + "</p></div>";
            //var div = "<img src='img/" + x.image + "' class='inventoryIcon'></img>"
            //alert(div)
            inventory.push(x)
            if (node_or_html === "html") {
                $("#inventoryGrid").append(div)
                $(x.id).on('click', function () {
                    purchaseUpgrade(upgrades[name].name)
                })
            }
            //console.log(inventory)
        };

    }

    function getProperName(string) {
        var newString = (string[0]).toUpperCase() + string.substring(1, string.length)
        //console.log("UpperCaseString: " + newString)
        return (newString)
    }

    function RandomToolGenerator() {
        //alert("gen random tool")
        var random_tool = tools.names[getRandom(0, tools.names.length - 1)]
        var random_material = tools.materials[getRandom(0, tools.materials.length - 1)]
        return (random_material + "_" + random_tool + ".png")
    }

    function randomInventoryItem(amount, type) {
        if (type === "tool") {
            for (var i = 0; i < amount; i++) {
                var tool = RandomToolGenerator()
                //alert(tool)
                new Inventory_Item(tool, tool, getProperName(tool), 0, tool, tools.prefix)
            }
        } else if (type === "block") {
            for (var i = 0; i < amount; i++) {
                var block = items.prefix + items.names[getRandom(0, items.names.length - 1)]
                //alert(block)
                new Inventory_Item(block, block, getProperName(block), 0, block, items.prefix)
            }

        } else {
            alert("invalid type")
            return
        }
    }


    //////////////////////////////////////////
    ////////Constructor for Upgrades//////////
    //////////////////////////////////////////
    class Idle_Upgrade {
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
                type: "idle",
                id: "#" + name + "Upgrade",
            }
            var div = "<div id='" + (name + 'Upgrade') + "' class='upgrade'> <img class='icon' src='img/blocks/" + image + "'><p>" + nameProper + "</p><br><p><span class='upgradeDescription'>" + description + "</span></p> <p><span>" + value + "</span> sleep per second</p> <p>Cost: <span id='" + name + "Cost" + "'>" + x.cost + " sleep</span></p> <p>" + nameProper + " Owned: <span id='" + (name + "Owned") + "'></span></p> </div>";
            upgrades[name] = x
            listUpgrades.push(name)
            if (node_or_html === "html") {
                $("#idleUpgradesList").append(div)
                $(x.id).on('click', function () {
                    purchaseUpgrade(upgrades[name].name)
                })
            }
            //alert(div)
        }
    }
    class Click_Upgrade {
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
                type: "click",
                id: "#" + name + "Upgrade",
            }
            var div = "<div id='" + (name + 'Upgrade') + "' class='upgrade'> <img class='icon' src='img/tools/" + image + "'><p>" + nameProper + "</p><br><p><span class='upgradeDescription'>" + description + "</span></p> <p><span>" + value + "</span> Extra sleep on click</p> <p>Cost: <span id='" + name + "Cost" + "'>" + x.cost + " sleep</span></p> <p>" + nameProper + " Owned: <span id='" + (name + "Owned") + "'></span></p> </div>";
            upgrades[name] = x
            listUpgrades.push(name)
            if (node_or_html === "html") {
                $("#clickUpgradesList").append(div)
                $(x.id).on('click', function () {
                    purchaseUpgrade(upgrades[name].name)
                })
            }
            //alert(div)
        }
    }

    ////////////////////////////////////
    ////////ADD IDLE UPGRADES//////////
    ///////////////////////////////////

    new Idle_Upgrade("cobblestone.png", "pebbles", "Pebbles", 0, 0.1, 10, "A small rock, to lay your head on");
    new Idle_Upgrade("string.png", "twine", "Twine", 0, 10, 100, "A strand of fibers, useful for assorted crafts!");

    ////////////////////////////////////
    ////////ADD CLICK UPGRADES//////////
    ////////////////////////////////////

    new Click_Upgrade("wood_hoe.png", "wooden_hoe", "Wooden Hoe", 0, 1, 10, "A wooden hoe. Im not sure why, but here you go");
    new Click_Upgrade("wood_shovel.png", "wooden_shovel", "Wooden Shovel", 0, 1, 50, "A wooden shovel. go dig yourself some bitches.");
    new Click_Upgrade("wood_pickaxe.png", "wooden_pickaxe", "Wooden Pickaxe", 0, 1, 50, "A wooden pickaxe. smack shit around i guess");
    new Click_Upgrade("wood_sword.png", "wooden_sword", "Wooden Sword", 0, 1, 50, "A wooden sword. clown on some hoes");


    randomInventoryItem(10, "tool")
    //alert(inventory)
    //alert(inventory.length)
}

///USE FOR NODE DEBUGGING