// This is the JavaScript file for the Index.html page and has the code for the meme image animation.

// This finds the meme image on the HTML page.
let memeImage = document.getElementById("memeImage");

// This keeps track of the image position.
let position = 0;

// This variable stores the animation timer.
let timer = null;

// This controls which direction the image moves.
// A value of 1 moves the image right.
// A value of -1 moves the image left.
let direction = 1;


// This function moves the image back and forth across the screen.
function animation() {

    // Move the image by adding the current direction.
    position = position + direction;

    // Change the image's left position on the page.
    memeImage.style.left = position + "px";


    // If the image reaches the right side, reverse direction.
    if (position >= 500) {

        direction = -1;

    }


    // If the image reaches the left side, reverse direction.
    if (position <= 0) {

        direction = 1;

    }

}


// This function starts the meme movement.
function startMeme() {

    // Disable the Start button after clicking it.
    document.getElementById("startButton").disabled = true;

    // Enable the Stop button.
    document.getElementById("stopButton").disabled = false;


    // Start the animation timer.
    // The animation function runs every 20 milliseconds.
    if (timer == null) {

        timer = setInterval(animation, 20);

    }

}


// This function stops the meme movement.
function stopMeme() {

    // Stop the animation timer.
    clearInterval(timer);

    // Reset the timer so the animation can start again later.
    timer = null;


    // Disable the Stop button.
    document.getElementById("stopButton").disabled = true;

    // Enable the Start button again.
    document.getElementById("startButton").disabled = false;

}