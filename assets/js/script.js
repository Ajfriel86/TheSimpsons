/*
Varibles
 */
 const cards = document.querySelectorAll('.memoryCard');
 const moveContainer = document.querySelector('.moves');
 const gamePlay = document.getElementById('gamePlay');
 const win = document.getElementById('win');
 const timer = document.querySelector('.timer');
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
 Function to show and close gamePlay 
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
Function to check if cards match or not
*/
function checkCardMatch() {
    let isMatch = firstCard.dataset.image === secondCard.dataset.image;
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
    }, 900);
}