function game() {
    let actions = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
    let userWinResults = ['scissorspaper', 'paperrock', 'rocklizard', 'lizardspock', 'spockscissors',
    'rockscissors', 'scissorslizard', 'lizardpaper', 'paperspock', 'spockrock'];
    let userChoice = '';
    let compChoice = '';
    let userChoiceElement = document.querySelector('.user-choice');
    let pickedElement = document.querySelector('.picked');
    let userPickElement = document.querySelector('.user-pick');
    let pcPickElement = document.querySelector('.pc-pick');
    let resetElement = document.querySelector('.reset');
    let resultElement = document.querySelector('.result');
    let resultTitleElement = resultElement.querySelector('.title');
    let scoreCountElement = document.querySelector('.score-count');

    let currentScore = null;

    window.addEventListener('load', () => {
        retrieveScoreFromLocalStorage();
    
        document.querySelectorAll('.user-choice .game-card').forEach(card => {
            card.addEventListener('click', (ev) => {
                userChoice = getUserChoice(ev.target);
                compChoice = getComputerChoice();
    
                startGame();
            })
        });

        resultElement.querySelector('button').addEventListener('click', tryAgain);
        
    })

}

game();