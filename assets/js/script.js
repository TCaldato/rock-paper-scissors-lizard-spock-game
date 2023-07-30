// Entry point of the game
function game() {
    //Array of possible actions and winning combinations 
    const actions = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
    const userWinResults = ['scissorspaper', 'paperrock', 'rocklizard', 'lizardspock', 'spockscissors',
    'rockscissors', 'scissorslizard', 'lizardpaper', 'paperspock', 'spockrock'];

    // Variables to store user and computer choices
    let userChoice = '';
    let compChoice = '';

    // Elements from the DOM
    const userChoiceElement = document.querySelector('.user-choice');
    const pickedElement = document.querySelector('.picked');
    const userPickElement = document.querySelector('.user-pick');
    const pcPickElement = document.querySelector('.pc-pick');
    const resultElement = document.querySelector('.result');
    const resultTitleElement = resultElement.querySelector('.title');
    const scoreCountElement = document.querySelector('.score-count');

    // Variable to store the current score
    let currentScore = null;

    // Add event listeners when loading the page
    window.addEventListener('load', () => { 

        // Add event listeners for each user choice and start the game when clicked
        document.querySelectorAll('.user-choice .game-card').forEach(card => {
            card.addEventListener('click', (ev) => {
                userChoice = getUserChoice(ev.target);
                compChoice = getComputerChoice();    
                startGame();
            })
        });

        // Add an event listener for the "Try Again" button click
        resultElement.querySelector('button').addEventListener('click', tryAgain);
    
    })
    
    // Function to start the game
    function startGame() {
        calculateWinner(userChoice, compChoice);
        userChoiceElement.classList.add('hidden');
        pickedElement.classList.remove('hidden');
        clearResultBeforeAppend();
        buildChoiceElement(true, userChoice);
        buildChoiceElement(false, compChoice);
    }
    
    // Function to get user's choice
    function getUserChoice(target) {
        if (target.nodeName === 'IMG') {
            return target.parentElement.classList[1];
        }
        return target.classList[1];
    }
    
    // Function to get computer's random choice
    function getComputerChoice() {
        return actions[Math.floor(Math.random() * 5)];
    }

    // Function to calculate the winner and update the result
    function calculateWinner(user, comp) {
        if (user === comp) {
            resultTitleElement.innerText = 'Tie';
        } else if (getUserWinsStatus(user + comp)) {
            resultTitleElement.innerText = 'You win';
            calculateScore(1);
        } else {
            resultTitleElement.innerText = 'You lose';
            calculateScore(-1);
        }
    }

    // Function to check if the user wins based on the winning combinations
    function getUserWinsStatus(result) {
        return userWinResults.some(winStr => winStr === result);
    }

    // Function to create a choice element (either for user or computer) and add it to the DOM
    function buildChoiceElement(isItUserElement, className) {
        const el = document.createElement('div');
        el.classList.add(`game-card`, className);
        el.innerHTML = `<img src="assets/images/${className}.gif" alt="${className}">`;
        if (isItUserElement) {
            userPickElement.appendChild(el);
        } else {
            pcPickElement.appendChild(el);
        }
    }

    // Function to handle the "Try Again" button click event
    function tryAgain() {
        userChoiceElement.classList.remove('hidden');
        pickedElement.classList.add('hidden');
    }

    // Function to clear the choice elements from the DOM before appending new ones
    function clearResultBeforeAppend() {
        userPickElement.innerHTML = '';
        pcPickElement.innerHTML = '';
    }

    // Function to calculate the score and update the score board
    function calculateScore(roundResult) {
        currentScore += roundResult;
        updateScoreBoard();
    }

    // Function to update the score board and save the score in local storage
    function updateScoreBoard() {
        scoreCountElement.innerText = currentScore;
        window.localStorage.setItem('gameScore', currentScore);
    }

}

// Call the game function to start the game
game();