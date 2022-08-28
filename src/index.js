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

const help = document.querySelector('h2');
const cardsContainer = document.querySelector('.cards__container');
const levelBtnContainer  = document.querySelector('.level-btn__container');
const shaffleBtn = document.querySelector('.shaffle-btn');

//переназвать переменные
const indicateFirstStageGreen = document.querySelector('.circle_green-1'),
    indicateFirstStageBrown = document.querySelector('.circle_brown-1'),
		indicateFirstStageBlue = document.querySelector('.circle_blue-1'),
		indicateSecondStageGreen = document.querySelector('.circle_green-2'),
    indicateSecondStageBrown = document.querySelector('.circle_brown-2'),
		indicateSecondStageBlue = document.querySelector('.circle_blue-2'),
		indicateThirdStageGreen = document.querySelector('.circle_green-3'),
    indicateThirdStageBrown = document.querySelector('.circle_brown-3'),
		indicateThirdStageBlue = document.querySelector('.circle_blue-3');

const stageContainer = document.querySelector('.stage__container');
const deckBack = document.querySelector('.card__back');
const deckFront = document.querySelector('.card__face');



let selectedCard;
let selectedLevel;
let selectedAncientData;

//переназвать переменные
let levelBlueArray = [],
    levelBrownArray = [],
	 levelGreenArray = [];

let normalCardsGreen = [],
    normalCardsBrown = [],
	 normalCardsBlue = [];

let firstStage = [],
    secondStage = [],
	 thirdStage = [];

let firstStageRandom = [],
    secondStageRandom = [],
	 thirdStageRandom = [];


//=====SELECT CARD=====
function activeCard(item) {
  if (selectedCard) { // убрать существующую подсветку, если есть
    selectedCard.classList.remove('active');
  }
  selectedCard = item;
  selectedCard.classList.add('active'); // подсветить новую карту
}

cardsContainer.addEventListener('click', (e) => {
  //делаем кноки уровней слоежности видимыми
  levelBtnContainer.classList.remove('hidden');

  //выделяем стилями
  let card = e.target.closest('.card');
  if (!card) return;
  activeCard(card);

  //select card = array of data
  for (let i = 0; i < ancientsData.length; i++) {
    if (ancientsData[i].name === selectedCard.id) {
      selectedAncientData = ancientsData[i];
    }
  }
  help.textContent = 'Выберите уровень сложности';
})

//=====SELECT LEVEL OF DIFFICULTIES=====
function activeLevel(item) {
  if (selectedLevel) { // убрать существующую подсветку, если есть
    selectedLevel.classList.remove('active');
  } selectedLevel = item;
  selectedLevel.classList.add('active'); // подсветить новую карту
}

levelBtnContainer.addEventListener('click', e => {
  shaffleBtn.classList.remove('hidden');

  let level = e.target.closest('.level-btn');
  if (!level) return;
  activeLevel(level);

		takeLevelCards(blueCards, levelBlueArray, normalCardsBlue)
		takeLevelCards(brownCards, levelBrownArray, normalCardsBrown)
		takeLevelCards(greenCards, levelGreenArray, normalCardsGreen)
		
		levelBlueArray = levelBlueArray.map(item => 'blue-' + item)
		levelBrownArray = levelBrownArray.map(item => 'brown-' + item)
		levelGreenArray = levelGreenArray.map(item => 'green-' + item)
		takeCardsStages()

    help.textContent = 'Замешайте колоду, нажав на кнопку';

		// if (!cardsContainer.classList.contains('choised-game')){
		// 	cardsContainer.classList.add('choised-game')
		// }
		// if (!levelBtnContainerWrapper.classList.contains('choised-game')){
		// 	levelBtnContainerWrapper.classList.add('choised-game');
		// }
		

})

shaffleBtn.addEventListener('click', ()=>{
	indicateFirstStageGreen.textContent = selectedAncientData.firstStage.greenCards;
	indicateFirstStageBrown.textContent = selectedAncientData.firstStage.brownCards;
	indicateFirstStageBlue.textContent = selectedAncientData.firstStage.blueCards;
	indicateSecondStageGreen.textContent = selectedAncientData.secondStage.greenCards;
  indicateSecondStageBrown.textContent = selectedAncientData.secondStage.brownCards;
	indicateSecondStageBlue.textContent = selectedAncientData.secondStage.blueCards;
	indicateThirdStageGreen.textContent = selectedAncientData.thirdStage.greenCards;
  indicateThirdStageBrown.textContent = selectedAncientData.thirdStage.brownCards;
	indicateThirdStageBlue.textContent = selectedAncientData.thirdStage.blueCards;
	
	stageCardRandom();

	stageContainer.classList.remove('hidden');
	// if (!buttonCards.classList.contains('choised-game')){
	// 	buttonCards.classList.add('choised-game');
	// }

  help.textContent = 'Откройте колоду, нажав на рубашку карты';
})

function stageCardRandom(){
	const firstStageLength = firstStage.length;
	const secondStageLength = secondStage.length;
	const thirdStageLength = thirdStage.length;

	for(let i = 0; i < firstStageLength; i++){
		let indexChoisedCard = Math.floor(Math.random() * (firstStage.length - 1))
		firstStageRandom.push(firstStage[indexChoisedCard])
		firstStage.splice(indexChoisedCard,1)
	}
	for(let i = 0; i < secondStageLength; i++){
		let indexChoisedCard = Math.floor(Math.random() * (secondStage.length - 1))
		secondStageRandom.push(secondStage[indexChoisedCard])
		secondStage.splice(indexChoisedCard,1)
	}
	for(let i = 0; i < thirdStageLength; i++){
		let indexChoisedCard = Math.floor(Math.random() * (thirdStage.length - 1))
		thirdStageRandom.push(thirdStage[indexChoisedCard])
		thirdStage.splice(indexChoisedCard,1)
	}

	console.log(firstStageRandom)
	console.log(secondStageRandom)
	console.log(thirdStageRandom)
}

deckBack.addEventListener('click', () =>{
	showFaceCard();
})

function showFaceCard(){
	if(firstStageRandom.length){
		let showCard = firstStageRandom[firstStageRandom.length - 1];
		if (showCard.indexOf('green') > -1){
			deckFront.style.background = `url(assets/MythicCards/green/${showCard}.jpg) center/cover no-repeat`;
		   firstStageRandom.pop()
			indicateFirstStageGreen.textContent = +indicateFirstStageGreen.textContent - 1;
		}
		if (showCard.indexOf('blue') > -1){
			deckFront.style.background = `url(assets/MythicCards/blue/${showCard}.jpg) center/cover no-repeat`;
		   firstStageRandom.pop()
			indicateFirstStageBlue.textContent = +indicateFirstStageBlue.textContent - 1;
		}
		if (showCard.indexOf('brown') > -1){
			deckFront.style.background = `url(assets/MythicCards/brown/${showCard}.jpg) center/cover no-repeat`;
		   firstStageRandom.pop()
			indicateFirstStageBrown.textContent = +indicateFirstStageBrown.textContent - 1;
		}
	} else if (secondStageRandom.length){
		let showCard = secondStageRandom[secondStageRandom.length - 1];
		if (showCard.indexOf('green') > -1){
			deckFront.style.background = `url(assets/MythicCards/green/${showCard}.jpg) center/cover no-repeat`;
		   secondStageRandom.pop()
			indicateSecondStageGreen.textContent = +indicateSecondStageGreen.textContent - 1;
		}
		if (showCard.indexOf('blue') > -1){
			deckFront.style.background = `url(assets/MythicCards/blue/${showCard}.jpg) center/cover no-repeat`;
		   secondStageRandom.pop()
			indicateSecondStageBlue.textContent = +indicateSecondStageBlue.textContent - 1;
		}
		if (showCard.indexOf('brown') > -1){
			deckFront.style.background = `url(assets/MythicCards/brown/${showCard}.jpg) center/cover no-repeat`;
		   secondStageRandom.pop()
			indicateSecondStageBrown.textContent = +indicateSecondStageBrown.textContent - 1;
		}
	} else if (thirdStageRandom.length){
		let showCard = thirdStageRandom[thirdStageRandom.length - 1];
		if (showCard.indexOf('green') > -1){
			deckFront.style.background = `url(assets/MythicCards/green/${showCard}.jpg) center/cover no-repeat`;
		   thirdStageRandom.pop()
			indicateThirdStageGreen.textContent = +indicateThirdStageGreen.textContent - 1;
		}
		if (showCard.indexOf('blue') > -1){
			deckFront.style.background = `url(assets/MythicCards/blue/${showCard}.jpg) center/cover no-repeat`;
		   thirdStageRandom.pop()
			indicateThirdStageBlue.textContent = +indicateThirdStageBlue.textContent - 1;
		}
		if (showCard.indexOf('brown') > -1){
			deckFront.style.background = `url(assets/MythicCards/brown/${showCard}.jpg) center/cover no-repeat`;
		   thirdStageRandom.pop()
			indicateThirdStageBrown.textContent = +indicateThirdStageBrown.textContent - 1;
		}
		if (thirdStageRandom.length === 0){
			cardBack.style.background = 'none';
			regameWrap.classList.remove('hide');
		}
	} 
}

//переделать функцию
function takeLevelCards(color, arr, normalArr){
	if (arr.length !== 0){
		while (arr.length > 0){
			arr.pop()
		}
	}
	for( let i = 0; i < color.length; i++){
		if(selectedLevel === 'very-easy'){
			if(color[i].difficulty === 'easy'){
				arr.push(i + 1)
			}
			if(color[i].difficulty === 'normal'){
				normalArr.push(i + 1)
			}
		}
		if(selectedLevel === 'easy'){
			if(color[i].difficulty !== 'hard'){
				arr.push(i + 1)
			}
		}
		if(selectedLevel === 'normal'){
			arr.push(i + 1)
		}
		if(selectedLevel === 'hard'){
			if(color[i].difficulty !== 'easy'){
				arr.push(i + 1)
			}
		}
		if(selectedLevel === 'very-hard'){
			if(color[i].difficulty === 'hard'){
				arr.push(i + 1)
			}
			if(color[i].difficulty === 'normal'){
				normalArr.push(i + 1)
			}
		}
	}
}

//переделать функцию
function takeCardsStages(){
	const summGreenCards = selectedAncientData.firstStage.greenCards + selectedAncientData.secondStage.greenCards + selectedAncientData.thirdStage.greenCards;
	const summBrownCards = selectedAncientData.firstStage.brownCards + selectedAncientData.secondStage.brownCards + selectedAncientData.thirdStage.brownCards;
	const summBlueCards = selectedAncientData.firstStage.blueCards + selectedAncientData.secondStage.blueCards + selectedAncientData.thirdStage.blueCards;

	if (levelGreenArray.length < summGreenCards){
		const levelGreenArrayLength = levelGreenArray.length;
		for (let i = 0; i < summGreenCards - levelGreenArrayLength; i++){
			let indexChoisedCard = Math.floor(Math.random() * (normalCardsGreen.length - 1))
			levelGreenArray.push('green-' + normalCardsGreen[indexChoisedCard])
			normalCardsGreen.splice(indexChoisedCard,1)
		}
	}
	if (levelBrownArray.length < summBrownCards){
		const levelBrownArrayLength = levelBrownArray.length;
		for (let i = 0; i < summBrownCards - levelBrownArrayLength; i++){
			let indexChoisedCard = Math.floor(Math.random() * (normalCardsBrown.length - 1))
			levelBrownArray.push('brown-' + normalCardsBrown[indexChoisedCard])
			normalCardsBrown.splice(indexChoisedCard,1)
		}
	}
	if (levelBlueArray.length < summBlueCards){
		const levelBlueArrayLength = levelBlueArray.length;
		for (let i = 0; i < summBlueCards - levelBlueArrayLength; i++){
			let indexChoisedCard = Math.floor(Math.random() * (normalCardsBlue.length - 1))
			levelBlueArray.push('blue-' + normalCardsBlue[indexChoisedCard])
			normalCardsBlue.splice(indexChoisedCard,1)
		}
	}

	for(let i = 0; i < selectedAncientData.firstStage.greenCards; i++){
		let indexChoisedCard = Math.floor(Math.random() * (levelGreenArray.length - 1))
		firstStage.push(levelGreenArray[indexChoisedCard])
		levelGreenArray.splice(indexChoisedCard,1)
	}
	for(let i = 0; i < selectedAncientData.firstStage.blueCards; i++){
		let indexChoisedCard = Math.floor(Math.random() * (levelBlueArray.length - 1))
		firstStage.push(levelBlueArray[indexChoisedCard])
		levelBlueArray.splice(indexChoisedCard,1)
	}
	for(let i = 0; i < selectedAncientData.firstStage.brownCards; i++){
		let indexChoisedCard = Math.floor(Math.random() * (levelBrownArray.length - 1))
		firstStage.push(levelBrownArray[indexChoisedCard])
		levelBrownArray.splice(indexChoisedCard,1)
	}

	for(let i = 0; i < selectedAncientData.secondStage.greenCards; i++){
		let indexChoisedCard = Math.floor(Math.random() * (levelGreenArray.length - 1))
		secondStage.push(levelGreenArray[indexChoisedCard])
		levelGreenArray.splice(indexChoisedCard,1)
	}
	for(let i = 0; i < selectedAncientData.secondStage.blueCards; i++){
		let indexChoisedCard = Math.floor(Math.random() * (levelBlueArray.length - 1))
		secondStage.push(levelBlueArray[indexChoisedCard])
		levelBlueArray.splice(indexChoisedCard,1)
	}
	for(let i = 0; i < selectedAncientData.secondStage.brownCards; i++){
		let indexChoisedCard = Math.floor(Math.random() * (levelBrownArray.length - 1))
		secondStage.push(levelBrownArray[indexChoisedCard])
		levelBrownArray.splice(indexChoisedCard,1)
	}

	for(let i = 0; i < selectedAncientData.thirdStage.greenCards; i++){
		let indexChoisedCard = Math.floor(Math.random() * (levelGreenArray.length - 1))
		thirdStage.push(levelGreenArray[indexChoisedCard])
		levelGreenArray.splice(indexChoisedCard,1)
	}
	for(let i = 0; i < selectedAncientData.thirdStage.blueCards; i++){
		let indexChoisedCard = Math.floor(Math.random() * (levelBlueArray.length - 1))
		thirdStage.push(levelBlueArray[indexChoisedCard])
		levelBlueArray.splice(indexChoisedCard,1)
	}
	for(let i = 0; i < selectedAncientData.thirdStage.brownCards; i++){
		let indexChoisedCard = Math.floor(Math.random() * (levelBrownArray.length - 1))
		thirdStage.push(levelBrownArray[indexChoisedCard])
		levelBrownArray.splice(indexChoisedCard,1)
	}
}

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
// 		// levelBtnContainerWrapper.classList.remove('hide');
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
//   img.src = currentCard.deckFront;
// }
======================Пример кода 1====================================*/


