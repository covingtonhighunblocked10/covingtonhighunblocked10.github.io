$(document).ready(runProgram)
//this program is utter bullshit ignore it please
function runProgram() {
    function calculate() {
        var cost = prompt("Cost")
        var discount = prompt("Discount")
        var newPrice = cost - (cost * (discount/100))
        alert("You Save " + round(cost - newPrice))
        alert("You Pay " + round(newPrice))
    }
    function round(number) {
        var i = number * 100
        i = Math.round(i)
        return (i/100)
    }
    calculate();
}