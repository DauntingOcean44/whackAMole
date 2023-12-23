"use strict";
let activeMoleTile;
let activeMoleTileNum;
let activePiranhaPlantTile;
let activePiranhaPlantTileNum;
let score = 0;
let highScore = 0;
let gameOver = false;
let gameOperatingBoolean = 0;
let startButton = document.getElementById("startButton");

startButton.addEventListener("click", setGame);
startButton.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

function setGame() {
  //set up the grid for the game board in html
  score = 0;
  document.getElementById("score").textContent = `⭐Score: ${score}`;
  gameOver = false;
  if (!gameOperatingBoolean) {
    for (let i = 0; i < 9; i++) /*I goes from 0-8*/ {
      let tile = document.createElement("div");
      tile.id = String(i);
      tile.addEventListener("click", selectTile);
      document.getElementById("board").appendChild(tile);
    }

    setInterval(calculateActivePiranhaPlantTile, 1000); //Every 4 seconds
    setInterval(calculateActiveMoleTile, 2000); //Every 2 Seconds
    gameOperatingBoolean = 1;
  }
}

function getRandomTile() {
  let tileNumber = Math.floor(Math.random() * 9);
  return String(tileNumber);
}

function randomNumberGenerator17() {
  let tileNumber = Math.floor(Math.random() * 7) + 1;
  return tileNumber;
}

function loopNumberOverEight(num, increment) {
  return (num + increment) % 9;
}

function calculateActiveMoleTile() {
  if (gameOver) {
    return;
  }
  if (activeMoleTile) {
    activeMoleTile.innerHTML = "";
  }

  let mole = document.createElement("img");
  mole.src = "/monty-mole.png";

  let tileNumber = getRandomTile();
  if (activePiranhaPlantTileNum == tileNumber) {
    return;
  }
  activeMoleTileNum = Number(tileNumber);
  activeMoleTile = document.getElementById(tileNumber);
  activeMoleTile.appendChild(mole);
}

function calculateActivePiranhaPlantTile() {
  if (gameOver) {
    return;
  }
  if (activePiranhaPlantTile) {
    activePiranhaPlantTile.innerHTML = "";
  }
  let piranhaPlant = document.createElement("img");
  piranhaPlant.src = "/piranha-plant.png";

  let tileNumber = String(
    loopNumberOverEight(activeMoleTileNum, randomNumberGenerator17())
  );
  activePiranhaPlantTileNum = Number(tileNumber);
  activePiranhaPlantTile = document.getElementById(tileNumber);
  activePiranhaPlantTile.appendChild(piranhaPlant);
}

function selectTile() {
  if (gameOver) {
    return;
  }

  if (this == activeMoleTile) {
    score += 10;
    document.getElementById("score").textContent = `⭐Score: ${score}`;
  } else if (this == activePiranhaPlantTile) {
    document.getElementById(
      "score"
    ).innerText = `❌Game Over!❌ ⭐Score: ${score}`;
    gameOver = true;
    setHighScore();
  }
}

function setHighScore() {
  if (score > highScore) {
    highScore = score;
    document.getElementById(
      "highscore"
    ).textContent = `🏆Highscore: ${highScore}`;
  }
}
