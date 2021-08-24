/*
Varibles
 */
const cards = document.querySelectorAll('.memoryCard');
const movesBox = document.querySelector('.moves');
const timerBox = document.querySelector('.timer');
const gamePlay = document.getElementById('gamePlay');
const rulesBtn = document.getElementById('rulesBtn');
const closeBtn = document.getElementById('closeBtn');
const win = document.getElementById('win');
const MAX_MATCH = 6;

let perfMatch = 0;
let moves = 0;
let gameStart = false;
let flipped = false;
let firstCard, secondCard;
let finalTime = "";
let lockedBoard = false;

/*
Event Listeners
*/
cards.forEach(card => card.addEventListener('click', turnCard));
shuffle();

rulesBtn.addEventListener('click', showGamePlay);
closeBtn.addEventListener('click', closeGamePlay);

/*
Function to dsiplay and close Game Play Instructions
*/
function showGamePlay() {
    gamePlay.style.display = 'block';
}

function closeGamePlay() {
    gamePlay.style.display = 'none';
}
/*
Function for two cards to be flipped
*/
function turnCard() {
    if (!gameStart) {
        gameStart = true;
        timer();
    }
    if (lockedBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!flipped) {

        flipped = true;
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
    if (isMatch) perfMatch += 1;

    addMove();

    if (isMatch) pairMatch();
    else noMatch();

    if (perfMatch === MAX_MATCH) winGame();
}


function pairMatch() {

    firstCard.removeEventListener('click', turnCard);
    secondCard.removeEventListener('click', turnCard);
    reloadBoard();


}

function noMatch() {
    lockedBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        reloadBoard();
    }, 1500);



}
/*
Setting up function to add moves to move counter in index.html
*/
moves = 0;
movesBox.innerHtml = 0;

function addMove() {
    moves++;
    movesBox.innerHTML = moves;
}
/*
Varibles and functions for timer 
*/
let time;
let minutes = 0;
let seconds = 0;
let timeStart = false;
timerBox.innerHTML = 'Time ' + minutes + ' : ' + seconds;

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


function reloadBoard() {
    [flipped, lockedBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}
/*
Displays the winner message in the index.html
*/
function winGame() {
    stopTime();
    showWinMessage();
}
function showWinMessage() {
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
        flipped = false;
        [firstCard, secondCard] = [null, null];
        stopTime();
        gameStart = false;
        timeStart = false;
        seconds = 0;
        minutes = 0;
        timerBox.innerHTML = 'Timer 0:00';
        moves = 0;
        movesBox.innerHTML = 0;
        perfMatch = 0;
        cards.forEach(cardReload => cardReload.classList.remove('flip'));
        shuffle();
        cards.forEach(card => card.addEventListener('click', turnCard));
    }, 500);

}