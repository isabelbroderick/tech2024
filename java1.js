var score = 0;
var gameStarted = false; // Variable to track if the game has started
var intervalBird1;
var intervalBird2;
var intervalrat;
var intervalposs;
var intervalstoat;
var intervalkiwi;
var intervalpigeon;
var intervalkak;
var intervalratu;
var bird1Position = 0;
var bird2Position = 0;
var possposition = 0;
var ratposition = 0;
var stoatposition = 0;
var kiwiposition = 0;
var pigeonposition = 0;
var kakposition = 0;
var ratuposition = 0;

document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners for each day's events
    bird1.addEventListener('click', tuesday);
    bird2.addEventListener('click', wednesday);
    poss.addEventListener('click', thursday);
    rat.addEventListener('click', friday);
    stoat.addEventListener('click', sataday);
    kiwi.addEventListener('click', sunday);
    pigeon.addEventListener('click', monday);
    kak.addEventListener('click', january);
    ratu.addEventListener('click', february);

    // Prevent interaction with elements before the game starts
    document.body.addEventListener('click', function(event) {
        var popup = document.getElementById('popup');
        if (!gameStarted && popup.style.display === 'none' && event.target.id !== 'startButton') {
            alert('Please click the start button to begin the game.');
        }
    }, true);
});

// Function to display the pop-up
function displayPopup() {
    var popup = document.getElementById('popup');
    popup.style.display = 'block';
}

// Function to close the pop-up
function closePopup() {
    var popup = document.getElementById('popup');
    popup.style.display = 'none';
    document.getElementById('startButton').disabled = false;
}


displayPopup() // call popup 

function pigeonf(){
    intervalpigeon = setInterval(() => {
        pigeonposition -= 10;
        pigeon.style.left = pigeonposition + 'px';

        if (pigeonposition <= -10) {
            pigeonposition = window.innerWidth;
        }
    }, 60);
}

function bird1f(){
    intervalBird1 = setInterval(() => {
        bird1Position -= 10; // Move bird1 to the left by 10 pixels (decrementing)
        bird1.style.left = bird1Position + 'px';

        // Check if bird1 has reached the left side of the screen
        if (bird1Position <= -10) {
            bird1Position = window.innerWidth; // Reset bird1 position to the right side of the screen
        }
    }, 50);  //every 50 milliseconds
}

function bird2f(){
    intervalBird2 = setInterval(() => {
        bird2Position += 10; // Move bird2 to the right by 10 pixels
        bird2.style.left = bird2Position + 'px';
        
        // Check if bird2 has reached the end of the screen
        if (bird2Position >= window.innerWidth) {
            bird2Position = -200; // Reset bird2 position to the left side of the screen
        }
    }, 100); // every 100 milliseconds
}

function possf() {
    intervalposs = setInterval(() => {
        possposition += 10;
        poss.style.left = possposition + 'px';
        
        if (possposition >= window.innerWidth) {
            possposition = -350;
        }
    }, 100); // every 100 milliseconds
}

function ratf(){
    intervalrat = setInterval(() => {
        ratposition += 10;
        rat.style.left = ratposition + 'px';
        
        if (ratposition >= window.innerWidth) {
            ratposition = -350;
        }
    }, 60); // every 50 milliseconds
}

function stoatf() {
    intervalstoat = setInterval(() => {
        stoatposition -= 10;
        stoat.style.left = stoatposition + 'px';

        if (stoatposition <= -350) {
            stoatposition = window.innerWidth;
        }
    }, 75);
}

function kiwif(){
    intervalkiwi = setInterval(() => {
        kiwiposition += 10;
        kiwi.style.left = kiwiposition + 'px';
        
        if (kiwiposition >= window.innerWidth) {
            kiwiposition = -700;
        }
    }, 70); // every 70 milliseconds
}

function kakf(){
    intervalkak = setInterval(() => {
        kakposition += 10;
        kak.style.left = kakposition + 'px';
        
        if (kakposition >= window.innerWidth) {
            kakposition = -100;
        }
    }, 65);
}

function ratuf() {
    clearInterval(intervalratu); // Clear any existing interval
    if (ratuposition < 400) {
        // Move the rat up
        intervalratu = setInterval(() => {
            ratuposition += 10;
            ratu.style.bottom = ratuposition + 'px';
            if (ratuposition >= 400) {
                clearInterval(intervalratu); // Stop the rat when it reaches the top
                ratuf(); // Call ratuf again to start moving down
            }
        }, 65);
    } else {
        // Rotate the rat and move it down
        ratu.style.transform = "rotate(180deg)"; // Rotate the rat 180 degrees
        intervalratu = setInterval(() => {
            ratuposition -= 10;
            ratu.style.bottom = ratuposition + 'px';
            if (ratuposition <= 0) {
                // Stop the rat when it reaches the bottom
                ratu.style.transform = "rotate(360deg)";
                ratuf(); // Call ratuf again to start moving up
            }
        }, 65);
    }
}

function start() {
    // Set gameStarted to true when the game starts
    document.getElementById('startButton').disabled = true;
    gameStarted = true;

    pigeonf();
    bird1f();
    bird2f();
    possf();
    ratf();
    stoatf();
    kiwif();
    kakf();
    ratuf();

    setTimeout(() => {
        clearInterval(intervalBird2);
        clearInterval(intervalBird1);
        clearInterval(intervalkak);
        clearInterval(intervalkiwi);
        clearInterval(intervalpigeon);
        clearInterval(intervalposs);
        clearInterval(intervalrat);
        clearInterval(intervalratu);
        clearInterval(intervalstoat);
       
        displayPopUp(score);
    }, 20000); // 20000 milliseconds = 20 seconds
}

function displayPopUp(score) {
    // Create a div for the pop-up
    var popup = document.createElement("div");
    popup.setAttribute("style", "position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: white; padding: 20px; border: 2px solid black;");

    // Create elements for pop-up content
    var title = document.createElement("h1");
    var message = document.createElement("h2");
    var additionalMessage = document.createElement("p");

    // Set title and message based on the score
    if (score < 1) {
        title.textContent = "You Failed next star at 1";
        message.textContent = "Try again!";
    } else if (score < 6) {
        title.textContent = "1 Star next star at 6";
        message.textContent = "Hmm, you did okay. Move on or retry and see if you can score better.";
        additionalMessage.textContent = "Be careful, the animals will be moving a lot faster this time.";
    } else if (score < 11) {
        title.textContent = "2 Stars next star at 11";
        message.textContent = "Good job! Either try and improve or move on to the next level.";
        additionalMessage.textContent = "Be careful, the animals will be moving a lot faster this time.";
    } else {
        title.textContent = "3 Stars";
        message.textContent = "Well done! You clearly know your pests. Time to move on to the next level.";
        additionalMessage.textContent = "Be careful, the animals will be moving a lot faster this time.";
    }

    // Display the score in the pop-up
    var scoreDisplay = document.createElement("h2");
    scoreDisplay.textContent = "Score: " + score;

    // Create buttons for retry, next level, and logging highscore
    var retryButton = document.createElement("button");
    retryButton.textContent = "Retry";
    retryButton.onclick = function() {
        location.reload(); // Reload the current page to start again
    };

    var nextLevelButton = document.createElement("button");
    nextLevelButton.textContent = "Next Level";
    nextLevelButton.onclick = function() {
        window.location.href = "level2.html"; // Redirect to level 2 page
    };
    nextLevelButton.style.display = (score >= 1) ? "inline-block" : "none"; // Show only if score is 1 or more

    var loginButton = document.createElement("button");
    loginButton.textContent = "Log as New Highscore";
    loginButton.onclick = function() {
        window.location.href = "login.html"; // Redirect to login page
    };

     // button for home
     var homeButton = document.createElement("button");
     homeButton.textContent = "home";
     homeButton.onclick = function() {
        window.location.href = "index.html"; // Redirect to home page 
     };

    // Append elements to the pop-up
    popup.appendChild(title);
    popup.appendChild(scoreDisplay); // Append score display
    popup.appendChild(message);
    popup.appendChild(additionalMessage);
    popup.appendChild(retryButton);
    popup.appendChild(nextLevelButton);
    popup.appendChild(loginButton);
    popup.appendChild(homeButton);

    // Append the pop-up to the body of the HTML document
    document.body.appendChild(popup);
}

function handleElement(event, target, scoreChange) {
    if (gameStarted && event.target === target) {
        score += scoreChange; // Update the score
        localStorage.setItem('score', score); // Store the score in localStorage
        message.textContent = "Score: " + score; // Update the score display
        target.style.pointerEvents = 'none';
        target.style.visibility = 'hidden'; // Hide the image if exists
    }
    setTimeout(() => {
        target.style.pointerEvents = 'auto';
        target.style.visibility = 'visible'; // Show the image again if exists
    }, 3000);
}

function tuesday(event) {
    handleElement(event, bird1, -1);
}

function wednesday(event) {
    handleElement(event, bird2, -1);
}

function thursday(event) {
    handleElement(event, poss, 1);
}

function friday(event) {
    handleElement(event, rat, 1);
}

function sataday(event) {
    handleElement(event, stoat, 1);
}

function sunday(event) {
    handleElement(event, kiwi, -1);
}

function monday(event) {
    handleElement(event, pigeon, 1);
}

function january(event) {
    handleElement(event, kak, -1);
}

function february(event) {
    handleElement(event, ratu, 1);
}

localStorage.setItem('score', score);
