const questions = [
    {
        question: "which is the largest animal in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "BLUE whale", correct: true },
            { text: "elephant", correct: false },
            { text: "lion", correct: false },
        ]
    },
    {
        question: "which is the smallest animal in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "frog", correct: true },
            { text: "elephant", correct: false },
            { text: "lion", correct: false },
        ]
    },
    {
        question: "which is the smallest country in the world?",
        answers: [
            { text: 'Vatican city', correct: true },
            { text: 'bhutan', correct: false },
            { text: 'nepal', correct: false },
            { text: 'india', correct: false },
        ]
    },
    {
        question: "which is the smallest continent in the world",
        answers: [
            { text: 'asia', correct: false },
            { text: 'africa', correct: false },
            { text: 'Australia', correct: true },
            { text: 'south america', correct: false },
        ]
    }
];

const questionElement = document.getElementById("QUESTION");
const answerButtonsElement = document.getElementById("answer");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";
    if (correct) {
        score++;
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === "true");
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Restart";
    nextButton.style.display = "block";
    nextButton.addEventListener("click", startQuiz);
}

startQuiz();
