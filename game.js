// Define variables
var circle = document.getElementById("circle");
var score = document.getElementById("score");
var timer = document.getElementById("timer");
var playAgain = document.getElementById("play-again");
var points = 0;
var timeLeft = 30;

// Function to start game
function startGame() {
  // Reset score and timer
  points = 0;
  timeLeft = 30;
  
  // Hide play again button
  playAgain.style.display = "none"

  score.innerHTML = "Score: " + points;
timer.innerHTML = "Time Left: " + timeLeft;

var countdown = setInterval(function() {
    timeLeft--;
    timer.innerHTML = "Time Left: " + timeLeft;

    // End game if timer reaches 0
if (timeLeft == 0) {
    clearInterval(countdown);
    endGame();
  }

}, 1000);

// Add event listener to circle
circle.addEventListener("click", function() {
// Increase score and update display
points++;
score.innerHTML = "Score: " + points;



  // Move circle to new random position
var maxX = window.innerWidth - circle.offsetWidth;
var maxY = window.innerHeight - circle.offsetHeight;
var newX = Math.floor(Math.random() * maxX);
var newY = Math.floor(Math.random() * maxY);
circle.style.left = newX + "px";
circle.style.top = newY + "px";

});
}

// Function to end game
function endGame() {
// Show play again button
playAgain.style.display = "block";

// Remove event listener from circle
circle.removeEventListener("click");
}

// Add event listener to play again button
playAgain.addEventListener("click", function() {
startGame();
});

// Start game on page load
startGame();
