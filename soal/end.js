const finalScore = document.querySelector("#finalscore");
const mostRecentScore = localStorage.getItem("mostRecentScore");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;

const score = {
score: mostRecentScore,
};

highScores.splice(5);

