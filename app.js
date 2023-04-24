const cardsArray = [
  {
    name: 'pikachu',
    img: 'images/pikachu.png',
  },
  {
    name: 'bulbasaur',
    img: 'images/bulbasaur.png',
  },
  {
    name: 'charmander',
    img: 'images/charmander.png',
  },
  {
    name: 'squirtle',
    img: 'images/squirtle.png',
  },
  {
    name: 'eevee',
    img: 'images/eevee.png',
  },
  {
    name: 'jigglypuff',
    img: 'images/jigglypuff.png',
  },
];

let cardsChosen = [];
let cardsChosenId = [];
let cardsWon = [];
let moves = 0;

function createBoard() {
  const container = document.querySelector('.container');
  cardsArray.sort(() => 0.5 - Math.random());
  for (let i = 0; i < cardsArray.length; i++) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-id', i);
    card.style.backgroundImage = `url(${cardsArray[i].img})`;
    card.addEventListener('click', flipCard);
    container.appendChild(card);
  }
}

function flipCard() {
  const cardId = this.getAttribute('data-id');
  this.classList.add('selected');
  cardsChosen.push(cardsArray[cardId].name);
  cardsChosenId.push(cardId);
  if (cardsChosen.length === 2) {
    moves++;
    document.querySelector('#moves').textContent = moves;
    setTimeout(checkForMatch, 500);
  }
}

function checkForMatch() {
  const cards = document.querySelectorAll('.card');
  const firstCardId = cardsChosenId[0];
  const secondCardId = cardsChosenId[1];
  if (cardsChosen[0] === cardsChosen[1]) {
    cards[firstCardId].classList.add('matched');
    cards[secondCardId].classList.add('matched');
    cardsWon.push(cardsChosen);
  } else {
    cards[firstCardId].classList.remove('selected');
    cards[secondCardId].classList.remove('selected');
  }
  cardsChosen = [];
  cardsChosenId = [];
  if (cardsWon.length === cardsArray.length / 2) {
    endGame();
  }
}

function endGame() {
  const container = document.querySelector('.container');
  const message = document.createElement('p');
  message.textContent = `You won in ${moves} moves!`;
  container.appendChild(message);
  const previousScore = JSON.parse(localStorage.getItem('memoryGameHighScore'));
  if (!previousScore || moves < previousScore) {
    localStorage.setItem('memoryGameHighScore', JSON.stringify(moves));
    const highScoreMessage = document.createElement('p');
    highScoreMessage.textContent = 'New high score!';
    container.appendChild(highScoreMessage);
  }
}

document.addEventListener('DOMContentLoaded', createBoard);
