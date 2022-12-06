var scores = document.querySelector('#highscores');
var clearButton = document.querySelector('#clear');

var initialList = JSON.parse(localStorage.getItem('initials'));

var textKey = initialList.score;
var textValue = initialList.initial;

scores.innerHTML = `
    <li>${textValue} - ${textKey}</li>
`;


function clearLocalStorage(){
    localStorage.removeItem("initials");
    scores.innerHTML = '';
}

clearButton.addEventListener("click", clearLocalStorage);