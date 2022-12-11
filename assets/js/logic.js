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
var inputText = document.querySelector("#inputText");

var countDown;
var currentQuestionIndex = 0;
var timerScore = 60;

// This function hides all questions and feedback and shows the user result (name input) screen.
function showResult() {
  timer.classList.add("hide");
  feedback.classList.add("hide");
  questionWrap.classList.add("hide");
  endScreen.classList.remove("hide");
  finalScore.innerText = timerScore;
}

// This function hides questions screens and feedback.
function clearQuestionAndFeedback() {
  questionTitle.innerHTML = "";
  choicesQutput.innerHTML = "";
  feedback.innerHTML = "";
  feedback.classList.add("hide");
}

// This function plays the correct answer sound effect.
function correctSoundEffect() {
  var audio = new Audio();
  audio.src = "assets/sfx/correct.wav";
  audio.play();
}

// This function plays the wrong answer sound effect.
function wrongSoundEffect() {
  var audio = new Audio();
  audio.src = "assets/sfx/incorrect.wav";
  audio.play();
}

// This function checks the current question index and if there are any more questions it shows them. If there is no more question it shows user results.
function nextQuestion() {
  if (currentQuestionIndex > 4) {
    // if there is no next question
    clearInterval(countDown);
    showResult();
  } else {
    setTimeout(() => {
      clearQuestionAndFeedback();
      currentQuestionIndex++;
      if (timerScore == 0 || timerScore < 0) {
        timerScore = 0
        showResult();
      } else {
        renderQuestion();
      }
    }, 350);
  }
}

// This function checks the answers. If the answer is correct, it plays the correct sound effect and continues to the next question. If the answer is wrong, it plays the wrong sound effect, subtracts 20 from the timerScore, and continues to the next question.
function checkAnswer(event) {
  var currentQuestion = questions[currentQuestionIndex];
  var selectedAnswer = event.target.value;

  if (selectedAnswer === currentQuestion.answer) {
    feedback.classList.remove("hide");
    feedback.innerText = "Correct!";
    correctSoundEffect();
    nextQuestion();
  } else {
    feedback.classList.remove("hide");
    feedback.innerText = "Worng!";
    wrongSoundEffect();
    timerScore = timerScore - 20;
    nextQuestion();
  }
}

// This function starts the Timer and decreases the time by one every second. If the Timer value is less than zero or there are no more questions to be displayed, it will be hidden and the result screen will be displayed.
function startTimer() {
  countDown = setInterval(() => {
    timerScore--;
    if (currentQuestionIndex > 5) {
      clearInterval(countDown);
      timer.classList.add("hide");
    } else if (timerScore < 0) {
      clearInterval(countDown);
      timer.classList.add("hide");
      timerScore = 0;
      time.innerHTML = 0;
      showResult();
    }
    time.innerText = timerScore;
  }, 1000);
}

// When the user clicked the start Quiz button this function hides the startScreen and it takes the questions and questions titles from the questions.js file, creates a button for each question option and shows them on the screen. 
function renderQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  var choices = currentQuestion.choices;

  startScreen.classList.add("hide");

  questionTitle.innerText = currentQuestion.title;

  for (var i = 0; i < choices.length; i++) {
    var choice = choices[i];

    choicesQutput.insertAdjacentHTML(
      "beforeend",
      `<button value=${choice} onclick="checkAnswer(event)">${choice}</button>`
    );
  }
  questionWrap.classList.remove("hide");
}

// This function starts the timer and activates to renderQuestion function.
function startQuiz() {
  startTimer();
  renderQuestion();
}

// This function pushes the values (user input value and user score) to the local storage.
function saveScoreList(arr) {
  localStorage.setItem("highScores", JSON.stringify(arr));
}

// This function gets the values (user input value and user score) from the local storage.
function getScoreList() {
  return JSON.parse(localStorage.getItem("highScores")) || [];
}

// When the user clicks the submit button, this function gets the input value and timerScore and it pushes these values to a new variable (highScore). After this, it pushes this new variable to scoreList and sent to the local storage.
function initials() {
  var scoreList = getScoreList();

  var userName = inputText.value;

  // If the user doesn't enter anything this condition shows a text as a placeholder inside the input area and it turns the border colour to red.
  if (!userName) {
    inputText.placeholder = "Please enter user name";
    inputText.style.borderColor = "red";
    return;
  }

  var highScore = `${userName} - ${timerScore}`;

  scoreList.push(highScore);
  saveScoreList(scoreList);

  window.location.href = "highscores.html";
}

startQuizfunc.addEventListener("click", startQuiz);
