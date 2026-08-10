// Get the form
var palForm = document.getElementById("palForm");
// Get the message box
var msg = document.getElementById("msg");
// Get the text input for last checked value
var textInput = document.getElementById("textInput");
// Get the text input where the user types
var userText = document.getElementById("userText");

// Run when the form is submitted
palForm.onsubmit = function () {

    // Get what the user typed in the box
    var raw = userText.value;

    // Remove spaces at start and end
    var trimmed = raw.trim();

    // Clear old message
    msg.innerHTML = "";

    // If nothing was typed
    if (trimmed === "") {
        // Show error
        msg.innerHTML = "You must enter some text.";
        // Stop this run
        return false;
    }

    // Show what they entered in the box
    textInput.value = raw;

    // Make lowercase and remove spaces inside
    var clean = "";
    // Build string one character at a time 
    for (var i = 0; i < trimmed.length; i++) {
        var ch = trimmed[i].toLowerCase();
        if (ch !== " ") {
            clean = clean + ch;
        }
    }

    // Start reversed string
    var rev = "";

    // Build reversed string
    for (var j = clean.length - 1; j >= 0; j--) {
        // Add characters from end to start
        rev = rev + clean[j];
    }

    // Check if it is a palindrome
    if (clean === rev) {
        // Show palindrome message
        msg.innerHTML = "\"" + raw + "\" is a palindrome!";
    } else {
        // Show not palindrome message
        msg.innerHTML = "\"" + raw + "\" is NOT a palindrome.";
    }

    // Stop real form submit / page reload
    return false;
};