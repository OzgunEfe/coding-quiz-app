var currentQuestionIndex = 0
var questionWrap = document.querySelector('#questions');
var questionTitle = document.querySelector('#question-title');
var choicesQutput = document.querySelector('#choices');
var startQuizfunc = document.querySelector('#start');
var startScreen = document.querySelector('#start-screen');

function startQuiz() {
  startScreen.classList.add('hide');
  
  var currentQuestion = questions[currentQuestionIndex];
  var choices = currentQuestion.choices;

  questionTitle.innerText = currentQuestion.title;

  choicesQutput.innerHTML = '';

  for (var i=0; i < choices.length; i++) {
    var choice = choices[i];
    var isCorrect = currentQuestion.answer === choice;

    choicesQutput.insertAdjacentHTML('beforeend', `
    <button data-correct=${isCorrect}>${choice}</button>
    `);
  }

  questionWrap.classList.remove('hide');
}

function checkAnswer(event){
  
}

startQuizfunc.addEventListener('click', startQuiz);
choicesQutput.addEventListener('click', checkAnswer);