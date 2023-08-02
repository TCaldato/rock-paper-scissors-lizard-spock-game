/*jshint esversion: 6 */
// Entry point of the game
function game() {
    // Array of possible actions and winning combinations
    const actions = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
    const userWinResults = ['scissorspaper', 'paperrock', 'rocklizard', 'lizardspock', 'spockscissors',
       'rockscissors', 'scissorslizard', 'lizardpaper', 'paperspock', 'spockrock'
    ];
 
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
    const scoreCountElement1 = document.querySelector('.score-count1');
 
    // Variable to store the current score
    let userScore = 0;
    let compScore = 0;
    updateScoreBoard();

 
    // Add event listeners for each user choice and start the game when clicked
    document.querySelectorAll('.user-choice .game-card').forEach(card => {
       card.addEventListener('click', (ev) => {
          userChoice = getUserChoice(ev.target);
          compChoice = getComputerChoice();
          startGame();
       });
    });
 
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
            resultTitleElement.innerText = 'You Win';
            userScore++;
        } else {
            resultTitleElement.innerText = 'You Lose';
            compScore++;
        }
    
        updateScoreBoard();
    
        // Check if the game is over (either user or comp reached 5 points)
        if (userScore === 5 || compScore === 5) {
            const winner = userScore === 5 ? 'You Win the Game!' : 'Computer Wins the Game!';
            resultTitleElement.innerText = winner;
        
            //Replace Play Again button to Reset Game button and change color to red
            const restartButton = resultElement.querySelector('button');
            restartButton.innerText = 'Reset Game';
            restartButton.style.color = 'red';
            restartButton.style.fontSize = '30px';
            restartButton.removeEventListener('click', tryAgain);
            restartButton.addEventListener('click', resetGame);
        
            // Remove the event listener for user choices to stop the game
            document.querySelectorAll('.user-choice .game-card').forEach(card => {
                card.removeEventListener('click', startGame);
            });
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
    
    // Function to handle the "Play Again" button click event
    function tryAgain() {
        userChoiceElement.classList.remove('hidden');
        pickedElement.classList.add('hidden');
    }

    // Function to Reset the Game when the Score reaches 5 points
    function resetGame() {
        addEventListener("click", function() {    
        location.reload();
       });
    }
 
    // Function to clear the choice elements from the DOM before appending new ones
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

        //Change the score color to red when the score reaches 5 points
        if (userScore === 5) {
            scoreCountElement.style.color = 'red';
        } else {
            scoreCountElement.style.color = 'black'; // Reset the color to default if it's not 5 yet
        }
    
        if (compScore === 5) {
            scoreCountElement1.style.color = 'red';
        } else {
            scoreCountElement1.style.color = 'black'; // Reset the color to default if it's not 5 yet
        }
     }
 
    // Add an event listener for the "Play Again" button click
    resultElement.querySelector('button').addEventListener('click', tryAgain);
 
 }
 
 // Call the game function to start the game
 game();