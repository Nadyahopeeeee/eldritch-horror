import './index.html';
import './index.css';
// import './assets'
// import code from './img/code.png'
// import { mult, sum } from './modules/calc';

// const imgWrap = document.querySelector('.img');
// const img = new Image();
// img.src = code;
// img.width = 700;
// imgWrap.append(img);

// console.log(mult(3, 4));
// console.log(sum(3, 4));

import { ancientsData } from "./data/ancients.js"
import { difficulties } from "./data/difficulties.js"
import { brownCards, blueCards, greenCards } from "./data/mythicCards/index.js"

console.log(ancientsData)
console.log(difficulties)
console.log(brownCards)
console.log(blueCards)
console.log(greenCards)


console.log(typeof(brownCards));

//1. функция смешивания массива
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

shuffle(brownCards);



// let brownCardsArr =  brownCards.keys(brownCards);

// console.log(brownCardsArr);
// console.log(brownCards.length);


//Если кликнули на карту Азатора
// ancientsData[0]

const cardsContainer = document.querySelector('.cards__container');
const levelBtnContainer  = document.querySelector('.level-btn__container');
// const card = document.querySelector('.card');
// const cardAzathor = document.querySelector('.card_azathoth');

let selectedCard;


function activeCard(item) {
  if (selectedCard) { // убрать существующую подсветку, если есть
    selectedCard.classList.remove('card_active');
  } selectedCard = item;
   selectedCard.classList.add('card_active'); // подсветить новый td
}


cardsContainer.onclick = function(event) {
  let card = event.target.closest('.card');
  if (!card) return;
  activeCard(card);
};

let selectedLevel;

function activeLevel(item) {
  if (selectedLevel) { 
    selectedLevel.classList.remove('level_active');
  } selectedLevel = item;
  selectedLevel.classList.add('level_active');
}

levelBtnContainer.onclick = function(event) {
  let levelBtn = event.target.closest('.level-btn');
  if (!levelBtn) return;
  activeLevel(levelBtn);
};