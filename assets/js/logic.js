var questionWrap = document.querySelector("#questions");
var questionTitle = document.querySelector("#question-title");
var choicesQutput = document.querySelector("#choices");
var startQuizfunc = document.querySelector("#start");
var startScreen = document.querySelector("#start-screen");
var feedback = document.querySelector("#feedback");
var time = document.querySelector("#time");
var timer = document.querySelector(".timer");
var endScreen = document.querySelector("#end-screen");
var finalScore = document.querySelector("#final-score");
var initialsInput = document.querySelector("#initials");
var submitButton = document.querySelector("#submit");
var form = document.querySelector("form");

var currentQuestionIndex = 0;
var timerScore = 60;

function startTimer() {
  var countDown = setInterval(() => {
    time.innerText = timerScore;
    timerScore--;
    if (currentQuestionIndex > 5) {
      clearInterval(countDown);
      timer.classList.add("hide");
    }
    if (timerScore < 0) {
      clearInterval(countDown);
      timer.classList.add("hide");
      timerScore = 0;
      time.innerHTML = 0;
      showResult();
    }
  }, 1000);
}

function startQuiz() {
  var currentQuestion = questions[currentQuestionIndex];
  var choices = currentQuestion.choices;

  startScreen.classList.add("hide");

  questionTitle.innerText = currentQuestion.title;

  for (var i = 0; i < choices.length; i++) {
    var choice = choices[i];

    choicesQutput.insertAdjacentHTML(
      "beforeend",
      `
    <button value=${choice} onclick="checkAnswer">${choice}</button>
    `
    );
  }
  questionWrap.classList.remove("hide");
}

function checkAnswer(event) {
  var currentQuestion = questions[currentQuestionIndex];
  var selectedAnswer = event.target.value;

  if (selectedAnswer === currentQuestion.answer) {
    feedback.classList.remove("hide");
    feedback.innerText = "Correct!";
    correctSoundEffect();
    setTimeout(() => {
      clearAll();
      currentQuestionIndex++;
      if (timerScore == 0) {
        clearAll();
        showResult();
      } else {
        startQuiz();
      }
    }, 1000);
    if (currentQuestionIndex > 4) {
      clearAll();
      showResult();
    }
  } else {
    feedback.classList.remove("hide");
    feedback.innerText = "Worng!";
    worngSoundEffect();
    timerScore = timerScore - 20;
    setTimeout(() => {
      clearAll();
      currentQuestionIndex++;
      if (timerScore == 0) {
        clearAll();
        showResult();
      } else {
        startQuiz();
      }
    }, 1000);
    if (currentQuestionIndex > 4) {
      clearAll();
      showResult();
    }
  }
}

function showResult() {
  questionWrap.classList.add("hide");
  endScreen.classList.remove("hide");
  finalScore.innerText = timerScore;
}

function clearAll() {
  questionTitle.innerHTML = "";
  choicesQutput.innerHTML = "";
  feedback.innerHTML = "";
  feedback.classList.add("hide");
}

function correctSoundEffect() {
  var audio = new Audio();
  audio.src = "assets/sfx/correct.wav";
  audio.play();
}

function worngSoundEffect() {
  var audio = new Audio();
  audio.src = "assets/sfx/incorrect.wav";
  audio.play();
}


function initials() {

  var scoreList = []

  var inputText = document.getElementById("initials").value;

  if (timerScore === 0) {
    userScore = 0;
  } else {
    userScore = timerScore + 2;
  }

  var initial = {
    user: inputText,
    score: userScore,
  }

  scoreList.push(initial);

  var scoreListJSON = JSON.stringify(scoreList);

  localStorage.setItem("initials", scoreListJSON);

  window.location.href = "highscores.html";
}

startQuizfunc.addEventListener("click", startQuiz);
startQuizfunc.addEventListener("click", startTimer);
choicesQutput.addEventListener("click", checkAnswer);
submitButton.addEventListener("click", initials);