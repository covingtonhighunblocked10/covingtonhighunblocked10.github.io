/* //////////////////////////////////////////
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
        var div = "<div id='" + (name + 'Upgrade') + "' class='upgrade'> <img class='icon' src='img/" + image + "'><p>" + nameProper + "</p><br><p><span class='upgradeDescription'>" + description + "</span></p> <p><span>" + value + "</span> sleep per second</p> <p>Cost: <span id='" + name + "Cost" + "'>" + x.cost + " sleep</span></p> <p>" + nameProper + " Owned: <span id='" + (name + "Owned") + "'></span></p> </div>";
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
        var div = "<div id='" + (name + 'Upgrade') + "' class='upgrade'> <img class='icon' src='img/" + image + "'><p>" + nameProper + "</p><br><p><span class='upgradeDescription'>" + description + "</span></p> <p><span>" + value + "</span> Extra sleep on click</p> <p>Cost: <span id='" + name + "Cost" + "'>" + x.cost + " sleep</span></p> <p>" + nameProper + " Owned: <span id='" + (name + "Owned") + "'></span></p> </div>";
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
} */