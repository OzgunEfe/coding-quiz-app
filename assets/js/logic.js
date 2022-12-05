var questionWrap = document.querySelector("#questions");
var questionTitle = document.querySelector("#question-title");
var choicesQutput = document.querySelector("#choices");
var startQuizfunc = document.querySelector("#start");
var startScreen = document.querySelector("#start-screen");
var feedback = document.querySelector("#feedback");
var time = document.querySelector("#time");
var endScreen = document.querySelector("#end-screen");
var finalScore = document.querySelector("#final-score");

var currentQuestionIndex = 0;
var timerScore = 60;

function startTimer() {
  var countDown = setInterval(() => {
    time.innerHTML = timerScore;
    timerScore--;
    if (timerScore < 0 || currentQuestionIndex > 5) {
      clearInterval(countDown);
      timerScore = 0;
      time.innerHTML = 0;
      showResult()
    }
  }, 1000);
}

function startQuiz() {
  var currentQuestion = questions[currentQuestionIndex];
  var choices = currentQuestion.choices;

  startScreen.classList.add("hide");
  console.log(currentQuestionIndex);
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

function checkAnswer(event) {
  var currentQuestion = questions[currentQuestionIndex];
  var selectedAnswer = event.target.value;

  if (selectedAnswer == currentQuestion.answer) {
    feedback.classList.remove("hide");
    feedback.innerText = "Correct!";
    correctSoundEffect();
    setTimeout(() => {
      clearAll();
      currentQuestionIndex++;
      if (timerScore == 0) {
        clearAll();
        showResult()
      } else {
        startQuiz();
      }
    }, 900);
    if (currentQuestionIndex > 4) {
      clearAll();
      endScreen.classList.remove("hide");
      finalScore.innerText = timerScore;
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
        showResult()
      } else {
        startQuiz();
      }
    }, 900);
    if (currentQuestionIndex > 4) {
      clearAll();
      endScreen.classList.remove("hide");
      finalScore.innerText = timerScore + 1;
    }
  }
}

function clearAll() {
  questionTitle.innerHTML = "";
  choicesQutput.innerHTML = "";
  feedback.innerHTML = "";
  feedback.classList.add("hide");
}

function showResult() {
  questionWrap.classList.add("hide");
  endScreen.classList.remove("hide");
  finalScore.innerText = timerScore;
}

startQuizfunc.addEventListener("click", startQuiz);
startQuizfunc.addEventListener("click", startTimer);
choicesQutput.addEventListener("click", checkAnswer);
