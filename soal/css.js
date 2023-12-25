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
    question: "Apa singkatan dari CSS?",
    choice1: "Colorful Style Sheets",
    choice2: "Computer Style Sheets",
    choice3: "Cascading Style Sheets",
    choice4: "Creative Style Sheets",
    answer: 3,
},

{
    question: "Di mana biasanya CSS dapat ditempatkan dalam dokumen HTML?",
    choice1: "Di bagian atas atau bawah halaman",
    choice2: "Di bagian tengah atau bawah",
    choice3: "Hanya di bagian tengah halaman",
    choice4: "Hanya di bagian atas halaman",
    answer: 1,
},
{
    question: "Bagaimana cara menambahkan CSS ke dalam dokumen HTML?",
    choice1: "Dengan menggunakan tag <script>",
    choice2: "Dengan menggunakan tag <link>",
    choice3: "Dengan menggunakan tag <css>",
    choice4: "Dengan menggunakan tag <style>",
    answer: 2,
},
{
    question: "Apa yang dimaksud dengan selector dalam CSS?",
    choice1: "Bagian yang mengatur warna elemen",
    choice2: "Bagian yang menentukan elemen yang akan diberi gaya",
    choice3: "Bagian yang mengatur tata letak elemen",
    choice4: "Sebuah elemen dalam HTML",
    answer: 2,
},
{
    question: "Apa fungsi dari property font-size dalam CSS?",
    choice1: "Mengatur lebar teks",
    choice2: "Mengatur tinggi teks",
    choice3: "Mengatur ukuran teks",
    choice4: "HMengatur warna teksindu",
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
