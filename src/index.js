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
const countFirstStageGreen = document.querySelector('.count_green-1');
const countFirstStageBrown = document.querySelector('.count_brown-1');
const countFirstStageBlue = document.querySelector('.count_blue-1');
const countSecondStageGreen = document.querySelector('.count_green-2');
const countSecondStageBrown = document.querySelector('.count_brown-2');
const countSecondStageBlue = document.querySelector('.count_blue-2');
const countThirdStageGreen = document.querySelector('.count_green-3');
const countThirdStageBrown = document.querySelector('.count_brown-3');
const countThirdStageBlue = document.querySelector('.count_blue-3');

const stageContainer = document.querySelector('.stage__container');
const deckBack = document.querySelector('.card__back');
const deckFront = document.querySelector('.card__face');

let selectedCard;
let selectedLevel;
let selectedAncientData;

//переназвать переменные
let levelBlueArray = [];
let levelBrownArray = [];
let levelGreenArray = [];

let normalCardsGreen = [];
let normalCardsBrown = [];
let normalCardsBlue = [];

let firstStage = [];
let secondStage = [];
let thirdStage = [];

let firstStageRandom = [];
let secondStageRandom = [];
let thirdStageRandom = [];


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

//переделать функцию
function getLevelCards(color, arr, normalArr){
	if (arr.length !== 0){
		while (arr.length > 0){
			arr.pop()
		}
	}
	for( let i = 0; i < color.length; i++){
		if(selectedLevel === 'very-easy'){
			if(color[i].difficulty === 'easy'){
				console.log(color[0].difficulty);
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

levelBtnContainer.addEventListener('click', (e) => {
  shaffleBtn.classList.remove('hidden');

  let level = e.target.closest('.level-btn');
  if (!level) return;
  activeLevel(level);

		getLevelCards(blueCards, levelBlueArray, normalCardsBlue)
		getLevelCards(brownCards, levelBrownArray, normalCardsBrown)
		getLevelCards(greenCards, levelGreenArray, normalCardsGreen)
		
		levelBlueArray = levelBlueArray.map(item => 'blue-' + item)
		levelBrownArray = levelBrownArray.map(item => 'brown-' + item)
		levelGreenArray = levelGreenArray.map(item => 'green-' + item)
		getCardsStages()

    help.textContent = 'Замешайте колоду, нажав на кнопку';
})

function stageCardRandom(){
	const firstStageLength = firstStage.length;
	const secondStageLength = secondStage.length;
	const thirdStageLength = thirdStage.length;

	for(let i = 0; i < firstStageLength; i++){
		let indexSelectedCard = Math.floor(Math.random() * (firstStage.length - 1))
		firstStageRandom.push(firstStage[indexSelectedCard])
		firstStage.splice(indexSelectedCard,1)
	}
	for(let i = 0; i < secondStageLength; i++){
		let indexSelectedCard = Math.floor(Math.random() * (secondStage.length - 1))
		secondStageRandom.push(secondStage[indexSelectedCard])
		secondStage.splice(indexSelectedCard,1)
	}
	for(let i = 0; i < thirdStageLength; i++){
		let indexSelectedCard = Math.floor(Math.random() * (thirdStage.length - 1))
		thirdStageRandom.push(thirdStage[indexSelectedCard])
		thirdStage.splice(indexSelectedCard,1)
	}

	console.log(firstStageRandom)
	console.log(secondStageRandom)
	console.log(thirdStageRandom)
}


shaffleBtn.addEventListener('click', ()=>{
	//numbers for count from ancients.js 
	countFirstStageGreen.textContent = selectedAncientData.firstStage.greenCards;
	countFirstStageBrown.textContent = selectedAncientData.firstStage.brownCards;
	countFirstStageBlue.textContent = selectedAncientData.firstStage.blueCards;
	countSecondStageGreen.textContent = selectedAncientData.secondStage.greenCards;
  countSecondStageBrown.textContent = selectedAncientData.secondStage.brownCards;
	countSecondStageBlue.textContent = selectedAncientData.secondStage.blueCards;
	countThirdStageGreen.textContent = selectedAncientData.thirdStage.greenCards;
  countThirdStageBrown.textContent = selectedAncientData.thirdStage.brownCards;
	countThirdStageBlue.textContent = selectedAncientData.thirdStage.blueCards;
	
	stageCardRandom();

	stageContainer.classList.remove('hidden');

  help.textContent = 'Откройте колоду, нажав на рубашку карты';
})


deckBack.addEventListener('click', () =>{
	showFaceCard();
})

// function showFaceCard(){
// 	if(firstStageRandom.length){
// 		let showCard = firstStageRandom[firstStageRandom.length - 1];
// 		if (showCard.indexOf('green') > -1){
// 			deckFront.style.background = `url(assets/MythicCards/green/${showCard}.jpg) center/cover no-repeat`;
// 		    firstStageRandom.pop()
// 			countFirstStageGreen.textContent = +countFirstStageGreen.textContent - 1;
// 		}
// 		if (showCard.indexOf('blue') > -1){
// 			deckFront.style.background = `url(assets/MythicCards/blue/${showCard}.jpg) center/cover no-repeat`;
// 		    firstStageRandom.pop()
// 			countFirstStageBlue.textContent = +countFirstStageBlue.textContent - 1;
// 		}
// 		if (showCard.indexOf('brown') > -1){
// 			deckFront.style.background = `url(assets/MythicCards/brown/${showCard}.jpg) center/cover no-repeat`;
// 		    firstStageRandom.pop()
// 			countFirstStageBrown.textContent = +countFirstStageBrown.textContent - 1;
// 		}
// 	} else if (secondStageRandom.length){
// 		let showCard = secondStageRandom[secondStageRandom.length - 1];
// 		if (showCard.indexOf('green') > -1){
// 			deckFront.style.background = `url(assets/MythicCards/green/${showCard}.jpg) center/cover no-repeat`;
// 		    secondStageRandom.pop()
// 			countSecondStageGreen.textContent = +countSecondStageGreen.textContent - 1;
// 		}
// 		if (showCard.indexOf('blue') > -1){
// 			deckFront.style.background = `url(assets/MythicCards/blue/${showCard}.jpg) center/cover no-repeat`;
// 		    secondStageRandom.pop()
// 			countSecondStageBlue.textContent = +countSecondStageBlue.textContent - 1;
// 		}
// 		if (showCard.indexOf('brown') > -1){
// 			deckFront.style.background = `url(assets/MythicCards/brown/${showCard}.jpg) center/cover no-repeat`;
// 		    secondStageRandom.pop()
// 			countSecondStageBrown.textContent = +countSecondStageBrown.textContent - 1;
// 		}
// 	} else if (thirdStageRandom.length){
// 		let showCard = thirdStageRandom[thirdStageRandom.length - 1];
// 		if (showCard.indexOf('green') > -1){
// 			deckFront.style.background = `url(assets/MythicCards/green/${showCard}.jpg) center/cover no-repeat`;
// 		    thirdStageRandom.pop()
// 			countThirdStageGreen.textContent = +countThirdStageGreen.textContent - 1;
// 		}
// 		if (showCard.indexOf('blue') > -1){
// 			deckFront.style.background = `url(assets/MythicCards/blue/${showCard}.jpg) center/cover no-repeat`;
// 		    thirdStageRandom.pop()
// 			countThirdStageBlue.textContent = +countThirdStageBlue.textContent - 1;
// 		}
// 		if (showCard.indexOf('brown') > -1){
// 			deckFront.style.background = `url(assets/MythicCards/brown/${showCard}.jpg) center/cover no-repeat`;
// 		    thirdStageRandom.pop()
// 			countThirdStageBrown.textContent = +countThirdStageBrown.textContent - 1;
// 		}
// 		if (thirdStageRandom.length === 0){
// 			cardBack.style.background = 'none';
// 			regameWrap.classList.remove('hide');
// 		}
// 	} 
// }


//переделать функцию
// function getCardsStages(){
// 	const summGreenCards = selectedAncientData.firstStage.greenCards + selectedAncientData.secondStage.greenCards + selectedAncientData.thirdStage.greenCards;
// 	const summBrownCards = selectedAncientData.firstStage.brownCards + selectedAncientData.secondStage.brownCards + selectedAncientData.thirdStage.brownCards;
// 	const summBlueCards = selectedAncientData.firstStage.blueCards + selectedAncientData.secondStage.blueCards + selectedAncientData.thirdStage.blueCards;

// 	if (levelGreenArray.length < summGreenCards){
// 		const levelGreenArrayLength = levelGreenArray.length;
// 		for (let i = 0; i < summGreenCards - levelGreenArrayLength; i++){
// 			let indexSelectedCard = Math.floor(Math.random() * (normalCardsGreen.length - 1))
// 			levelGreenArray.push('green-' + normalCardsGreen[indexSelectedCard])
// 			normalCardsGreen.splice(indexSelectedCard,1)
// 		}
// 	}
// 	if (levelBrownArray.length < summBrownCards){
// 		const levelBrownArrayLength = levelBrownArray.length;
// 		for (let i = 0; i < summBrownCards - levelBrownArrayLength; i++){
// 			let indexSelectedCard = Math.floor(Math.random() * (normalCardsBrown.length - 1))
// 			levelBrownArray.push('brown-' + normalCardsBrown[indexSelectedCard])
// 			normalCardsBrown.splice(indexSelectedCard,1)
// 		}
// 	}
// 	if (levelBlueArray.length < summBlueCards){
// 		const levelBlueArrayLength = levelBlueArray.length;
// 		for (let i = 0; i < summBlueCards - levelBlueArrayLength; i++){
// 			let indexSelectedCard = Math.floor(Math.random() * (normalCardsBlue.length - 1))
// 			levelBlueArray.push('blue-' + normalCardsBlue[indexSelectedCard])
// 			normalCardsBlue.splice(indexSelectedCard,1)
// 		}
// 	}

// 	for(let i = 0; i < selectedAncientData.firstStage.greenCards; i++){
// 		let indexSelectedCard = Math.floor(Math.random() * (levelGreenArray.length - 1))
// 		firstStage.push(levelGreenArray[indexSelectedCard])
// 		levelGreenArray.splice(indexSelectedCard,1)
// 	}
// 	for(let i = 0; i < selectedAncientData.firstStage.blueCards; i++){
// 		let indexSelectedCard = Math.floor(Math.random() * (levelBlueArray.length - 1))
// 		firstStage.push(levelBlueArray[indexSelectedCard])
// 		levelBlueArray.splice(indexSelectedCard,1)
// 	}
// 	for(let i = 0; i < selectedAncientData.firstStage.brownCards; i++){
// 		let indexSelectedCard = Math.floor(Math.random() * (levelBrownArray.length - 1))
// 		firstStage.push(levelBrownArray[indexSelectedCard])
// 		levelBrownArray.splice(indexSelectedCard,1)
// 	}

// 	for(let i = 0; i < selectedAncientData.secondStage.greenCards; i++){
// 		let indexSelectedCard = Math.floor(Math.random() * (levelGreenArray.length - 1))
// 		secondStage.push(levelGreenArray[indexSelectedCard])
// 		levelGreenArray.splice(indexSelectedCard,1)
// 	}
// 	for(let i = 0; i < selectedAncientData.secondStage.blueCards; i++){
// 		let indexSelectedCard = Math.floor(Math.random() * (levelBlueArray.length - 1))
// 		secondStage.push(levelBlueArray[indexSelectedCard])
// 		levelBlueArray.splice(indexSelectedCard,1)
// 	}
// 	for(let i = 0; i < selectedAncientData.secondStage.brownCards; i++){
// 		let indexSelectedCard = Math.floor(Math.random() * (levelBrownArray.length - 1))
// 		secondStage.push(levelBrownArray[indexSelectedCard])
// 		levelBrownArray.splice(indexSelectedCard,1)
// 	}

// 	for(let i = 0; i < selectedAncientData.thirdStage.greenCards; i++){
// 		let indexSelectedCard = Math.floor(Math.random() * (levelGreenArray.length - 1))
// 		thirdStage.push(levelGreenArray[indexSelectedCard])
// 		levelGreenArray.splice(indexSelectedCard,1)
// 	}
// 	for(let i = 0; i < selectedAncientData.thirdStage.blueCards; i++){
// 		let indexSelectedCard = Math.floor(Math.random() * (levelBlueArray.length - 1))
// 		thirdStage.push(levelBlueArray[indexSelectedCard])
// 		levelBlueArray.splice(indexSelectedCard,1)
// 	}
// 	for(let i = 0; i < selectedAncientData.thirdStage.brownCards; i++){
// 		let indexSelectedCard = Math.floor(Math.random() * (levelBrownArray.length - 1))
// 		thirdStage.push(levelBrownArray[indexSelectedCard])
// 		levelBrownArray.splice(indexSelectedCard,1)
// 	}
// }



