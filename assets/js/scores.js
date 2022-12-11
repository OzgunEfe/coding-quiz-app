var inputText = document.querySelector("#initials");
var scores = document.querySelector("#highscores");
var clearButton = document.querySelector("#clear");

// This function clears all local storage information.
function clearLocalStorage() {
  localStorage.removeItem("highScores");
  scores.innerHTML = "";
}

// This function shows the user input value and user score in the HighScores screen and it sorts from biggest to smallest according to score.
function displayScoreList() {
  var scoreList = JSON.parse(localStorage.getItem("highScores")) || [];

  scoreList.sort(function (a, b) {
    return a.split("-")[1] - b.split("-")[1];
  });

  scoreList.forEach(function (scoreList) {
    console.log(scoreList, "scoreList");
    scores.insertAdjacentHTML(
      "afterbegin",
      `<li><span>${scoreList}</span></li>`
    );
  });
}

displayScoreList();

clearButton.addEventListener("click", clearLocalStorage);
