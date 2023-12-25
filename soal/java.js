const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const ScoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
{
    question: "Apa itu JavaScript?",
    choice1: "Bahasa pemrograman untuk desain grafis",
    choice2: "Bahasa pemrograman untuk pengembangan server-side",
    choice3: "Bahasa pemrograman untuk pengembangan web",
    choice4: "Bahasa pemrograman untuk kecerdasan buatan",
    answer: 3,
},
{
    question: "Apa arti singkatan DOM dalam konteks JavaScript?",
    choice1: "Document Object Model",
    choice2: "Data Object Model",
    choice3: "Design Object Model",
    choice4: "Document Oriented Model",
    answer: 1,
},
{
    question: "Bagaimana cara mengomentari satu baris dalam JavaScript?",
    choice1: "<!-- Ini komentar -->",
    choice2: "// Ini komentar",
    choice3: "/* Ini komentar */",
    choice4: "''' Ini komentar '''",
    answer: 2,
},
{
    question: "Bagaimana cara mendeklarasikan variabel dalam JavaScript?",
    choice1: "variable x;",
    choice2: "var x;",
    choice3: "init x;",
    choice4: "declare x;",
    answer: 2,
},
{
    question: "Apa yang menjadi kegunaan dari fungsi parseInt() dalam JavaScript?",
    choice1: "Menyimpan data dalam variabel",
    choice2: "Memeriksa apakah suatu nilai adalah bilangan bulat",
    choice3: "Mengubah string menjadi integer",
    choice4: "Mengambil nilai desimal dari angka",
    answer: 3,
},
];

const SCORE_POINT = 20;
const MAX_QUESTIONS = 5;

startGame = () => {
questionCounter = 0;
score = 0;
availableQuestions = [...questions];
getNewQuestions();
};

getNewQuestions = () => {
if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    musik.pause();
    return window.location.assign("end.html");
}

questionCounter++;
progressText.innerText = `Pertanyaan ${questionCounter} Dari ${MAX_QUESTIONS}`;
progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
currentQuestion = availableQuestions[questionsIndex];
question.innerText = currentQuestion.question;

choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
});

availableQuestions.splice(questionsIndex, 1);

acceptingAnswers = true;
};

choices.forEach((choice) => {
choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToAplly =
    selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToAplly === "correct") {
    incrementScore(SCORE_POINT);
    }

    selectedChoice.parentElement.classList.add(classToAplly);

    setTimeout(() => {
    selectedChoice.parentElement.classList.remove(classToAplly);
    getNewQuestions();
    }, 1000);
});
});

incrementScore = (num) => {
score += num;
ScoreText.innerText = score;
};

startGame();
var musik = new Audio();
musik.src = "";
musik.loop = true;
musik.volume = 0.3;
musik.play();

function mulaiAudio() {
var mute = document.getElementById("mute");
mute.addEventListener("click", fmute);

function fmute() {
    if (musik.muted) {
    musik.muted = false;
    mute.style.background = "";
    } else {
    musik.muted = true;
    mute.style.background = "";
    }
}
}
window.addEventListener("load", mulaiAudio);
