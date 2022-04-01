'use strict';

// Generate Random Number
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

const bgColor = function (bgcolor) {
  document.querySelector('body').style.backgroundColor = bgcolor;
};

const numWidth = function (numWidth) {
  document.querySelector('.number').style.width = numWidth;
};

const numValue = function (numVal) {
  document.querySelector('.number').textContent = numVal;
};

const highScoreValue = function (highScoreVal) {
  document.querySelector('.highscore').textContent = highScoreVal;
};

const scoreValue = function (scoreVal) {
  document.querySelector('.score').textContent = scoreVal;
};

const guessValue = function (guessVal) {
  document.querySelector('.guess').value = guessVal;
};

const guessBorderColor = function (borderColor) {
  document.querySelector('.guess').style.border = borderColor;
};

const titleMessage = function (gsnitch) {
  document.querySelector('.title').textContent = gsnitch;
};

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnOpenModal = document.querySelector('.help-button');
const btnCheck = document.querySelector('.check');

btnOpenModal.addEventListener('click', function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
});

const closemodal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnCloseModal.addEventListener('click', closemodal);
overlay.addEventListener('click', closemodal);

btnCheck.addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  // When Player Clicks on Check buttom without providing Number
  if (!guess) {
    displayMessage('⛔️ Enter Number!!');

    // When Player Enters Out of Range Number
  } else if (guess > 20 || guess < 0) {
    displayMessage('🤔 Not a Valid Number');
    guessBorderColor('4px solid #CD5C5C');

    // When Player Wins the Game
  } else if (guess === secretNumber) {
    guessBorderColor('4px solid #eee');
    displayMessage('🍷 Correct Number!!');
    bgColor('#3CB371');
    numWidth('30rem');
    numValue(guess);
    if (score >= highScore) {
      highScore = score;
      highScoreValue(score);
      if (highScore === 20) {
        bgColor('#B68D40');
        numValue('🌟');
        titleMessage("That's a Golden Snitch!!");
      }
    } else {
      highScoreValue(highScore);
      if (highScore === 20) {
        bgColor('#B68D40');
        numValue('🌟');
        titleMessage("That's a Golden Snitch!!");
      }
    }

    // When Guess is not a Secret Number:
  } else if (guess !== secretNumber) {
    guessBorderColor('4px solid #eee');
    if (score > 1) {
      displayMessage(guess > secretNumber ? '⏫ Too High!!' : '⏬ Too Low!!');
      score--;
      scoreValue(score);
    } else {
      displayMessage('😤 You Lost!!');
      scoreValue(0);
      bgColor('#CD5C5C');
      numValue('😐');
    }
  }
});

document.querySelector('.again').addEventListener('click', function () {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;

  titleMessage('Guess My Number!');
  numValue('?');
  bgColor('#222');
  displayMessage('Start guessing...');
  guessValue('');
  scoreValue(score);
  numWidth('15rem');
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closemodal();
  }
});
