var scores = document.querySelector('#highscores');
var clearButton = document.querySelector('#clear');

var scoreListJSON = JSON.parse(localStorage.getItem('initials'));

listLength = scoreListJSON.length

for (i=0; i < listLength; i++) {
    var textKey = scoreListJSON[i].score
    var textValue = scoreListJSON[i].user;

    scores.innerHTML = `
    <li>${textValue} - ${textKey}</li>
`;
}


function clearLocalStorage(){
    localStorage.removeItem("initials");
    scores.innerHTML = '';
}

clearButton.addEventListener("click", clearLocalStorage);