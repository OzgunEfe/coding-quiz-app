import {displayScoreList} from './logic';

var scores = document.querySelector("#highscores");
var clearButton = document.querySelector("#clear");


scores.innerHTML = displayScoreList();

function clearLocalStorage() {
  localStorage.removeItem("initials");
  scores.innerHTML = "";
}

clearButton.addEventListener("click", clearLocalStorage);