'use strict';

// Selecting elements
const player0El = document.getElementById('player--0');
const player1El = document.getElementById('player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.getElementById('dice');
const btnNew = document.getElementById('btn--new');
const btnRoll = document.getElementById('btn--roll');
const btnHold = document.getElementById('btn--hold');

let scores, currentScore, activePlayer, playing, dice;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');

  player0El.classList.remove('player--win');
  player1El.classList.remove('player--win');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

// Switch Player function
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  diceEl.classList.add('hidden');
};
//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.Generate a random dice roll
    dice = Math.trunc(Math.random() * 6) + 1;

    //2.Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `./images/dice-${dice}.png`;
  }

  //check for dice == 1
  if (dice !== 1) {
    //Add dice to current score
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    //switch player
    switchPlayer();
  }
});

//holding Feature

btnHold.addEventListener('click', function () {
  if (playing) {
    //1.Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. check if player's score is >=100
    if (scores[activePlayer] >= 100) {
      //Finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //switch player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
