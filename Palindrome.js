// Get the form
var palForm = document.getElementById("palForm");
// Get the message box
var msg = document.getElementById("msg");
// Get the text input
var textInput = document.getElementById("textInput");

// Control if we keep looping
var keepGoing = true;

// Run when the form is submitted
palForm.onsubmit = function () {

    // Loop while user wants to keep going
    while (keepGoing) {

        // Ask the user for text
        var raw = prompt("Enter a word or phrase to check:");

        // If user clicked Cancel
        if (raw === null) {
            // Show message
            msg.innerHTML = "Prompt canceled. Click the button to try again.";
            // Stop this run
            break;
        }

        // Remove spaces at start and end
        var trimmed = raw.trim();

        // If nothing was typed
        if (trimmed === "") {
            // Show error
            msg.innerHTML = "You must enter some text.";
            // Stop this run
            break;
        }

        // Show what they entered in the box
        textInput.value = raw;

        // Make lowercase and remove spaces inside
        var clean = trimmed.toLowerCase().replace(/\s+/g, "");

        // Start reversed string
        var rev = "";

        // Build reversed string
        for (var i = clean.length - 1; i >= 0; i--) {
            // Add characters from end to start
            rev += clean[i];
        }

        // Check if it is a palindrome
        if (clean === rev) {
            // Show palindrome message
            msg.innerHTML = "\"" + raw + "\" is a palindrome!";
        } else {
            // Show not palindrome message
            msg.innerHTML = "\"" + raw + "\" is NOT a palindrome.";
        }

        // Ask if they want another
        var again = confirm("Do you want to enter another word or phrase?");

        // If they do not want another
        if (!again) {
            // Turn off loop
            keepGoing = false;
            // Disable the button
            palForm.elements[1].disabled = true;
            // Add final note
            msg.innerHTML += " You chose to stop. Refresh the page to start again.";
        }

        // End this loop run
        break;
    }

    // Stop real form submit / page reload
    return false;
};