var answers = {
    1: {
        question: "What does three up and three down mean to you Airman?",
        answer: ["end", "End", "of", "an", "inning", "?"],
        response: ["congrats! This comedy movie from 1987 is widely known because of the iconic 'GOOD MORNING VIETNAM!'. Have a fragment of a clue, as a treat :)",
            ".- / -.-. --- .-- -... --- -.-- / .-. .. -.. . ... / .. -. - --- / - --- .-- -. / --- -. / ..-. .-. .. -.. .- -.-- --..-- / ... - .- -.-- ... / - .... .-. . . / -.. .- -.-- ... / .- -. -.. / .-.. . .- ...- . ... / --- -. / ..-. .-. .. -.. .- -.-- / .... --- .-- / -.. --- . ... / .... . / -.. --- / .. - ..--.."
        ],
    }
};

function checkAnswer(question) {
    alert("#input" + question)
    var input = $(("#input" + question)).val()
    alert(input)
    alert()
    for (var i = 0; i <= (answers[question].answer).length; i++) {
        if (input.contains(answers[question][i])) {
            for (var i = 0; i <= (answers[question].response).length; i++) {
                alert("nice")
                alert(response[i])
            }
            return (true)
        } else {
            alert("Incorrect! Try again bozo!")
        }
    }
}