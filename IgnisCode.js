// This file has the JavaScript for my Ignis game.

// Player's total crowns. Start with 100.
var totalCrowns = 100;

/*
   Plan:
   1. Wait until the page is loaded.
   2. Find the form, reset button, and result area.
   3. Show starting crowns.
   4. When the form is submitted, stop the normal reload and play the game.
   5. When reset button is clicked, reset crowns and show message.
*/

// Wait until the page is loaded
window.onload = function () {

    // Get the form element by its id "ignisGame"
    var form = document.getElementById("ignisGame");

    // Get the reset button by its id "resetButton"
    var resetBtn = document.getElementById("resetButton");

    // Get the result area where we show messages
    var result = document.getElementById("resultArea");

    // Show starting crowns when page loads
    result.innerHTML = "Welcome. You start with " + totalCrowns + " crowns.";

    // Set what happens when the form is submitted
    form.onsubmit = function (event) {

        // Stop the page from reloading
        event.preventDefault();

        // Call our main game function
        playGame();
    };

    // Set what happens when the reset button is clicked
    resetBtn.onclick = function () {
        // Call our reset function
        resetGame();
    };
};

/*
   Function: playGame
   Does:
   - Reads user bet choice and bet amount.
   - Checks if bet amount is okay (validation) using innerHTML.
   - Rolls two random dice.
   - Adds them.
   - Checks if total is odd or even.
   - Compares with user's guess.
   - Updates totalCrowns.
   - Shows result with innerHTML.
*/
function playGame() {
    // Get the result area element
    var result = document.getElementById("resultArea");

    // New: stop the player from playing if the game is already won or lost.
    // If totalCrowns is 500 or more, they already won, so tell them to reset.
    if (totalCrowns >= 500) {
        result.innerHTML = "Ignis laughs: you already won the table! Hit reset to play again.";
        return; // This return stops the rest of playGame from running.
    }
    // If totalCrowns is 0 or less, they are out of money, so tell them to reset.
    if (totalCrowns <= 0) {
        result.innerHTML = "Ignis sighs: you are out of crowns. Hit reset to start over.";
        return; // This return also stops the rest of playGame from running.
    }

    // Read the user's choice: "odd" or "even"
    var betType = document.getElementById("betType").value;

     // Read the bet amount as text
    var betText = document.getElementById("betAmount").value;

    // Turn the bet text into a number
    var bet = Number(betText);

    // Check if bet is not a number, or too small, or too big
    if (isNaN(bet) || bet < 1 || bet > 100) {
        // User validation message with innerHTML
        result.innerHTML = "Ignis says: please bet between 1 and 100 crowns.";
        return;
    }

    // Also check: you cannot bet more than you have
    if (bet > totalCrowns) {
        // User validation: not enough crowns
        result.innerHTML = "Ignis says: you only have " + totalCrowns +
            " crowns. You cannot bet " + bet + ".";
        return;
    }

    /*
     The dice rolling was really hard to figure out. Basically Math.random gives a decimal number between 0 and 1. 
     Multiplying by 6 makes it a decimal between 0 and almost 6. 
     Math.floor makes it a whole number between 0 and 5. 
     Then adding 1 makes it a whole number between 1 and 6.
    */
    // Roll first die: random number 1 to 6
    var die1 = Math.floor(Math.random() * 6) + 1;

    // Roll second die: random number 1 to 6
    var die2 = Math.floor(Math.random() * 6) + 1;

    // Add the two dice together
    var total = die1 + die2;

    // Find if total is "odd" or "even" using helper function
    var totalType = oddOrEven(total);

    // Start building a message string
    var message = "Ignis rolled " + die1 + " and " + die2 +
        " (total " + total + ", " + totalType + ").<br>";

    // Now compare user guess to real total type
    if (betType === totalType) {
        // If they match, user wins double their bet
        var winAmount = bet * 2;

        // Add winnings to totalCrowns
        totalCrowns = totalCrowns + winAmount;

        // Add win text to message
        message += "You guessed " + betType + ". You WIN " +
            winAmount + " crowns!<br>";
    } else {
        // If they do not match, user loses their bet

        // Subtract bet from totalCrowns
        totalCrowns = totalCrowns - bet;

        // Add lose text to message
        message += "You guessed " + betType + ". You lose " +
            bet + " crowns.<br>";
    }

    // Add current totalCrowns to the message
    message += "You now have " + totalCrowns + " crowns total.<br>";

    // Check for win or lose condition for the whole game
    if (totalCrowns >= 500) {
        message += "Ignis laughs: you reached 500 crowns! You win the table!";
    } else if (totalCrowns <= 0) {
        message += "Ignis sighs: you are out of crowns. Game over.";
    }

    // Show final message with innerHTML
    result.innerHTML = message;
}

/*
   Function: oddOrEven
   Parameter: num (a number)
   Returns: "odd" or "even"
*/
function oddOrEven(num) {
    // The % sign means "remainder after dividing by 2".
    // If num % 2 is 0, there is no leftover, so the number is even.
    if (num % 2 === 0) {
        return "even";
    } else {
        // If num % 2 is 1, there is a leftover of 1, so the number is odd.
        return "odd";
    }
}

/*
   Function: resetGame
   Does:
   - Set totalCrowns back to 100.
   - Show a reset message with innerHTML.
*/
function resetGame() {
    // Set crowns back to starting amount
    totalCrowns = 100;

    // Show reset message
    var result = document.getElementById("resultArea");
    result.innerHTML = "Game reset. You have " + totalCrowns + " crowns.";
}