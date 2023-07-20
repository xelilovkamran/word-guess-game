import data from "../json/word-db.json" assert { type: "json" };

const resultArea = document.querySelector(".word");
const chanceArea = document.querySelector(".guess > span");
const wrongsArea = document.querySelector(".wrong > span");
const hintArea = document.querySelector(".hint > span");
const resetBtn = document.querySelector(".reset");
const hintBtn = document.querySelector(".showhint");

const guessedIndexes = [];
const wrongLetters = [];
let wrongChance = 5;
let hint;
let word;

function init() {
  window.alert("New game started! Guess New Word :)");
  let index = Math.floor(data.length * Math.random());
  word = data[index].word.split("");
  hint = data[index].hint;
  for (let i = 0; i < word.length; i++) {
    const div = document.createElement("div");
    div.classList.add("letter");
    resultArea.appendChild(div);
  }
  chanceArea.innerHTML = wrongChance;
}

function update() {
  chanceArea.innerHTML = wrongChance;
  wrongsArea.innerHTML = wrongLetters.join(",");
}

function addLetter(index, letter) {
  const letterEls = document.querySelectorAll(".letter");
  letterEls[index].innerHTML = letter;
}

function resetGame() {
  resultArea.innerHTML = "";
  wrongChance = 5;
  wrongLetters.length = 0;
  guessedIndexes.length = 0;
  wrongsArea.innerHTML = wrongLetters.join(",");
  hintArea.innerHTML = "";
  init();
}

function showHint() {
  hintArea.innerHTML = hint;
}

function showCorrectResult() {
  const letterEls = document.querySelectorAll(".letter");
  for (let i = 0; i < word.length; i++) {
    letterEls[i].innerHTML = word[i];
  }
}

function gameOver() {
  showCorrectResult();
  window.alert("You Lost The Game"); //! THIS LINE CAN BE AFTER LINE 100, IT IS OPTIONAL
  setTimeout(() => {
    resetGame();
  }, 500);
}

function gameWin() {
  window.alert("You Won The Game");
  resetGame();
}

document.addEventListener("DOMContentLoaded", () => {
  init();
});

document.addEventListener("keypress", (e) => {
  const pressedLetter = e.key;
  let flag = 0;
  for (let i = 0; i < word.length; i++) {
    if (pressedLetter === word[i]) {
      if (!guessedIndexes.includes(i)) {
        addLetter(i, pressedLetter);
        guessedIndexes.push(i);
        flag = 1;
        break;
      }
    }
  }

  if (!flag) {
    wrongLetters.push(pressedLetter);
    wrongChance--;
    if (wrongChance === 0) {
      gameOver();
    } else {
      update();
    }
  }

  if (guessedIndexes.length === word.length && wrongChance > 0) {
    gameWin();
  }
});

resetBtn.addEventListener("click", () => {
  resetGame();
});

hintBtn.addEventListener("click", () => {
  showHint();
});
