var questionWrap = document.querySelector("#questions");
var questionTitle = document.querySelector("#question-title");
var choicesQutput = document.querySelector("#choices");
var startQuizfunc = document.querySelector("#start");
var startScreen = document.querySelector("#start-screen");
var feedback = document.querySelector("#feedback");
var timer = document.querySelector("#time");
var timerStart = document.querySelector("#start-button");


var currentQuestionIndex = 0;

function startQuiz() {
  var currentQuestion = questions[currentQuestionIndex];
  var choices = currentQuestion.choices;

  startScreen.classList.add("hide");
  console.log(currentQuestionIndex);
  questionTitle.innerText = currentQuestion.title;

  for (var i = 0; i < choices.length; i++) {
    var choice = choices[i];
    var isCorrect = currentQuestion.answer === choice;
    console.log(choice);

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
  audio.src = "assets/sfx/correct.wav"
  audio.play();
}

function worngSoundEffect() {
  var audio = new Audio();
  audio.src = "assets/sfx/incorrect.wav"
  audio.play();
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
      currentQuestionIndex = currentQuestionIndex + 1;
      startQuiz();
    }, 900);
  } else {
    feedback.classList.remove("hide");
    feedback.innerText = "Worng!";
    worngSoundEffect();
    setTimeout(() => {
      clearAll();
      currentQuestionIndex = currentQuestionIndex + 1;
      startQuiz();
    }, 900)
  }

  console.log(selectedAnswer);
}

function clearAll() {
  questionTitle.innerHTML = "";
  choicesQutput.innerHTML = "";
  feedback.innerHTML = "";
  feedback.classList.add("hide");
}

startQuizfunc.addEventListener("click", startQuiz);
choicesQutput.addEventListener("click", checkAnswer);
