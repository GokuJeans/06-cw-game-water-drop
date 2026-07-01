// Variables to control game state
let gameRunning = false; // Keeps track of whether game is active or not
let dropMaker; // Will store our timer that creates drops regularly

let score = 0;
const scoreDisplay = document.getElementById("score");

let time = 30;
const timeDisplay = document.getElementById("time");

const endScreen = document.getElementById("end-screen");
const gameMessage = document.getElementById("game-message");

const winMessages = [
  "Congratulations! You won the game!",
  "Good job on winning!",
  "Your genius never fails to amaze!"
]

const loseMessages = [
  "Better luck next time.",
  "Almost got it.",
  "Try again!"
]

// Wait for button click to start the game
document.getElementById("start-btn").addEventListener("click", startGame);

function startGame() {
  // Prevent multiple games from running at once
  if (gameRunning) return;

  endScreen.classList.add("hidden");

  gameRunning = true;

  // Resets score and timer
  score = 0;
  scoreDisplay.textContent = score;

  time = 30;
  timeDisplay.textContent = time;

  startCountdown();

  // Create new drops every second (1000 milliseconds)
  dropMaker = setInterval(createDrop, 1000);
}

function createDrop() {
  // Create a new div element that will be our water drop
  const drop = document.createElement("div");
  drop.className = "water-drop";

  // Update score when clicked
  drop.addEventListener("click", function() {
    score++;
    scoreDisplay.textContent = score;
    drop.remove();
  });

  // Make drops different sizes for visual variety
  const initialSize = 60;
  const sizeMultiplier = Math.random() * 0.8 + 0.5;
  const size = initialSize * sizeMultiplier;
  drop.style.width = drop.style.height = `${size}px`;

  // Position the drop randomly across the game width
  // Subtract 60 pixels to keep drops fully inside the container
  const gameWidth = document.getElementById("game-container").offsetWidth;
  const xPosition = Math.random() * (gameWidth - 60);
  drop.style.left = xPosition + "px";

  // Make drops fall for 4 seconds
  drop.style.animationDuration = "4s";

  // Add the new drop to the game screen
  document.getElementById("game-container").appendChild(drop);

  // Remove drops that reach the bottom (weren't clicked)
  drop.addEventListener("animationend", () => {
    drop.remove(); // Clean up drops that weren't caught
  });
}

function startCountdown() {
  const countdownInterval = setInterval(function() {
    time--;
    timeDisplay.textContent = time;

    if (time <= 0) {
      clearInterval(countdownInterval);
      timeDisplay.textContent = '0';
      
      endGame();
    }
  }, 1000);
}

function endGame() {
  clearInterval(dropMaker);
  gameRunning = false;

  if (score >= 20) {
    const random = Math.floor(Math.random() * winMessages.length);
    gameMessage.textContent = winMessages[random];
  } else {
    const random = Math.floor(Math.random() * loseMessages.length);
    gameMessage.textContent = loseMessages[random];
  }

  endScreen.classList.remove("hidden");
}