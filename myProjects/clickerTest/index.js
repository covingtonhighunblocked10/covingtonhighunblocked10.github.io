//use "node" for node debugging, "html" for display mode
//courtesy of chsunblocked
var node_or_html = "html"
if (node_or_html === "html") {
    $(document).ready(runClicker)
}

if (node_or_html === "node") {
    ///USE FOR NODE DEBUGGING
    runClicker()
}

function runClicker() {
    var keys = {
        space: "released",
    };
    var baseClickValue = 1;
    var clickValue = baseClickValue;
    var totalCurrency = 10000;
    var currencyPerSecond = 0;
    var baseIdleValue = 10;
    var upgrades = {};
    var inventory = {};
    var crafts = {};

    //this is the default texture
    var current_block_texture = "cobblestone";
    //later options for block_textures, if i feel it would make the game better
    //"acacia_log", "birch_log", "jungle_log", "spruce_log"

    //for the clicker icon, and the breaking stage overlays to go with it
    var block_textures = ["oak_log", "cobblestone"]
    var break_stage_source = ["destroy_stage_0.png", "destroy_stage_1.png", "destroy_stage_2.png", "destroy_stage_3.png", "destroy_stage_4.png", "destroy_stage_5.png", "destroy_stage_6.png", "destroy_stage_7.png", "destroy_stage_8.png", "destroy_stage_9.png"]
    var block_health = break_stage_source.length
    var blocks_broken_total = 0
    var break_state = 0
    var damage = 0
    var tools = {
        prefix: "img/tools/",
        materials: ["wood", "stone", "iron", "gold", "diamond", "netherite"],
        names: ["shovel", "pickaxe", "hoe", "sword", "axe"],
    }

    //maybe used later for random tool generation
    //var example_descriptions = ["Test Description 1", "Test Description 2", "Test Description 3"];

    var fps = 60

    if (node_or_html === "html") {
        $("#clickerPNG").on('click', click)
        //use these variables when using clearInterval, they contain the ID for each interval.
        //typing this because I will absolutely forget it
        var updateInterval = setInterval(updateLoop, 1000 / fps)
        var idleInterval = setInterval(addIdle, 1000 / fps)
        //var updateOwnedInterval = setInterval(updateOwned, 1000)
    }
    if (node_or_html === "node") {
        var updateInterval = setInterval(updateLoop, 1000 / fps)
        var idleInterval = setInterval(addIdle, 1000 / fps)
    }


    function get_object_keys(object) {
        var keys = Object.keys(object);
        return (keys)
    }

    function addIdle() {
        var damagePerSecond = 0;
        var clickValTemp = 0;
        var damageValTemp = 0;
        //reduce the gain per iteration so that you gain steady damage instead of once a second
        var keys = get_object_keys(upgrades);
        for (var i = 0; i <= keys.length - 1; i++) {
            var current = upgrades[keys[i]]
            if (current.type === "idle") {
                damageValTemp += (current.value * current.owned);
                advanceBreak((current.value * current.owned) / (1000 / fps));
            }
            if (current.type === "click") {
                clickValTemp += (current.value * current.owned);
            }
        }
        damagePerSecond = baseIdleValue + damageValTemp;
        clickValue = baseClickValue + clickValTemp;
        updateText("#damagePerSecond", damagePerSecond);
        updateText("#clickValue", clickValue);
    }

    function updateOwned() {
        var inventory_keys = get_object_keys(inventory)
        var upgrade_keys = get_object_keys(upgrades)
        for (var i = 0; i <= upgrade_keys.length - 1; i++) {
            if (upgrade_keys[i].type === "idle" || "click") {
                let current = upgrades[upgrade_keys[i]]
                if (node_or_html === "html") {
                    updateText(("#" + current.name + "_cost"), current.cost)
                    updateText(("#" + current.name + "_owned"), (current.owned ? current.owned : "0"))
                };
            };
        };
        for (var i = 0; i <= inventory_keys.length - 1; i++) {
            if (node_or_html === "html") {
                let current = inventory[inventory_keys[i]]
                updateText(("#inventory_" + current.name + "_owned"), (current.owned ? current.owned : "0"))
            };
        };

    }

    function updateLoop() {
        hide_show_inventory_objects();
        hide_show_tools()
        updateText("#totalCurrency", totalCurrency.toFixed(2))
        updateText("#currencyPerSecond", currencyPerSecond.toFixed(2))
        updateOwned()
    }

    function updateText(id, text) {
        if (node_or_html === "html") {
            $(id).text(text);
        }
    }

    function click() {
        advanceBreak(clickValue)
    }

    function advanceBreak(requestedDamage) {
        //blocks_broken_total = 0
        fullDamage(requestedDamage)
        if (node_or_html === "html") {
            $("#blockHealthRemaining").text((block_health - damage).toFixed(2))
            $("#clickerPNG").attr('src', ("img/icons/" + current_block_texture + ".png"))
            $("#breakPNG").attr('src', ("img/break_stages/" + (break_stage_source[Math.round(damage)])))
        }
    }

    function fullDamage(requestedDamage) {
        console.log(requestedDamage)
        if (Math.ceil(damage + requestedDamage) >= block_health) {
            blocks_broken_total++;
            damage = 0;
            break_state = 0;
            inventory[current_block_texture].owned++;
            var newBlock = Math.round(getRandom(0, block_textures.length - 1));
            console.log(newBlock);
            current_block_texture = block_textures[newBlock];
            fullDamage(requestedDamage - block_health)
        } else {
            if (requestedDamage >= 0) {
                damage += requestedDamage;
                break_state = Math.round(damage);
            }
            if (Math.ceil(damage + requestedDamage) > block_health) {
                blocks_broken_total++
                damage = 0;
                break_state = 0;
                inventory[current_block_texture].owned++;
                var newBlock = Math.round(getRandom(0, block_textures.length - 1));
                current_block_texture = block_textures[newBlock];
            };
        };
    };

    function getRandom(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    ///////////////////////////
    ////////Keybinds//////////
    //////////////////////////

    if (node_or_html === "html") {
        $(document).on('keypress', handleKeyDown)
        $(document).on('keyup', handleKeyUp)
    }

    //debug keybinds
    function handleKeyDown(event) {
        if (event.which === 32) {
            //alert("Space")
            if (keys.space === "released") {
                advanceBreak(clickValue)
                keys.space = "held"
            }
        }
    }

    function handleKeyUp(event) {
        if (event.which === 32) {
            if (keys.space === "held") {
                keys.space = "released"
            }
        }
    }
    ////////////////////////////////////////////////////////
    ///////MISC FUNCTIONS FOR DUMB OR USEFUL PURPOSES///////
    ////////////////////////////////////////////////////////

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

    function hide_show_tools() {
        var keys = get_object_keys(upgrades)
        for (i = 0; i <= keys.length - 1; i++) {
            //store current object in inventory
            var object = upgrades[keys[i]]
            //console.log(object)
            if (object.owned >= object.maxCrafts) {
                /* console.log(object.name + " is currently being shown") */
                console.log("hide " + object.nameProper)
                if (node_or_html === "html") {
                    $(object.id).css('display', 'none')
                }
            } else {
                console.log("show " + object.nameProper)
                /* console.log(object.name + " is currently not being shown") */
                if (node_or_html === "html") {
                    $(object.id).css('display', 'block')
                }
            }
        }
    }

    function recipe_to_div(item) {
        if (item.recipe) {
            var div = ""
            //retrieve and store all keys in the selected item
            var keys = get_object_keys(item.recipe)
            //item name.
            //fun fact, i spent three hours debugging just to now find out i had the proper name already stored prior to tearing my hair out.
            //At 5:04PM, february the third, of 2022, i am feeling extremely slow.
            //thanks for disabling inspect, school chromebooks. its great, really, that you did that.
            //wait. im actually still stupid. one second. nvm im 
            //store the number of succesful passes the loop should return to successfully craft, and current passed checks
            var reqs = keys.length
            for (let i = 0; i <= reqs - 1; i++) {
                let object = keys[i];

                //get cost and name of current resource
                var cost = item.recipe[object];
                var temp = object + ": " + cost
                div += temp + "<br>"
            }
            return ("<p>" + div + "</p>")
        } else {
            return; /* "<p> no recipe found, this is an error message, blah blah blah blah blah blah blah blah</p>" */
        }
    }

    function increasePrice(upgrade) {
        var newPrice = upgrades[upgrade].baseCost * Math.pow(1.15, (upgrades[upgrade].owned))
        upgrades[upgrade].cost = newPrice.toFixed(2)
    }

    function attemptCraft(item) {
        console.log(item)
        //store all keys for the selected craft
        var keys = get_object_keys(item.recipe)
        //store the number of succesful passes the loop should return to successfully craft, and current passed checks
        var reqs = keys.length;
        var currentReqs = 0;
        if (item.owned <= item.maxCrafts) {
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
                        //console.log("You now have " + inventory[object].owned + " " + inventory[object].name)
                    }
                }
                if (inventory[item.name]) {
                    inventory[item.name].owned += item.craftAmount
                } else {
                    inventory[item.name] = item
                    inventory[item.name].owned += item.craftAmount
                }
                console.log("Succesfully crafted " + item.name)
            } else {
                console.log("Unsuccessfully crafted " + item.name)
            }
        } else {
            alert("max crafts reached for " + item.name)
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
            //x.div = div
            //////////////////////////
            x.id = "#" + x.id
            inventory[name] = x
            if (node_or_html === "html") {
                $("#inventoryGrid").append(div)
                $(x.id).on('click', function () {
                    //attemptCraft(upgrades[name].name)
                })
            }
        };

    }

    //////////////////////////////////////////
    ////////Constructor for Upgrades//////////
    //////////////////////////////////////////
    class Idle_Upgrade {
        constructor(image, name, nameProper, owned, value, description, recipe, craftAmount, maxCrafts) {
            var x = {
                name: name,
                nameProper: nameProper,
                description: description,
                owned: owned,
                value: value ? value : owned,
                recipe: recipe ? recipe : false,
                craftAmount: craftAmount ? craftAmount : 0,
                maxCrafts: maxCrafts ? maxCrafts : 999999999999999,
                image: image,
                type: "idle",
                id: name + "_idle_upgrade",
            }
            //if the owned number of objects is visible in the crafting area, hide the owned from here
            var owned;
            //same as above, but for displaying value
            var damage;
            var recipe;
            if (!recipe && !value) {
                recipe = ""
                owned = ""
                damage = ""
            } else {
                recipe = "<p><br>recipe-<br></p>" + recipe_to_div(x)
                damage = "<p><span>" + value + "</span> damage per second</p>"
                owned = "<p>" + nameProper + " Owned: <span id='" + (name + "_owned") + "'></span></p>"
            }
            var div = "<div id='" + x.id + "' class='upgrade'> <img class='icon' src='" + image + "'><p>" + nameProper + "</p><br><p><span class='upgradeDescription'>" + description + "</span></p>" + (damage) + (owned) + (recipe) + "</div>";
            x.id = "#" + x.id
            //using this for testing//
            //x.div = div
            //////////////////////////
            upgrades[name] = x
            if (node_or_html === "html") {
                $("#idleUpgradesList").append(div)
                $(x.id).on('click', function () {
                    attemptCraft(upgrades[name])
                })
            } else if (node_or_html === "node") {
                //placeholder line
            }
        }
    }
    class Click_Upgrade {
        constructor(image, name, nameProper, owned, value, description, recipe, craftAmount, maxCrafts) {
            //alert("creating " + name)
            var x = {
                name: name,
                nameProper: nameProper,
                description: description,
                owned: owned,
                value: value ? value : 0,
                recipe: recipe ? recipe : false,
                craftAmount: craftAmount ? craftAmount : 0,
                maxCrafts: maxCrafts ? maxCrafts : 999999999999999,
                crafted: 0,
                image: image,
                type: "click",
                id: name + "_click_upgrade",
            }
            //if the owned number of objects is visible in the crafting area, hide the owned from here
            var owned;
            //same as above, but for displaying value
            var damage;
            var recipe;
            if (!recipe && !value) {
                recipe = ""
                owned = ""
                damage = ""
            } else {
                recipe = "<p><br>recipe-<br></p>" + recipe_to_div(x)
                damage = "<p><span>" + value + "</span> Extra damage per click</p>"
                owned = "<p>" + nameProper + " Owned: <span id='" + (name + "_owned") + "'></span></p"
            }
            var div = "<div id='" + x.id + "' class='upgrade'> <img class='icon' src='" + x.image + "'><p>" + x.nameProper + "</p><br><p><span class='upgradeDescription'>" + x.description + "</span></p>" + (damage) + (owned) + (recipe) + "</div>";
            x.id = "#" + x.id
            //using this for testing//
            //x.div = div
            //////////////////////////
            upgrades[name] = x
            if (node_or_html === "html") {
                $("#clickUpgradesList").append(div)
                $(x.id).on('click', function () {
                    attemptCraft(upgrades[name])
                })
            } else if (node_or_html === "node") {
                //placeholder line
            }
        }
    }
    class Craftable_Item {
        constructor(image, name, nameProper, owned, description, recipe, craftAmount, maxCrafts, type) {
            var x = {
                name: name,
                nameProper: nameProper,
                description: description,
                owned: owned,
                recipe: recipe ? recipe : false,
                craftAmount: craftAmount ? craftAmount : 0,
                maxCrafts: maxCrafts,
                image: image,
                type: type,
                id: "craftable_item_" + name,
            }
            //if the owned number of objects is visible in the crafting area, hide the owned from here
            var owned;
            var recipe;
            if (!recipe) {
                recipe = ""
                owned = ""
            } else {
                recipe = "<p><br>recipe-<br></p>" + recipe_to_div(x)
                owned = "<p>" + nameProper + " Owned: <span id='" + (name + "_owned") + "'></span></p>"
            }
            var div = "<div id='" + x.id + "' class='upgrade'> <img class='icon' src='" + x.image + "'><p>" + x.nameProper + "</p><br><p><span class='upgradeDescription'>" + (owned) + (recipe) + "</span></p></div>";
            x.id = "#" + x.id
            //using this for testing//
            //x.div = div//
            //////////////////////////
            crafts[name] = x
            if (node_or_html === "html") {
                $("#craftableUpgradesList").append(div)
                $(x.id).on('click', function () {
                    attemptCraft(crafts[name])
                })
            } else if (node_or_html === "node") {
                //placeholder name
            }
        }
    }

    /////////////////////////////////////
    ////////ADD INVENTORY ITEMS//////////
    ////////////////////////////////////

    new Inventory_Item("img/icons/acacia_log.png", "acacia_log", "Acacia Log", 0, "Acacia Log")
    new Inventory_Item("img/icons/spruce_log.png", "spruce_log", "Spruce Log", 0, "Spruce Log")
    new Inventory_Item("img/icons/jungle_log.png", "jungle_log", "Jungle Log", 0, "Jungle Log")
    new Inventory_Item("img/icons/birch_log.png", "birch_log", "Birch Log", 0, "Birch Log")
    new Inventory_Item("img/icons/oak_log.png", "oak_log", "Oak Log", 0, "Oak Log")
    new Inventory_Item("img/icons/acacia_plank.png", "acacia_plank", "Acacia Plank", 0, "Acacia Plank")
    new Inventory_Item("img/icons/spruce_plank.png", "spruce_plank", "Spruce Plank", 0, "Spruce Plank")
    new Inventory_Item("img/icons/jungle_plank.png", "jungle_plank", "Jungle Plank", 0, "Jungle Plank")
    new Inventory_Item("img/icons/birch_plank.png", "birch_plank", "Birch Plank", 0, "Birch Plank")
    new Inventory_Item("img/icons/oak_plank.png", "oak_plank", "Oak Plank", 0, "Oak Plank")
    new Inventory_Item("img/icons/cobblestone.png", "cobblestone", "Cobblestone", 0, "Cobblestone")
    new Inventory_Item("img/icons/stick.png", "stick", "Stick", 0, "Stick")

    //////////////////////////////////
    ////////ADD CRAFT ITEMS//////////
    /////////////////////////////////

    new Craftable_Item("img/icons/oak_plank.png", "oak_plank", "Oak Plank", 0, "An oak plank", {
        "oak_log": 1,
    }, 4, false)
    new Craftable_Item("img/icons/stick.png", "stick", "Stick", 0, "A stick", {
        "oak_plank": 2,
    }, 4, false)

    ////////////////////////////////////
    ////////ADD IDLE UPGRADES//////////
    ///////////////////////////////////

    /* new Idle_Upgrade("img/icons/string.png", "string", "String", 1, 1, "String. Not sure how you got this bro, this is literally for testing. if you see this, fuck you, because it means i messed up somewhere, nothing personal btw", ); */
    new Idle_Upgrade("img/icons/furnace_active.png", "furnace", "Furnace", 0, .5, "A furnace", {
        "cobblestone": 9,
    }, 1, false);

    ////////////////////////////////////
    ////////ADD CLICK UPGRADES//////////
    ////////////////////////////////////

    new Click_Upgrade("img/tools/wood_hoe.png", "wooden_hoe", "Wooden Hoe", 1, .1, "A wooden hoe. Im not sure why, but here you go", {
        "oak_plank": 2,
        "stick": 2,
    }, 1, 5);
    new Click_Upgrade("img/tools/wood_axe.png", "wooden_axe", "Wooden Axe", 0, .1, "A wooden axe.", {
        "oak_plank": 2,
        "stick": 2,
    }, 1, 5);
    new Click_Upgrade("img/tools/wood_shovel.png", "wooden_shovel", "Wooden Shovel", 0, .1, "A wooden shovel", {
        "oak_plank": 1,
        "stick": 2,
    }, 1, 5);
    new Click_Upgrade("img/tools/wood_sword.png", "wooden_sword", "Wooden Sword", 0, .1, "A wooden sword", {
        "stick": 1,
        "oak_plank": 2,
    }, 1, 5);
    new Click_Upgrade("img/tools/wood_pickaxe.png", "wooden_pickaxe", "Wooden Pickaxe", 0, .1, "A wooden pickaxe", {
        "oak_plank": 3,
        "stick": 2,
    }, 1, 5);
    new Click_Upgrade("img/tools/stone_hoe.png", "stone_hoe", "Stone Hoe", 0, .5, "A stone hoe", {
        "stick": 2,
        "cobblestone": 2,
    }, 1, 5);
    new Click_Upgrade("img/tools/stone_axe.png", "stone_axe", "Stone Axe", 0, .5, "A stone xe", {
        "stick": 2,
        "cobblestone": 3,
    }, 1, 5);
    new Click_Upgrade("img/tools/stone_shovel.png", "stone_shovel", "Stone Shovel", 0, .5, "A stone shovel", {
        "stick": 2,
        "cobblestone": 1,
    }, 1, 5);
    new Click_Upgrade("img/tools/stone_sword.png", "stone_sword", "Stone Sword", 0, .5, "A stone sword", {
        "stick": 1,
        "cobblestone": 2,
    }, 1, 5);
    new Click_Upgrade("img/tools/stone_pickaxe.png", "stone_pickaxe", "Stone Pickaxe", 0, .5, "A Stone Pickaxe", {
        "stick": 2,
        "cobblestone": 3,
    }, 1, 5);
}