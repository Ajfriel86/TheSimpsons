/*
Varibles
 */
const cards = document.querySelectorAll('.memoryCard');
const moveContainer = document.querySelector('.moves');
const gamePlay = document.getElementById('gamePlay');
const win = document.getElementById('win');
const timerBox = document.querySelector('.timer');
const MAX_MATCH = 6;
const resetBtn = document.getElementById('resetBtn');
const closeBtn = document.getElementById('closeBtn');

let gameOn = false;
let cardMatch = 0;
let flippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moves = 0;
let finalTime = "";

/*
Event Listeners
*/
cards.forEach(card => card.addEventListener('click', flipCard));
shuffle();

resetBtn.addEventListener('click', showGamePlay);
closeBtn.addEventListener('click', closeGamePaly);

/*
Functions to show and close gamePlay 
*/
function showGamePaly() {
    gamePlay.style.display = 'block';
}

function closeGamePlay() {
    gamePaly.style.display = 'none';
}
/*
Function for two cards to be flipped
*/
function flipCard() {
    if (!gameOn) {
        gameOn = true;
        timer();
    }
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!flippedCard) {

        flippedCard = true;
        firstCard = this;

        return;
    }
    secondCard = this;
    checkCardMatch();
}
/*
Functions to check if cards match or not
*/
function checkCardMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    if (isMatch) perfectMatch += 1;

    addMove();

    if (isMatch) pairMatch();
    else noMatch();

    if (perfectMatch === MAX_MATCH) winGame();
}

function pairMatch() {

    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function noMatch() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}
/*
Setting up function to add moves to move counter in index.html
*/
moves = 0;
moveContainer.innerHtml = 0;

function addMove() {
    moves++;
    moveContainer.innerHTML = moves;
}
/*
Varibles and fnctions for timer 
*/
let time;
let minutes = 0;
let seconds = 0;
let timeStart = false;
timerBox.innerHTML = 'Time' + minutes + ' : ' + seconds;

function timer() {
    time = setInterval(function() {
        seconds++;
        if (seconds === 59) {
            minutes++;
            seconds = 0;
        }
        timerBox.innerHTML = 'Time ' + minutes + ' : ' + seconds;
    }, 1000);
}

function stopTime() {
    clearInterval(time);
}

function resetBoard() {
    [flippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}
/*
Displays the winner message in the index.html
*/
function winGame() {
    stopTime();
    showWinnerMsg();
}

function showWinnerMsg() {
    win.style.display = 'block';
    finalTime = timerBox.innerHTML;

    document.getElementById('finalMove').innerHTML = moves;
    document.getElementById('totalTime').innerHTML = finalTime;
    reset();
}
window.onclick = function(event) {
    if (event.target.id == 'close') {
        document.getElementById('win').style.display = 'none';
    }
};
/*
Function to Shuffle cards
*/
function shuffle() {
    cards.forEach(cards => {
        let randomPosition = Math.floor(Math.random() * 16);
        cards.style.order = randomPosition;
    });
}
/*
Function to reset the game
*/
function reset() {
    setTimeout(() => {
        flippedCard = false;
        [firstCard, secondCard] = [null, null];
        stopTime();
        gameOn = false;
        timeStart = false;
        seconds = 0;
        minutes = 0;
        timerBox.innerHTML = 'Timer 0:00';
        moves = 0;
        moveContainer.innerHTML = 0;
        perfectMatch = 0;
        cards.forEach(cardReset => cardReset.classList.remove('flip'));
        shuffle();
        cards.forEach(card => card.addEventListener('click', flipCard));
    }, 500);

}