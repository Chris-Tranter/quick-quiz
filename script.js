function quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.currentQuestionIndex = 0;
}

quiz.example.guess = function(answer) {
    if(this.getCurrentQuestion().isCorrect(Answer)) {
        this.score++;
    }
    this.currentQuestionIndex++;
};

quiz.example.getCurrentQuestion = function() {
    return this.questions [this.currentQuestionIndex];
};

quiz.example.hadEnded = function() {
    return this.currentQuestionIndex >= this.questions.length;
};
function question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

question.example.isCorrectAnswer = function (choice) {
    return this.answer === choice;
};
let quizUI = {
    displayNext: function() {
        if (quiz.hasEnded()) {
            this.displayScore();
        } else {
            this.displayQuestion();
            this.displayChoices();
            this.displayProgress();
        }
    },
    displayQuestion: function() {
        this.populateIdWithHTML("question", quiz.getCurrentQuestion().text);
    },
    displayChoices: function() {
        let choices = quiz.getCurrentQuestion().choices;

        for(let i = 0; i < choices.length; i++) {
            this.populateIdWithHTML("choice" + i, choices[i]);
            this.guessHandler("Guess" + i, choices[i]);
        }
    },
    displayScore: function() {
        let gameOverHTML = "<h1>Game Over</h1>";
        gameOverHTML += "<h2> Your score is: " + quiz.score + " / 5 </h2>";
        this.populateIdWithHTML("quiz", gameOverHTML);
    },

    populateIdWithHTML: function(id, text) {
        let element = document.getElementById(id);
        element.innerHTML = text;
    },
    guessHandler: function(id, guess) {
        let button = document.getElementById(id);
        button.onclick = function() {
            quiz.guess(guess);
            quizUI.displayNext();
        }
    },

    displayProgress: function() {
        let CurrentQuestionNumber = quiz.currentQuestionIndex + 1;
        this.populateIdWithHTML("progress", "question " + CurrentQuestionNumber + " of " + quiz.questions.length);
    }
};

//creating questions below
let questions = [
    new question("How many fingers am i holding up?", ["one", "two", "three", "four"],"one"),
    new question("How many toenails do i have?", ["two", "four", "six", "ten"],"ten"),
    new question("How cool am i out of 5?", ["two", "three", "one", "five"],"five"),
    new question("Whats better to eat?", ["ice-cream", "dog-food", "cabbage", "rust"],"ice-cream"),
    new question("best animal?", ["cat", "dog", "shrimp", "parrot"],"cat")
];

//create quiz below
let quiz = new quiz(questions);

//display quiz
quizUI.displayNext();