//use "node" for node debugging, "html" for display mode
var node_or_html = "html"
if (node_or_html === "html") {
    $(document).ready(runClicker)
}

if (node_or_html === "node") {
    ///USE FOR NODE DEBUGGING
    runClicker()
}

function runClicker() {
    var baseClickValue = 1;
    var clickValue = baseClickValue;
    var totalCurrency = 10000;
    var currencyPerSecond = 0;
    var upgrades = {};
    var inventory = {};
    var current_block_texture = "cobblestone";
    var block_textures = ["cobblestone", "oak_log", "acacia_log", "birch_log", "jungle_log", "spruce_log"]
    var break_stage_source = ["destroy_stage_0.png", "destroy_stage_1.png", "destroy_stage_2.png", "destroy_stage_3.png", "destroy_stage_4.png", "destroy_stage_5.png", "destroy_stage_6.png", "destroy_stage_7.png", "destroy_stage_8.png", "destroy_stage_9.png"]
    var break_state = 0
    var tools = {
        prefix: "img/tools/",
        materials: ["wood", "stone", "iron", "gold", "diamond", "netherite"],
        names: ["shovel", "pickaxe", "hoe", "sword", "axe"],
    }
    var items = {
        prefix: "img/blocks/",
        names: ["cobblestone", "string"]
    }
    //var example_descriptions = ["Test Description 1", "Test Description 2", "Test Description 3"];

    var fps = 60

    //setInterval(alert(upgrades["pebbles"].cost), 3000)

    if (node_or_html === "html") {
        $("#clickerPNG").on('click', click)
        //use these variables when using clearInterval, they contain the ID for each interval.
        //typing this because I will absolutely forget it
        var updateInterval = setInterval(updateLoop, 1000 / fps)
        var idleInterval = setInterval(addIdle, 1000)
        //var updateOwnedInterval = setInterval(updateOwned, 1000)
    }

    function get_object_keys(object) {
        var keys = Object.keys(object)
        //console.log("get_object_keys returns: " + keys)
        return (keys)
    }

    function addIdle() {
        currencyPerSecond = 0
        var clickValTemp = 0;
        var keys = get_object_keys(upgrades)
        for (var i = 0; i <= keys.length - 1; i++) {
            var current = upgrades[keys[i]]
            if (current.type === "idle") {
                currencyPerSecond += (current.value * current.owned);
                totalCurrency += (current.value * current.owned);
            }
            if (current.type === "click") {
                clickValTemp += (current.value * current.owned);
            }
        }
        clickValue = baseClickValue + clickValTemp
        updateText("#clickValue", clickValue)
    }

    function updateOwned() {
        var inventory_keys = get_object_keys(inventory)
        var upgrade_keys = get_object_keys(upgrades)
        /* console.log(inventory_keys)
        console.log(upgrade_keys) */
        for (var i = 0; i <= upgrade_keys.length - 1; i++) {
            if (upgrade_keys[i].type === "idle" || "click") {
                let current = upgrades[upgrade_keys[i]]
                /* console.log(current.name)
                console.log(current.cost)
                console.log(current.id) */
                if (node_or_html === "html") {
                    updateText(("#" + current.name + "_cost"), current.cost)
                    updateText(("#" + current.name + "_owned"), (current.owned ? current.owned : "0"))
                }
            }
        }
        for (var i = 0; i <= inventory_keys.length - 1; i++) {
            let current = inventory[inventory_keys[i]]
            /* console.log(current)
            console.log(current.name)
            console.log(current.id) */
            if (node_or_html === "html") {
                updateText(("#inventory_" + current.name + "_owned"), (current.owned ? current.owned : "0"))
            }
        }

    }

    function updateLoop() {
        updateText("#totalCurrency", totalCurrency.toFixed(2))
        updateText("#currencyPerSecond", currencyPerSecond.toFixed(2))
        hide_show_inventory_objects();
        updateOwned()
    }

    function updateText(id, text) {
        if (node_or_html === "html") {
            $(id).text(text);
        }

    }

    function click() {
        advanceBreak()
    }

    function advanceBreak() {
        break_state += clickValue
        if (break_state > break_stage_source.length - 1) {
            break_state = 0
            totalCurrency += clickValue
            inventory[current_block_texture].owned++
            current_block_texture = block_textures[getRandom(0, block_textures.length - 1)]
            //alert(current_block_texture)
        }
        $("#clickerPNG").attr('src', ("img/icons/" + current_block_texture + ".png"))
        $("#breakPNG").attr('src', ("img/break_stages/" + break_stage_source[break_state]))
        //alert($("#breakPNG").attr('src'))
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

    function getProperName(string) {
        var newString = (string[0]).toUpperCase() + string.substring(1, string.length)
        //console.log("UpperCaseString: " + newString)
        return (newString)
    }

    /////////////////////////////////////////////////
    ///////MISC FUNCTIONS FOR TESTING PURPOSES///////
    /////////////////////////////////////////////////

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
                new Inventory_Item(tool, tool, getProperName(tool), 0, tool)
            }
        } else if (type === "block") {
            for (var i = 0; i < amount; i++) {
                var block = items.prefix + items.names[getRandom(0, items.names.length - 1)]
                //alert(block)
                new Inventory_Item(block, block, getProperName(block), 0, block)
            }

        } else {
            alert("invalid type")
            return
        }
    }

    /////////////////////////////////////////////
    //////Constructor for Inventory Items////////
    ////////////////////////////////////////////
    class Inventory_Item {
        constructor(image, name, nameProper, owned, description, tags) {
            var x = {
                name: name,
                nameProper: nameProper,
                description: description,
                owned: owned,
                tags: tags ? tags : [],
                image: image,
                type: "inventory_object",
                id: "inventory_" + name,
            };
            var div = "<div class='inventoryObject' id='" + x.id + "'><img src='" + x.image + "' class='inventoryIcon'></img><p class='inventoryDescription' id='inventory_" + x.id + "_description'>" + x.description + "<br> Owned: <span id='" + x.id + "_owned'></span></p></div>";
            //using this for testing//
            x.div = div
            //////////////////////////
            x.id = "#" + x.id
            inventory[name] = x
            //console.log(inventory)
            if (node_or_html === "html") {
                $("#inventoryGrid").append(div)
                $(x.id).on('click', function () {
                    //attemptCraft(upgrades[name].name)
                })
            }
            //console.log(inventory)
        };

    }

    //////////////////////////////////////////
    ////////Constructor for Upgrades//////////
    //////////////////////////////////////////
    class Idle_Upgrade {
        constructor(image, name, nameProper, owned, value, description, recipe, craftAmount, tags) {
            var x = {
                name: name,
                nameProper: nameProper,
                description: description,
                owned: recipe ? 0 : owned,
                value: value,
                recipe: recipe ? recipe : false,
                tags: tags ? tags : [],
                craftAmount: craftAmount ? craftAmount : 0,
                image: image,
                type: "idle",
                id: name + "_idle_upgrade",
            }
            var div = "<div id='" + x.id + "' class='upgrade'> <img class='icon' src='" + image + "'><p>" + nameProper + "</p><br><p><span class='upgradeDescription'>" + description + "</span></p> <p><span>" + value + "</span> damage per second</p> <p>" + nameProper + " Owned: <span id='" + (name + "_owned") + "'></span></p> </div>";
            x.id = "#" + x.id
            //using this for testing//
            x.div = div
            //////////////////////////
            upgrades[name] = x
            if (node_or_html === "html") {
                $("#idleUpgradesList").append(div)
                if (x.recipe) {
                    //console.log(x.name + " recipe")
                    //console.log(x.recipe)
                    $(x.id).append(recipe_to_div(upgrades[x.name]))
                }
                $(x.id).on('click', function () {
                    attemptCraft(upgrades[name])
                })
            }
            //alert(div)
        }
    }
    class Click_Upgrade {
        constructor(image, name, nameProper, owned, value, description, recipe, craftAmount, tags) {
            var x = {
                name: name,
                nameProper: nameProper,
                description: description,
                owned: owned,
                value: value,
                tags: tags ? tags : [],
                recipe: recipe ? recipe : false,
                craftAmount: craftAmount ? craftAmount : 0,
                image: image,
                type: "click",
                id: name + "_click_upgrade",
            }
            var div = "<div id='" + x.id + "' class='upgrade'> <img class='icon' src='" + image + "'><p>" + nameProper + "</p><br><p><span class='upgradeDescription'>" + description + "</span></p> <p><span>" + value + "</span> extra damage on click</p> <p>" + nameProper + " Owned: <span id='" + (name + "_owned") + "'></span></p> </div>";
            x.id = "#" + x.id
            //using this for testing//
            x.div = div
            //////////////////////////
            upgrades[name] = x
            if (x.recipe) {
                //console.log(x.name + " recipe")
                //console.log(x.recipe)
            }
            if (node_or_html === "html") {
                $("#clickUpgradesList").append(div)
                if (x.recipe) {
                    //console.log(x.name + " recipe")
                    //console.log(x.recipe)
                    $(x.id).append(recipe_to_div(upgrades[x.name]))
                }
                $(x.id).on('click', function () {
                    console.log(upgrades[name].name)
                    attemptCraft(upgrades[name])
                })
            }
        }
    }

    ////////////////////////////////////
    ////////ADD IDLE UPGRADES//////////
    ///////////////////////////////////

    new Idle_Upgrade("img/icons/string.png", "string", "String", 0, 10, "String. Not sure how you got this bro", );

    ////////////////////////////////////
    ////////ADD CLICK UPGRADES//////////
    ////////////////////////////////////
    new Click_Upgrade("img/icons/oak_plank.png", "oak_plank", "Oak Plank", 0, 0, "An oak plank", {
        "oak_log": 1,
    }, 4)

    new Click_Upgrade("img/icons/stick.png", "stick", "Stick", 0, 0, "A stick", {
        "oak_plank": 2,
    }, 4)

    new Click_Upgrade("img/tools/wood_hoe.png", "wooden_hoe", "Wooden Hoe", 0, 1, "A wooden hoe. Im not sure why, but here you go", {
        "oak_plank": 2,
        "stick": 2,
    }, 1);
    new Click_Upgrade("img/tools/wood_shovel.png", "wooden_shovel", "Wooden Shovel", 0, 1, "A wooden shovel", {
        "wood_plank": 1,
        "stick": 2,
    }, 1);
    new Click_Upgrade("img/tools/wood_pickaxe.png", "wooden_pickaxe", "Wooden Pickaxe", 0, 1, "A wooden pickaxe", {
        "wood_plank": 3,
        "stick": 2,
    }, 1);
    new Click_Upgrade("img/tools/wood_sword.png", "wooden_sword", "Wooden Sword", 0, 1, "A wooden sword", {
        "stick": 1,
        "wood_plank": 2,
    }, 1);
    new Click_Upgrade("img/tools/stone_pickaxe.png", "stone_pickaxe", "Stone Pickaxe", 0, 0, "A Stone Pickaxe", {
        "stick": 2,
        "cobblestone": 3,
    }, 1)

    //inventory upgrades
    new Inventory_Item("img/icons/acacia_log.png", "acacia_log", "Acacia Log", 0, "Acacia Log", ["wood_log"])
    new Inventory_Item("img/icons/spruce_log.png", "spruce_log", "Spruce Log", 0, "Spruce Log", ["wood_log"])
    new Inventory_Item("img/icons/jungle_log.png", "jungle_log", "Jungle Log", 0, "Jungle Log", ["wood_log"])
    new Inventory_Item("img/icons/birch_log.png", "birch_log", "Birch Log", 0, "Birch Log", ["wood_log"])
    new Inventory_Item("img/icons/oak_log.png", "oak_log", "Oak Log", 0, "Oak Log", ["wood_log"])
    new Inventory_Item("img/icons/acacia_plank.png", "acacia_plank", "Acacia Plank", 0, "Acacia Plank", ["wood_plank"])
    new Inventory_Item("img/icons/spruce_plank.png", "spruce_plank", "Spruce Plank", 0, "Spruce Plank", ["wood_plank"])
    new Inventory_Item("img/icons/jungle_plank.png", "jungle_plank", "Jungle Plank", 0, "Jungle Plank", ["wood_plank"])
    new Inventory_Item("img/icons/birch_plank.png", "birch_plank", "Birch Plank", 0, "Birch Plank", ["wood_plank"])
    new Inventory_Item("img/icons/oak_plank.png", "oak_plank", "Oak Plank", 2, "Oak Plank", ["wood_plank"])
    new Inventory_Item("img/icons/cobblestone.png", "cobblestone", "Cobblestone", 0, "Cobblestone")
    new Inventory_Item("img/icons/stick.png", "stick", "Stick", 0, "Stick")


    //hide or show objects depending on if they currently have any owned
    function hide_show_inventory_objects() {
        var keys = get_object_keys(inventory)
        for (i = 0; i <= keys.length - 1; i++) {
            //store current object in inventory
            var object = inventory[keys[i]]
            //console.log(object)
            if (object.owned) {
                /* console.log(object.name + " is currently being shown") */
                if (node_or_html === "html") {
                    $(object.id).css('display', 'block')
                }
            } else {
                /* console.log(object.name + " is currently not being shown") */
                if (node_or_html === "html") {
                    $(object.id).css('display', 'none')
                }
            }
        }
    }

    function recipe_to_div(item) {
        if (item.recipe) {
            var div = ""
            //retrieve and store all keys in the selected item
            var keys = get_object_keys(item.recipe)
            //console.log(keys)
            //store the number of succesful passes the loop should return to successfully craft, and current passed checks
            var reqs = keys.length
            for (let i = 0; i <= reqs - 1; i++) {
                var object = keys[i];
                //get cost and name of current resource
                var cost = item.recipe[object];
                var temp = getProperName(object) + ": " + cost
                div += temp
                div += " <br> "
                //console.log(div)
            }
            return (div)
        } else {
            return
        }
    }

    function increasePrice(upgrade) {
        var newPrice = upgrades[upgrade].baseCost * Math.pow(1.15, (upgrades[upgrade].owned))
        upgrades[upgrade].cost = newPrice.toFixed(2)
    }

    function attemptCraft(item) {
        //store all keys in the selected craft
        console.log()
        var keys = get_object_keys(item.recipe)
        console.log(keys)
        //store the number of succesful passes the loop should return to successfully craft, and current passed checks
        var reqs = keys.length;
        var currentReqs = 0;
        for (let i = 0; i <= reqs - 1; i++) {
            var object = keys[i];
            var cost = item.recipe[object];
            console.log("Item " + object + ", you need " + cost)
            if (inventory[object].owned >= cost) {
                //console.log("You own enough " + object + " to craft " + item.name)
                currentReqs++
            } else {
                //console.log("You do not enough " + object + " to craft " + item.name)
            }
        }
        //if requirement to craft is met
        if (currentReqs >= reqs) {
            for (let i = 0; i <= reqs - 1; i++) {
                var object = keys[i];
                //console.log(keys)
                var cost = item.recipe[object];
                if (inventory[object].owned >= cost) {
                    inventory[object].owned -= cost
                    console.log(inventory[object].owned)
                    //console.log("You now have " + inventory[object].owned + " " + inventory[object].name)
                }
            }
            //console.log(item.name)
            if (inventory[item.name]) {
                inventory[item.name].owned += item.craftAmount
            } else {
                inventory[item.name] = item
                inventory[item.name].owned += item.craftAmount
            }
            console.log(inventory[item.name])
            console.log("Succesfully crafted " + item.name)
        } else {
            console.log("Unsuccessfully crafted " + item.name)
        }
    }
}