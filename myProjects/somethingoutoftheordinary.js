$(document).ready(testUser)

function testUser() {
    alert("So far, I've given you direct instructions on how to proceed, but now, you will need to find passage yourself. A code will be hidden in this page somewhere, use the code provided to access the next clue")
    if (prompt("Paste code here") === "November 13th, 2021") {
        alert("Congrats! You have been allowed the next hint! This is the day of the original publish of this website, before any games, chat systems, or anything really")
        alert("To continue, copy and paste this link into your browser bar https://anotepad.com/notes/kgd9ha4d")
    }
    else {
        alert("wrong code, sorry dude :/")
    }
}