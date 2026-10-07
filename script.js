// Select elements for lights and UI
const level1Lights = document.querySelectorAll("#level-1 .light");
const level2Lights = document.querySelectorAll("#level-2 .light");

const instructions = document.getElementById("instructions");
const results = document.getElementById("results");
const playerNameInput = document.getElementById("playerName");
const leaderboard = document.getElementById("leaderboard");
const startButton = document.getElementById("startButton");

let reactionTimes = [];
let roundCount = 0;
const totalRounds = 2;

let clickStartTime = null;
let gameStarted = false;

let players = []; // Array to store player data

// Audio elements for red and green lights
const redLightSound = new Audio('F1sound.mp3');
const greenLightSound = new Audio('Mario Kart Race Start - Sound Effect (HD).mp3'); 

// Function to reset lights to black
function resetLights() {
  [...level1Lights, ...level2Lights].forEach((light) => {
    light.classList.remove("red", "green", "yellow", "blinking");
  });
}

// Function to handle the pattern of lights before starting the game and after finishing
function setLightsBeforeGame() {
  resetLights();

  // Turn all Level 2 lights red
  level2Lights.forEach((light) => light.classList.add("red"));

  // Set Level 1 pattern: 1st, 3rd, and 5th lights green, 2nd and 4th yellow blinking
  level1Lights.forEach((light, index) => {
    if (index % 2 === 0) {
      light.classList.add("green");
    } else {
      light.classList.add("yellow", "blinking");
    }
  });
}

let penaltyTime = 0; // To track penalty for the current turn

// Function to handle click events
function handleClick(event) {
  // Ignore clicks on the start button
  if (event.target.id === "startButton") return;

  if (!gameStarted) return;

  // If lights are red and not green, add penalty and notify
  if (lightsAreRed && !lightsAreGreen) {
    penaltyTime += 100;
    instructions.innerHTML = "You clicked too early! <strong>100ms penalty added for each early click!</strong><br>Wait for the green signal to click.";
    return; // Continue the game without terminating
  }

  // If game is started, handle reaction time
  if (clickStartTime) {
    const reactionTime = performance.now() - clickStartTime + penaltyTime;
    reactionTimes.push(reactionTime);
    results.innerHTML = `<p>Reaction time: ${reactionTime.toFixed(2)} milliseconds</p>`;
    roundCount++;

    // Reset penalty after each turn
    penaltyTime = 0;

    if (roundCount >= totalRounds) {
      const averageTime =
        reactionTimes.reduce((acc, time) => acc + time, 0) / reactionTimes.length;
      results.innerHTML += `<p>Average reaction time: ${averageTime.toFixed(2)} milliseconds</p>`;
      savePlayer(playerNameInput.value.trim(), averageTime);
      updateLeaderboard();
      instructions.textContent = "Game over! Enter your name to play again.";
      roundCount = 0;
      reactionTimes = [];
      setLightsBeforeGame(); // Set the light pattern after the game ends
    } else {
      instructions.textContent = "Click start if you are ready!";
    }

    gameStarted = false;
    clickStartTime = null;
    resetLights();
    setLightsBeforeGame();
  }
}


// Start game function
function startGame() {
  if (gameStarted || !playerNameInput.value.trim()) {
    instructions.textContent = "Please enter your name!";
    return;
  }

  gameStarted = true;
  lightsAreGreen = false; // Reset green light status
  results.innerHTML = "";
  resetLights();
  instructions.textContent = "Wait for green signal...";

  // Sequentially turn lights red for both levels
  level1Lights.forEach((light, index) => {
    setTimeout(() => {
      light.classList.add("red");
      level2Lights[index].classList.add("red"); // Turn lights red simultaneously
    }, index * 1000); // 1-second interval
    lightsAreRed = true;
    lightsAreGreen = false;
  });

  // Play red light sound during the delay
  redLightSound.loop = true;
  redLightSound.play();

  // After all lights are red, randomly turn all lights green
  const delay = level1Lights.length * 1000 + Math.random() * 2800 + 200;
  setTimeout(() => {
    resetLights();
    [...level1Lights, ...level2Lights].forEach((light) => light.classList.add("green"));
    instructions.textContent = "Click anywhere to stop or start a new turn!";
    lightsAreRed = false;
    lightsAreGreen = true; // Lights are now green
    clickStartTime = performance.now();

    // Stop red light sound and play green light sound
    redLightSound.pause();
    redLightSound.currentTime = 0;
    greenLightSound.play(); // Play green light sound
  }, delay);
}


// Function to save player data
function savePlayer(name, avgTime) {
  const playerId = `${name}-${Date.now()}`; // Unique ID
  players.push({ id: playerId, name, avgTime });
  players.sort((a, b) => a.avgTime - b.avgTime); // Sort by reaction time
  saveLeaderboardToStorage(); // Save updated leaderboard to localStorage
}

// Function to save leaderboard to localStorage
function saveLeaderboardToStorage() {
  localStorage.setItem("leaderboard", JSON.stringify(players));
}

// Function to load leaderboard from localStorage
function loadLeaderboardFromStorage() {
  const storedLeaderboard = localStorage.getItem("leaderboard");
  if (storedLeaderboard) {
    players = JSON.parse(storedLeaderboard);
    updateLeaderboard();
  }
}

// Function to update leaderboard
function updateLeaderboard() {
  leaderboard.innerHTML = ""; // Clear existing leaderboard
  players.forEach((player, index) => {
    const li = document.createElement("li");
    li.textContent = `${player.name}: ${player.avgTime.toFixed(2)} ms`;
    li.setAttribute("data-rank", index + 1); // Add rank as a custom attribute
    if (index === 0) li.classList.add("gold");
    else if (index === 1) li.classList.add("silver");
    else if (index === 2) li.classList.add("bronze");
    leaderboard.appendChild(li);
  });
}

// Function to clear the leaderboard
function clearLeaderboard() {
  localStorage.removeItem("leaderboard");
  players = [];
  updateLeaderboard();
}

// Add event listener for the clear leaderboard button
document.getElementById("clearLeaderboardButton").addEventListener("click", () => {
  if (confirm("Are you sure you want to clear the leaderboard?")) {
    clearLeaderboard();
  }
});

// Load leaderboard from localStorage when the page loads
document.addEventListener("DOMContentLoaded", () => {
  loadLeaderboardFromStorage();
});

// Add event listener for "Enter" button click
startButton.addEventListener("click", () => {
  gameStarted = false; // Ensure the game is not started until "Enter" is clicked
  startGame();
});

// Add event listener for "Enter" key on input
playerNameInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    gameStarted = false; // Ensure the game is not started until "Enter" is clicked
    startGame();
  }
});

// Add click event listener to the body
document.body.addEventListener("click", handleClick);

// Disable right click
document.addEventListener("contextmenu", (event) => event.preventDefault());

// Initial call to set lights before game starts
setLightsBeforeGame();
