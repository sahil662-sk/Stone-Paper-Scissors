let playerScore = 0;
let botScore = 0;

const choices = {
  stone: { name: 'Stone', icon: '🪨' },
  paper: { name: 'Paper', icon: '📄' },
  scissors: { name: 'Scissors', icon: '✂️' }
};

const playerScoreEl = document.getElementById('player-score');
const botScoreEl = document.getElementById('bot-score');
const playerHandEl = document.getElementById('player-hand');
const botHandEl = document.getElementById('bot-hand');
const resultBoxEl = document.getElementById('result-box');
const resultMessageEl = document.getElementById('result-message');
const choiceButtons = document.querySelectorAll('.choice-btn');
const resetBtn = document.getElementById('reset-btn');

// Gobble elements
const leftGobble = document.getElementById('left-gobble');
const rightGobble = document.getElementById('right-gobble');
const playerBubble = document.getElementById('player-bubble');
const botBubble = document.getElementById('bot-bubble');

function getComputerChoice() {
  const keys = Object.keys(choices);
  return keys[Math.floor(Math.random() * keys.length)];
}

function getWinner(player, bot) {
  if (player === bot) return 'draw';
  if (
    (player === 'stone' && bot === 'scissors') ||
    (player === 'paper' && bot === 'stone') ||
    (player === 'scissors' && bot === 'paper')
  ) {
    return 'player';
  }
  return 'bot';
}

function playRound(playerChoice) {
  const botChoice = getComputerChoice();

  playerHandEl.textContent = choices[playerChoice].icon;
  botHandEl.textContent = choices[botChoice].icon;

  // Hand bounce
  playerHandEl.classList.add('pop');
  botHandEl.classList.add('pop');
  setTimeout(() => {
    playerHandEl.classList.remove('pop');
    botHandEl.classList.remove('pop');
  }, 200);

  // Winner calculation
  const outcome = getWinner(playerChoice, botChoice);
  resultBoxEl.className = 'result-box';

  if (outcome === 'player') {
    playerScore++;
    playerScoreEl.textContent = playerScore;
    resultBoxEl.classList.add('win');
    resultMessageEl.textContent = `Congrats !! Your ${choices[playerChoice].name} won!`;

    // Left gobble zoom-in celebration
    leftGobble.classList.add('pop-zoom');
    playerBubble.textContent = "Haha! Don't mess with  the O.G.! ";
    botBubble.textContent = "Offooo!";
    setTimeout(() => leftGobble.classList.remove('pop-zoom'), 500);

  } else if (outcome === 'bot') {
    botScore++;
    botScoreEl.textContent = botScore;
    resultBoxEl.classList.add('lose');
    resultMessageEl.textContent = `Computer's ${choices[botChoice].name} defeated you !`;

    // Right gobble zoom-in celebration
    rightGobble.classList.add('pop-zoom');
    botBubble.textContent = "Easy win! 😎🤖";
    playerBubble.textContent = "Will Bang On later! ";
    setTimeout(() => rightGobble.classList.remove('pop-zoom'), 500);

  } else {
    resultBoxEl.classList.add('draw');
    resultMessageEl.textContent = ` Draw ! Both of you chose  ${choices[playerChoice].name} !`;
    playerBubble.textContent = "Shittt!";
    botBubble.textContent = "Same move! ";
  }
}

function resetGame() {
  playerScore = 0;
  botScore = 0;
  playerScoreEl.textContent = '0';
  botScoreEl.textContent = '0';
  playerHandEl.textContent = '❔';
  botHandEl.textContent = '❔';
  resultBoxEl.className = 'result-box default';
  resultMessageEl.textContent = 'Pick Your First Move !';
  playerBubble.textContent = "Ready?";
  botBubble.textContent = "Bring it on!";
}

choiceButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    playRound(btn.getAttribute('data-choice'));
  });
});

resetBtn.addEventListener('click', resetGame);