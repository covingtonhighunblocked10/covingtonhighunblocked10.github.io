$(document).ready(setFunctions)

function setFunctions() {
    var output = "#terminal"
    $("#start").on("click", startPrint(9999999, 0, 0, "g0T", output))
    $("#stop").on("click", toggle(printActive))
    $("#clear").on("click", clearText(output))
}