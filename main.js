// catch elements
let levelsArray = {
  Easy: [
    "Straw",
    "Deadpan",
    "Ring",
    "wet",
    "GrandMother",
    "Handle",
    "shed",
    "drop",
    "exclaim",
    "select",
    "appliance",
    "substance",
  ],
  Normal: ["straw", "deadpan", "ring", "wet", "grandmother"],
  Hard: [
    "deadpan",
    "grandmother",
    "intelligent",
    "congratulation",
    "Incomprehensibility",
    "consanguineous",
    "appreciate",
    "synchronized-Swimming",
    "olympic-Flame",
    "opening-ceremony",
  ],
};
let msgLevel = document.querySelector(".lvl");
let msgSeconds = document.querySelector(".seconds");
let btn = document.querySelector("button");
let theWord = document.querySelector(".the-word");
let input = document.querySelector(".input");
let upComingWords = document.querySelector(".upcoming-words");
let countDownTime = document.querySelector(".count-down");
let gotScore = document.querySelector(".got");
let totalScore = document.querySelector(".total");
let result = document.querySelector(".finish");
let difficulty = document.querySelector(".difficulty");
let lvlDifficultyRule = document.querySelector(".lvl-difficulty");
let timeDifficultyRule = document.querySelector(".time-difficulty");
let defaultLevel = "Easy";
// Set level Name And Seconds And Score
const lvls = {
  Easy: 6,
  Normal: 4,
  Hard: 8,
};
// set defualt values
msgLevel.innerHTML = defaultLevel;
msgSeconds.innerHTML = lvls[defaultLevel];
lvlDifficultyRule.innerHTML = defaultLevel;
timeDifficultyRule.innerHTML = lvls[defaultLevel];
totalScore.innerHTML = levelsArray[difficulty.value].length;
countDownTime.innerHTML = lvls[defaultLevel];
// change the level
difficulty.addEventListener("change", () => {
  msgLevel.innerHTML = difficulty.value;
  msgSeconds.innerHTML = lvls[difficulty.value];
  lvlDifficultyRule.innerHTML = difficulty.value;
  if (lvlDifficultyRule.innerHTML == "Hard") {
    lvlDifficultyRule.style.color = "red";
  } else if (lvlDifficultyRule.innerHTML == "Normal") {
    lvlDifficultyRule.style.color = "#FF9800";
  }
  timeDifficultyRule.innerHTML = lvls[difficulty.value];
  countDownTime.innerHTML = lvls[difficulty.value];
  totalScore.innerHTML = levelsArray[difficulty.value].length;
  // difficulty.setAttribute("disabled", "");
});

// stop Paste Event
input.onpaste = () => false;

// Start Game
btn.addEventListener("click", (e) => {
  btn.remove();
  input.focus();
  //Generate Random Word
  generateRandomWord();
});

// Generate Word Function
function generateRandomWord() {
  let randomWord =
    levelsArray[difficulty.value][
      Math.floor(Math.random() * levelsArray[difficulty.value].length)
    ];
  let randomWordIndex = levelsArray[difficulty.value].indexOf(randomWord);
  levelsArray[difficulty.value].splice(randomWordIndex, 1);
  //Show Random Word
  theWord.innerHTML = randomWord;
  // empty upcoming word
  upComingWords.innerHTML = "";
  //Generate Words Function
  generateWords();
  // call start function
  levelTimeCountDown();
}

//Generate Words Function
function generateWords() {
  for (let i = 0; i < levelsArray[difficulty.value].length; i++) {
    //Create Div
    let div = document.createElement("div");
    div.classList.add("word");
    let divText = document.createTextNode(levelsArray[difficulty.value][i]);
    div.appendChild(divText);
    upComingWords.appendChild(div);
  }
}

// Set time for the level
function levelTimeCountDown() {
  countDownTime.innerHTML = lvls[difficulty.value];
  let countDown = setInterval(() => {
    countDownTime.innerHTML--;
    if (countDownTime.innerHTML == "0") {
      clearInterval(countDown);
      // check the Solve
      if (difficulty.value == "Hard") {
        if (
          input.value ===
          theWord.innerHTML[0].toUpperCase() + theWord.innerHTML.slice(1)
        ) {
          //Empty input
          input.value = "";
          //Increase Score
          gotScore.innerHTML++;
          if (levelsArray[difficulty.value].length > 0) {
            generateRandomWord();
          } else {
            createGratz();
          }
        } else {
          gameOver();
        }
      } else {
        if (input.value.toLowerCase() === theWord.innerHTML.toLowerCase()) {
          //Empty input
          input.value = "";
          //Increase Score
          gotScore.innerHTML++;
          if (levelsArray[difficulty.value].length > 0) {
            generateRandomWord();
          } else {
            createGratz();
          }
        } else {
          gameOver();
        }
      }
    }
  }, 1000);
}

// Create Game Over Span
function gameOver() {
  // game Over
  let span = document.createElement("span");
  span.classList.add("gameover");
  let gameOverText = document.createTextNode(
    "بقولك ايه يلا انت شكلك حمار اقفل"
  );
  span.appendChild(gameOverText);
  result.appendChild(span);
  // Create Replay Button
  replayBtn();
  document.querySelector(".video").style.display = "block";
  document
    .querySelector(".video")
    .requestFullscreen()
    .then(() => {
      document.querySelector(".video").play();
    })
    .catch((err) => {
      alert(
        `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`
      );
    });
}
// Create Gratz Span
function createGratz() {
  // game Over
  let span = document.createElement("span");
  span.classList.add("gratz");
  let winText = document.createTextNode("معلم وربنا");
  span.appendChild(winText);
  result.appendChild(span);
  // Create Replay Button
  replayBtn();
}

//Create Replay button
function replayBtn() {
  let button = document.createElement("span");
  button.classList.add("replay");
  button.innerHTML = "play again";
  result.appendChild(button);
  button.addEventListener("click", (e) => {
    location.reload();
  });
}
