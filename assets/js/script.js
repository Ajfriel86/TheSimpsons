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