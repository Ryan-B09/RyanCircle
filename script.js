// Load data from JSON file
let attempts = 0;
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    attempts = data.attempts;
    document.getElementById('attempts').innerHTML = `Attempts: ${attempts}`;
  });

// Generate a random number between 1 and 100
const number = Math.floor(Math.random() * 100) + 1;

// Handle submit button click
document.getElementById('submit').addEventListener('click', () => {
  const guess = document.getElementById('guess').value;
  if (guess < 1 || guess > 100) {
    document.getElementById('result').innerHTML = 'Please enter a number between 1 and 100.';
    return;
  }
  attempts++;
  if (guess == number) {
    document.getElementById('result').innerHTML = `Congratulations! You guessed the number in ${attempts} attempts.`;
    // Save data to JSON file
    fetch('data.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ attempts })
    });
  } else if (guess < number) {
    document.getElementById('result').innerHTML = 'Too low. Guess again.';
    document.getElementById('attempts').innerHTML = `Attempts: ${attempts}`;
  } else {
    document.getElementById('result').innerHTML = 'Too high. Guess again.';
    document.getElementById('attempts').innerHTML = `Attempts: ${attempts}`;
  }
});
