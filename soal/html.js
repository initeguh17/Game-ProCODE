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
    question: "Apa singkatan dari HTML?",
    choice1: "High-level Transfer Markup Language",
    choice2: "High-level Text Markup Language",
    choice3: "Hyper Text Markup Language",
    choice4: "Hyper Transfer Markup Language",
    answer: 3,
  },
  {
    question: "Tag HTML yang digunakan untuk membuat paragraf adalah?",
    choice1: "<p>",
    choice2: "<pg>",
    choice3: "<para>",
    choice4: "<paragraf>",
    answer: 1,
  },
  {
    question: "Apa yang dilakukan tag <br> dalam HTML?",
    choice1: "Membuat paragraf baru",
    choice2: "Membuat baris baru",
    choice3: "Membuat tabel",
    choice4: "Membuat garis horizontal",
    answer: 2,
  },
  {
    question: "Apa yang dilakukan oleh tag <img> dalam HTML?",
    choice1: "Membuat teks tebal",
    choice2: "Menyisipkan gambar",
    choice3: "Membuat hyperlink",
    choice4: "Menampilkan video",
    answer: 2,
  },
  {
    question: "Apa yang dilakukan oleh tag <img> dalam HTML?",
    choice1: "Menyisipkan gif",
    choice2: "Membuat teks tebal",
    choice3: "Menyisipkan gambar",
    choice4: "Menampilkan video",
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
