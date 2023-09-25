/*jshint esversion: 6 */

// Array of possible actions and winning combinations
// Arrays created following the tutorial:
//https://www.youtube.com/watch?v=lV2BMXdsDmc
const actions = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
const userWinResults = ['scissorspaper', 'paperrock', 'rocklizard', 'lizardspock', 'spockscissors',
    'rockscissors', 'scissorslizard', 'lizardpaper', 'paperspock', 'spockrock'
];

// Variables to store user and computer choices
let userChoice = '';
let compChoice = '';

// Elements from the DOM
// Constants created following the tutorial:
//https://www.youtube.com/watch?v=lV2BMXdsDmc
const userChoiceElement = document.querySelector('.user-choice');
const pickedElement = document.querySelector('.picked');
const userPickElement = document.querySelector('.user-pick');
const pcPickElement = document.querySelector('.pc-pick');
const resultElement = document.querySelector('.result');
const resultTitleElement = resultElement.querySelector('.title');
const scoreCountElement = document.querySelector('.score-count');
const scoreCountElement1 = document.querySelector('.score-count1');

// Constant to store the Cards sound
const cardSound = new Audio("assets/sounds/clicksound.mp3");

// Constant to store the Win and Lose sound
const winSound = new Audio("assets/sounds/winsound.mp3");
const failSound = new Audio("assets/sounds/failsound.mp3");

// Constant to store the Main Music of the Game 
const mySound = new Audio("assets/sounds/mainsound.mp3");
const buttonMusic = document.getElementById("button-music");

// EventListener added to Play Music Button to Stop and Play Main Music
buttonMusic.addEventListener("click", () => {
    if (mySound.paused) {
        mySound.volume = 0.3;
        mySound.loop = true;
        mySound.play();
    } else {
        mySound.pause();
    }
});

// Variable to store the current score
let userScore = 0;
let compScore = 0;
updateScoreBoard();

// Constant for Modal
const rulesModal = document.getElementById("rules-modal");
const closeButton = document.querySelector(".close-button");
const buttonClickRules = document.getElementById("rules");

//Open the Modal when user clicks the button
buttonClickRules.onclick = function() {
    rulesModal.style.display = "block";
};

//Close the Modal when user clicks the X on Modal
closeButton.onclick = function() {
    rulesModal.style.display = "none";
};

// Close the modal if the user clicks outside of it
window.onclick = function(event) {
    if (event.target === rulesModal) {
        rulesModal.style.display = "none";
    }
};

// Function to handle card clicks
function handleCardClick(event) {
    const card = event.currentTarget;

    // Adjust volume and play a sound effect
    cardSound.volume = 0.2;
    cardSound.play();
    userChoice = getUserChoice(card);
    compChoice = getComputerChoice();
    startGame();
}

// Add click event listeners to all elements with the 'game-card' class
document.querySelectorAll('.user-choice .game-card').forEach(card => {
    // Attach the 'handleCardClick' function to the click event
    card.addEventListener('click', handleCardClick);
});

// Function to start the game
// Function created following the tutorial:
//https://www.youtube.com/watch?v=lV2BMXdsDmc
function startGame() {
    calculateWinner(userChoice, compChoice);
    userChoiceElement.classList.add('hidden');
    pickedElement.classList.remove('hidden');
    clearResultBeforeAppend();
    buildChoiceElement(true, userChoice);
    buildChoiceElement(false, compChoice);
}

// Function to get user's choice
// Function created following the tutorial:
//https://www.youtube.com/watch?v=lV2BMXdsDmc
function getUserChoice(target) {
    const elementWithClass = target.closest('.game-card');
    if (elementWithClass) {
        const className = elementWithClass.classList[1];
        return className;
    }
}

// Function to get computer's random choice
function getComputerChoice() {
    return actions[Math.floor(Math.random() * 5)];
}

// Function to calculate the winner and update the result on the score board
function calculateWinner(user, comp) {
    const outcome = determineOutcome(user, comp);

    switch (outcome) {
        case 'Tie':
            resultTitleElement.innerText = 'Tie';
            break;
        case 'You Win':
            resultTitleElement.innerText = 'You Win';
            userScore++;
            break;
        case 'You Lose':
            resultTitleElement.innerText = 'You Lose';
            compScore++;
            break;
    }

    updateScoreBoard();

    if (userScore === 5 || compScore === 5) {
        const winner = userScore === 5 ? 'You Win the Game!' : 'Computer Wins the Game!';
        resultTitleElement.innerText = winner;

        const restartButton = resultElement.querySelector('button');
        restartButton.innerText = 'Reset Game';
        restartButton.style.color = 'red';
        restartButton.style.fontSize = '30px';
        restartButton.removeEventListener('click', playAgain);
        restartButton.addEventListener('click', resetGame);

        document.querySelectorAll('.user-choice .game-card').forEach(card => {
            card.removeEventListener('click', startGame);
        });
    }
}

//Function to determine if User win/lose or tie when choosing a card
function determineOutcome(user, comp) {
    if (user === comp) {
        return 'Tie';
    } else if (getUserWinsStatus(user + comp)) {
        return 'You Win';
    } else {
        return 'You Lose';
    }
}

// Function to check if the user wins based on the winning combinations
function getUserWinsStatus(result) {
    return userWinResults.includes(result);
}

// Function to create a choice element (either for user or computer) and add it to the DOM
function buildChoiceElement(isItUserElement, className) {
    const container = isItUserElement ? userPickElement : pcPickElement;
    const cardElemnt = createGameCardElement(className);
    container.appendChild(cardElemnt);
}

function createGameCardElement(className) {
    const cardElemnt = document.createElement('div');
    cardElemnt.classList.add('game-card', className);
    cardElemnt.innerHTML = `<img src="assets/images/index/${className}.gif" alt="${className}">`;
    return cardElemnt;
}

// Function to handle the "Play Again" button click event
// Function created following the tutorial:
//https://www.youtube.com/watch?v=lV2BMXdsDmc
function playAgain() {
    userChoiceElement.classList.remove('hidden');
    pickedElement.classList.add('hidden');
}

// Add an event listener for the "Play Again" button click
resultElement.querySelector('button').addEventListener('click', playAgain);

// Function to Reset the Game when the Score reaches 5 points
function resetGame() {
    addEventListener("click", function() {
        location.reload();
    });
}

// Function to clear the choice elements from the DOM before appending new ones
// Function created following the tutorial:
//https://www.youtube.com/watch?v=lV2BMXdsDmc
function clearResultBeforeAppend() {
    userPickElement.innerHTML = '';
    pcPickElement.innerHTML = '';
}

// Function to update the score board and save the score in local storage
function updateScoreBoard() {
    scoreCountElement.innerText = userScore;
    scoreCountElement1.innerText = compScore;
    window.localStorage.setItem('gameUserScore', userScore);
    window.localStorage.setItem('gameCompScore', compScore);

    //Change the score color to green when user's score reaches 5 points
    if (userScore === 5) {
        mySound.pause();
        winSound.volume = 0.1;
        winSound.play();
        scoreCountElement.style.color = 'green';
    } else {
        scoreCountElement.style.color = 'black'; // Reset the color to default if it's not 5 yet
    }

    //Change the score color to red when computer's score reaches 5 points
    if (compScore === 5) {
        mySound.pause();
        failSound.volume = 0.1;
        failSound.play();
        scoreCountElement1.style.color = 'red';
    } else {
        scoreCountElement1.style.color = 'black'; // Reset the color to default if it's not 5 yet
    }
}