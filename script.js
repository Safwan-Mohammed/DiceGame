'use strict';

let currentPlayer = 1;
let currentScore = 0;
let diceValue = 0;

const left = document.getElementsByClassName('left_section')[0];
const right = document.getElementsByClassName('right_section')[0];
const left_highscore = left.getElementsByClassName('high_score')[0];
const right_highscore = right.getElementsByClassName('high_score')[0];
const left_current = left.getElementsByClassName('current_score')[0];
const right_current = right.getElementsByClassName('current_score')[0];

const image = document.getElementById('dice');
const newGame = document.getElementById('new_game');
const roll = document.getElementById('roll');
const hold = document.getElementById('hold');

const popup = document.getElementsByClassName('popup')[0];
const text = popup.getElementsByClassName('text')[0];
const overlay = document.getElementsByClassName('overlay')[0];
const btn = document.getElementById('btn');

// Used at line 55, 67 and 99
function makeLeftActive(){
    right.classList.remove('active');
    left.classList.add('active');
}

// Used at line 46 99
function makeRightActive(){
    left.classList.remove('active');
    right.classList.add('active');
}

// Used at line 45, 54 and 99
function updatePlayer(type)
{
    let highScoreElement = type === 'left' ? left_highscore : right_highscore;
    let highScore = highScoreElement.innerHTML; 
    highScoreElement.innerHTML = currentScore + Number(highScore);
}

// Used at line 113
function updatePlayerOne(type)
{
    updatePlayer(type);
    makeRightActive();
    currentPlayer = 2;
    currentScore = 0;
    left_current.innerHTML = 0
}

// Used at line 113
function updatePlayerTwo(type)
{
    updatePlayer(type);
    makeLeftActive();
    currentPlayer = 1;
    currentScore = 0;
    right_current.innerHTML = 0
}

// Used at line 110
function generateRandom(){
    return Math.trunc(Math.random()*6) + 1;
}

// Used at line 95, 128
function resetToDefault(){
    if(!left.classList.contains('active')){
        makeLeftActive();
    }
    left_current.textContent = 0;
    right_current.textContent = 0;
    image.src = "";
    left_highscore.innerHTML = 0;
    right_highscore.innerHTML = 0;
    currentPlayer = 1;
    currentScore = 0;
}

// Used at 101
function checkWinner(){
    let highScore = Number(currentPlayer === 1 ? left_highscore.innerHTML : right_highscore.innerHTML) ; 
    if(highScore >= 20)
    {
        popup.classList.remove('hidden');
        text.innerHTML = `Player ${currentPlayer} is the Winner! 🥳🥳`;
        overlay.classList.remove('hidden');
        return false;
    }
    return true;
}

newGame.addEventListener('click', () => {
    resetToDefault();
});

hold.addEventListener('click', () => {
    currentPlayer === 1 ? updatePlayer("left") : updatePlayer("right");
    if(checkWinner())
    {
        image.src = "";
        currentPlayer === 1 ? makeRightActive() : makeLeftActive();
        currentPlayer === 1 ? left_current.innerHTML = 0 : right_current.innerHTML = 0;
        currentPlayer === 1 ? currentPlayer = 2 : currentPlayer = 1;
        currentScore = 0;
    }
});

roll.addEventListener('click', () => {
    diceValue = generateRandom();
    image.src = `dice-${diceValue}.png`;
    if(diceValue === 1)
    {
        currentScore = 0;
        currentPlayer === 1 ? updatePlayerOne("left") : updatePlayerTwo("right");
    }
    else
    {
        currentScore += diceValue;
        currentPlayer === 1 ? left_current.innerHTML = currentScore : right_current.innerHTML = currentScore;
    }
});

btn.addEventListener('click', () => {
    popup.classList.add('hidden');
    overlay.classList.add('hidden');
    resetToDefault();
});