let energy = 5;
let playerScore = 0;
let computerScore = 0;

const match = document.querySelector('.match');

const letsPlay = () => {
    const intro = document.querySelector('.intro');
    const play = document.querySelector('.intro button');

    play.addEventListener('click', () => {
        intro.classList.add('fade-out');
        match.classList.remove('fade-out');
    });

}
letsPlay();

const computerChoice = () => {
    const computerOptions = ['rock', 'paper', 'scissors'];
    // Generates Random Numbers
    const computerIndex = Math.floor(Math.random() * computerOptions.length);
    // Return a computer choice
    return computerOptions[computerIndex];
}

const gameRule = (playerChoice, computerChoice) => {
    const winnerBoard = document.querySelector('.winner-board');
    // Set rule for the game
    if (playerChoice === computerChoice) {
        winnerBoard.textContent = 'Draw';
        return;
    }
    if (playerChoice === 'rock') {
        if (computerChoice === 'scissors') {
            winnerBoard.textContent = 'Player Wins';
            playerScore++;
            return;
        } else {
            winnerBoard.textContent = 'Computer Wins';
            computerScore++;
            return;
        }
    }
    if (playerChoice === 'paper') {
        if (computerChoice === 'rock') {
            winnerBoard.textContent = 'Player Wins';
            playerScore++;
            return;
        } else {
            winnerBoard.textContent = 'Computer Wins';
            computerScore++;
            return;
        }
    }
    if (playerChoice === 'scissors') {
        if (computerChoice === 'paper') {
            winnerBoard.textContent = 'Player Wins';
            playerScore++;
            return;
        } else {
            winnerBoard.textContent = 'Computer Wins';
            computerScore++;
            return;
        }
    }
}

const updateScoreBoard = () => {
    const playerScoreBoard = document.querySelector('.player-score p');
    const computerScoreBoard = document.querySelector('.computer-score p');
    // Update UI Score
    playerScoreBoard.textContent = playerScore;
    computerScoreBoard.textContent = computerScore;
}

const playMatch = () => {
    const energyBar = document.querySelector('.energy-bar span');
    const playerHand = document.querySelector('.player-hand');
    const computerHand = document.querySelector('.computer-hand');
    const playerOptions = document.querySelectorAll('.player-options button');
    const hands = document.querySelectorAll('.hands img');
    const closingScreen = document.querySelector('.closing-screen');
    const closingText = document.querySelector('.closing-screen h1');
    energyBar.textContent = energy;

    // Remove the handshake animation
    hands.forEach(hand => {
        hand.addEventListener('animationend', function () {
            this.style.animation = '';
        });
    });

    // Play the game by clicking the options
    playerOptions.forEach(option => {
        option.addEventListener('click', function () {
            if (energy == 0) return;

            const compChoice = computerChoice();

            // Initial hands
            playerHand.src = 'img/rock.png';
            computerHand.src = 'img/rock.png';

            // Shake the Hands
            playerHand.style.animation = 'shakePlayerHand 1.5s ease';
            computerHand.style.animation = 'shakeComputerHand 1.5s ease';

            setTimeout(() => {
                // Update UI Hands after choosing
                playerHand.src = `img/${this.textContent}.png`;
                computerHand.src = `img/${compChoice}.png`;
                // Match Results (Player Wins or Computer Wins)
                gameRule(this.textContent, compChoice);
                // Update Score Board
                updateScoreBoard();
            }, 1250);

            // Update UI Energy Bar
            energy--;
            if (energy == 0) {
                energyBar.style.color = 'rgb(204, 0, 0)';

                setTimeout(() => {
                    if (playerScore > computerScore) {
                        closingText.textContent = 'You Win';
                        closingText.style.color = 'seagreen';
                    }
                    if (playerScore == computerScore) {
                        closingText.textContent = 'Draw';
                        closingText.style.color = 'rgb(189, 213, 236)'
                    }
                    if (playerScore < computerScore) {
                        closingText.textContent = 'You Lose';
                        closingText.style.color = 'rgb(216, 29, 29)';
                    }

                    match.classList.add('fade-out');
                    closingScreen.classList.remove('fade-out');

                }, 3000);
            }
            energyBar.textContent = energy;
        });
    });
}
playMatch();
