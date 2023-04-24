// Load the JSON file containing the secret number
let xhr = new XMLHttpRequest();
xhr.open("GET", "secret.json", true);
xhr.onload = function() {
    if (xhr.status == 200) {
        let secret = JSON.parse(xhr.responseText);
        let guessButton = document.getElementById("guessButton");
        let guessInput = document.getElementById("guessInput");
        let result = document.getElementById("result");
        
        let attempts = 0;

        guessButton.addEventListener("click", function() {
            let guess = guessInput.value;
            if (guess < secret.number) {
                result.textContent = "Too low, try again";
            } else if (guess > secret.number) {
                result.textContent = "Too high, try again";
            } else {
                result.textContent = "Congratulations, you guessed the number!";
                guessButton.disabled = true;
            }
            attempts++;
        });

        // Register service worker for offline support
        if ("serviceWorker" in navigator) {
            window.addEventListener("load", function() {
                navigator.serviceWorker.register("/service-worker.js").then(function(registration) {
                    console.log("Service worker registered with scope:", registration.scope);
                }, function(error) {
                    console.log("Service worker registration failed:", error);
                });
            });
        }
    }
};
xhr.send();
