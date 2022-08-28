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
// import cards from './assets/MythicCards/brown';

console.log(ancientsData)
console.log(difficulties)
console.log(brownCards)
console.log(blueCards)
console.log(greenCards)

const cardsContainer = document.querySelector('.cards__container');
const levelBtnContainer  = document.querySelector('.level-btn__container');

let selectedCard;
let selectedLevel;
let selectedAncientData;

function activeCard(item) {
  if (selectedCard) { // убрать существующую подсветку, если есть
    selectedCard.classList.remove('card_active');
  } selectedCard = item;
  selectedCard.classList.add('card_active'); // подсветить новую карту
}


cardsContainer.addEventListener('click', (e) => {
  // if (e.target.tagName === 'LI') {
  //   selectedCard = e.target;
  //   e.target.classList.add('card_active');
  //   console.log(selectedCard);
  let card = e.target.closest('.card');
  if (!card) return;
  activeCard(card);

  for (let i = 0; i < ancientsData.length; i++) {
    if (ancientsData[i].name === selectedCard.id) {
      selectedAncientData = ancientsData[i];
    }

  levelBtnContainer.classList.add('level_active');
  }


    // for (let i = 0; i < cardsContainer.children.length; i++){
		// 	if (!cardsContainer.children[i].classList.contains(selectedCard)){
		// 		cardsContainer.children[i].classList.remove('card_active');
		// 	}
		// }

		// levelListWrapper.classList.remove('hide');
    
  }
)


// function activeCard(item) {
//   if (selectedCard) { // убрать существующую подсветку, если есть
//     selectedCard.classList.remove('card_active');
//   } selectedCard = item;
//   selectedCard.classList.add('card_active'); // подсветить новую карту
// }

// cardsContainer.addEventListener('click', (e) => {
// 		for (let i = 0; i < ancientsData.length; i++){
// 			if (ancientsData[i].name === selectedCard){
// 				selectedAncientData = ancientsData[i];
//         console.log(selectedAncientData);
// 			}
// 		}

//     let card = e.target.closest('.card');
//     if (!card) return;
//     activeCard(card);

//     console.log(selectedAncientData);
// 		// levelListWrapper.classList.remove('hide');
// })

/*======================Мой код раньше====================================
console.log(typeof(brownCards));


const cardsContainer = document.querySelector('.cards__container');
const levelBtnContainer  = document.querySelector('.level-btn__container');

let selectedCard;

function activeCard(item) {
  if (selectedCard) { // убрать существующую подсветку, если есть
    selectedCard.classList.remove('card_active');
  } selectedCard = item;
  selectedCard.classList.add('card_active'); // подсветить новую карту
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

//1. функция смешивания массива
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

console.log(ancientsData[0].id)

const circleGreen1 = document.querySelector('.circle_green-1');
const circleBrown1 = document.querySelector('.circle_brown-1');
const circleBlue1 = document.querySelector('.circle_blue-1');

const circleGreen2 = document.querySelector('.circle_green-2');
const circleBrown2 = document.querySelector('.circle_brown-2');
const circleBlue2 = document.querySelector('.circle_blue-2');

const circleGreen3 = document.querySelector('.circle_green-3');
const circleBrown3 = document.querySelector('.circle_brown-3');
const circleBlue3 = document.querySelector('.circle_blue-3');

// circleGreen1.textContent = ancientsData[0].firstStage.greenCards;
// circleBrown1.textContent = ancientsData[0].firstStage.brownCards;
// circleBlue1.textContent = ancientsData[0].firstStage.blueCards;


function showAzathorCount() {
  if (selectedCard == ancientsData[0].id && selectedLevel == 'level_medium') {
    circleGreen1.textContent = ancientsData[0].firstStage.greenCards;
    circleBrown1.textContent = ancientsData[0].firstStage.brownCards;
    circleBlue1.textContent = ancientsData[0].firstStage.blueCards;
  }
}

selectedCard.addEventListner('click', showAzathorCount);


shuffle(brownCards);
shuffle(blueCards);
shuffle(greenCards);
======================Мой код раньше====================================*/


/*======================Пример кода 1====================================
// const greenCards = randomCards.filter(по цвету)
// stage1Cards = greenCards.pop() 

// фильтром просто воспользуйтесь
// новый массив через фильтр к старому
// newCards = cards.filter(isNotHard)

// function creatDeck() {
//   azathothLevels.addEventListner('click', (e) => {
//     if( e.target.classList.contains('level_very-easy')) {
//       azathorDeckVeryEasy();
//     }
//     if( e.target.classList.contains('level_easy')) {
//       azathorDeckEasy();
//     }
//     if( e.target.classList.contains('level_medium')) {
//       azathorDeckMedium();
//     }
//     if( e.target.classList.contains('level_hard')) {
//       azathorDeckHard();
//     }
//     if( e.target.classList.contains('level_very-hard')) {
//       azathorDeckVeryHard();
//     }
//   })

//   console.log(deck);
//   openDeck();

//   cthulhuLevels.addEventListner('click', (e) => {
//     if( e.target.classList.contains('level_very-easy')) {
//       cthulhuDeckVeryEasy();
//     }
//     if( e.target.classList.contains('level_easy')) {
//       cthulhuDeckEasy();
//     }
//     if( e.target.classList.contains('level_medium')) {
//       cthulhuDeckMedium();
//     }
//     if( e.target.classList.contains('level_hard')) {
//       cthulhuDeckHard();
//     }
//     if( e.target.classList.contains('level_very-hard')) {
//       cthulhuDeckVeryHard();
//     }
//   })

//   console.log(deck);
//   openDeck();

  //вставить для сотальных богов по аналогиии

//open stack of cards onclick
// funcction.openDeck() {
//   front.innerHTML = '';
//   if (back.classList.contains(empty)) {
//     back.classList.remove(empty);
//   }
//   cards.forEach(card => {card.style.opacity = '1'; card.style.visibility = 'visible'});

//   back.addEventListner('click', () => {
//     if(deck.length > 0) {
//       showNewCard();
//     }
//     if (deck.length === 0) {
//       back.classList.add('empty');
//       cards.forEach(card => {card.style.opacity = '0'; card.style.visibility = 'hidden'});
//     }
//   })
// }

// function showNewCard() {
//   let currentCard = deck.pop();
//   const img = new Image();
//   front.append(img);
//   img.classList.add('deck-card');
//   console.log(currentCard);
//   img.src = currentCard.cardFace;
// }
======================Пример кода 1====================================*/


