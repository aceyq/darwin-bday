// ---- Game data ----
const levels = [
  {
    type: 'wordle',
    word: 'HAPPY',
    title: 'guess the word 💭',
    hint: 'like you make me 🥰',
    extraHint: 'hint: how do you make me feel? 💕'
  },
  {
    type: 'lock',
    word: 'BIRTHDAY',
    title: 'crack the code 🔐',
    hint: 'spin each dial to spell the magic word'
  },
  {
    type: 'key',
    word: 'BDAY',
    title: 'open the gift 🎁',
    hint: 'find the right key…',
    decoys: ['LOVE', 'HUGS', 'XOXO']
  }
];

let currentLevel = 0;
let wordleState = null;
let lockState = null;

// ---- Sparkles ----
function makeSparkles(containerId, count = 18) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const s = document.createElement('div');
    s.className = 'sparkle';
    s.style.left = Math.random() * 100 + 'vw';
    s.style.bottom = '-10px';
    s.style.animationDuration = (4 + Math.random() * 6) + 's';
    s.style.animationDelay = (Math.random() * 5) + 's';
    s.style.width = s.style.height = (4 + Math.random() * 6) + 'px';
    container.appendChild(s);
  }
}

// ---- Screen navigation ----
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ---- Start game ----
function startGame() {
  currentLevel = 0;
  loadLevel();
  showScreen('screen-game');
}

// ---- Load a level ----
function loadLevel() {
  const level = levels[currentLevel];

  document.getElementById('level-label').textContent = `level ${currentLevel + 1} of ${levels.length}`;
  document.getElementById('game-title').textContent = level.title;
  document.getElementById('hint-text').textContent = level.hint;
  document.getElementById('game-area').innerHTML = '';

  // Remove any lingering wordle keyboard listener
  document.removeEventListener('keydown', handleWordleKey);

  if (level.type === 'wordle') loadWordle(level);
  else if (level.type === 'lock')   loadLock(level);
  else if (level.type === 'key')    loadKey(level);
}

// ======== WORDLE ========
function loadWordle(level) {
  const { word } = level;
  const maxGuesses = 6;

  wordleState = {
    word,
    maxGuesses,
    currentRow: 0,
    currentCol: 0,
    guesses: Array.from({ length: maxGuesses }, () => Array(word.length).fill('')),
    done: false,
    wrongCount: 0
  };

  const area = document.getElementById('game-area');

  // Grid
  const grid = document.createElement('div');
  grid.className = 'wordle-grid';
  for (let r = 0; r < maxGuesses; r++) {
    const row = document.createElement('div');
    row.className = 'wordle-row';
    row.id = `wrow-${r}`;
    for (let c = 0; c < word.length; c++) {
      const cell = document.createElement('div');
      cell.className = 'wordle-cell';
      cell.id = `wcell-${r}-${c}`;
      row.appendChild(cell);
    }
    grid.appendChild(row);
  }
  area.appendChild(grid);

  // Virtual keyboard
  area.appendChild(buildWordleKeyboard());

  document.addEventListener('keydown', handleWordleKey);
}

function buildWordleKeyboard() {
  const rows = [
    ['Q','W','E','R','T','Y','U','I','O','P'],
    ['A','S','D','F','G','H','J','K','L'],
    ['ENTER','Z','X','C','V','B','N','M','⌫']
  ];
  const kb = document.createElement('div');
  kb.className = 'wordle-keyboard';
  rows.forEach(row => {
    const rowEl = document.createElement('div');
    rowEl.className = 'wordle-key-row';
    row.forEach(key => {
      const btn = document.createElement('button');
      btn.className = 'wkey' + (key === 'ENTER' || key === '⌫' ? ' wide' : '');
      btn.textContent = key;
      btn.dataset.wkey = key;
      btn.addEventListener('click', () => handleWordleInput(key));
      rowEl.appendChild(btn);
    });
    kb.appendChild(rowEl);
  });
  return kb;
}

function handleWordleKey(e) {
  if (e.key === 'Enter')          handleWordleInput('ENTER');
  else if (e.key === 'Backspace') handleWordleInput('⌫');
  else if (/^[a-zA-Z]$/.test(e.key)) handleWordleInput(e.key.toUpperCase());
}

function handleWordleInput(key) {
  const s = wordleState;
  if (!s || s.done) return;

  if (key === '⌫') {
    if (s.currentCol > 0) {
      s.currentCol--;
      s.guesses[s.currentRow][s.currentCol] = '';
      const cell = document.getElementById(`wcell-${s.currentRow}-${s.currentCol}`);
      cell.textContent = '';
      cell.classList.remove('filled');
    }
    return;
  }

  if (key === 'ENTER') {
    if (s.currentCol < s.word.length) {
      document.getElementById(`wrow-${s.currentRow}`).classList.add('shake');
      setTimeout(() => document.getElementById(`wrow-${s.currentRow}`)?.classList.remove('shake'), 450);
      return;
    }
    evaluateWordleGuess();
    return;
  }

  if (s.currentCol < s.word.length) {
    s.guesses[s.currentRow][s.currentCol] = key;
    const cell = document.getElementById(`wcell-${s.currentRow}-${s.currentCol}`);
    cell.textContent = key;
    cell.classList.add('filled');
    cell.style.transform = 'scale(1.18)';
    setTimeout(() => { if (cell) cell.style.transform = ''; }, 100);
    s.currentCol++;
  }
}

function evaluateWordleGuess() {
  const s = wordleState;
  const guess = s.guesses[s.currentRow];
  const word = s.word;
  const result = Array(word.length).fill('absent');

  // Count available letters in target
  const pool = {};
  word.split('').forEach(l => pool[l] = (pool[l] || 0) + 1);

  // Pass 1 — correct positions
  for (let i = 0; i < word.length; i++) {
    if (guess[i] === word[i]) {
      result[i] = 'correct';
      pool[guess[i]]--;
    }
  }
  // Pass 2 — present elsewhere
  for (let i = 0; i < word.length; i++) {
    if (result[i] === 'correct') continue;
    if (pool[guess[i]] > 0) {
      result[i] = 'present';
      pool[guess[i]]--;
    }
  }

  // Animate cells with flip delay
  result.forEach((state, i) => {
    setTimeout(() => {
      const cell = document.getElementById(`wcell-${s.currentRow}-${i}`);
      if (cell) cell.classList.add(state);

      // Update keyboard key colour (correct > present > absent)
      const keyEl = document.querySelector(`.wkey[data-wkey="${guess[i]}"]`);
      if (keyEl) {
        const cur = keyEl.dataset.state;
        if (cur !== 'correct' && !(cur === 'present' && state === 'absent')) {
          keyEl.dataset.state = state;
          keyEl.classList.remove('correct', 'present', 'absent');
          keyEl.classList.add(state);
        }
      }
    }, i * 120);
  });

  const won = result.every(r => r === 'correct');

  setTimeout(() => {
    if (won) {
      document.getElementById('hint-text').textContent = '🌸 you got it!!';
      s.done = true;
      document.removeEventListener('keydown', handleWordleKey);
      setTimeout(() => finishLevel(), 900);
    } else {
      s.currentRow++;
      s.currentCol = 0;
      s.wrongCount++;
      if (s.wrongCount === 3 && levels[currentLevel].extraHint) {
        document.getElementById('hint-text').textContent = levels[currentLevel].extraHint;
      }
      if (s.currentRow >= s.maxGuesses) {
        document.getElementById('hint-text').textContent = `the word was ${s.word.toLowerCase()}! 💕 onwards~`;
        s.done = true;
        document.removeEventListener('keydown', handleWordleKey);
        setTimeout(() => finishLevel(), 1600);
      }
    }
  }, word.length * 120 + 250);
}

// ======== LOCK ========
function loadLock(level) {
  const { word } = level;
  lockState = { word, dials: Array(word.length).fill(0) };

  const area = document.getElementById('game-area');

  const lockEmoji = document.createElement('span');
  lockEmoji.className = 'lock-emoji';
  lockEmoji.id = 'lock-emoji';
  lockEmoji.textContent = '🔒';
  area.appendChild(lockEmoji);

  const dialsRow = document.createElement('div');
  dialsRow.className = 'dials-row';

  for (let i = 0; i < word.length; i++) {
    const dial = document.createElement('div');
    dial.className = 'dial';

    const up = document.createElement('button');
    up.className = 'dial-btn';
    up.textContent = '▲';
    up.addEventListener('click', () => spinDial(i, 1));

    const letter = document.createElement('div');
    letter.className = 'dial-letter';
    letter.id = `dial-${i}`;
    letter.textContent = 'A';

    const down = document.createElement('button');
    down.className = 'dial-btn';
    down.textContent = '▼';
    down.addEventListener('click', () => spinDial(i, -1));

    dial.append(up, letter, down);
    dialsRow.appendChild(dial);
  }
  area.appendChild(dialsRow);
}

function spinDial(index, dir) {
  lockState.dials[index] = (lockState.dials[index] + dir + 26) % 26;
  const letter = String.fromCharCode(65 + lockState.dials[index]);
  const dialEl = document.getElementById(`dial-${index}`);
  dialEl.textContent = letter;

  if (letter === lockState.word[index]) {
    dialEl.classList.add('correct');
  } else {
    dialEl.classList.remove('correct');
  }

  if (lockState.dials.every((d, i) => String.fromCharCode(65 + d) === lockState.word[i])) {
    document.getElementById('lock-emoji').textContent = '🔓';
    document.getElementById('hint-text').textContent = '🎉 you cracked it!!';
    setTimeout(() => finishLevel(), 900);
  }
}

// ======== KEY ========
function loadKey(level) {
  const { word, decoys } = level;
  const area = document.getElementById('game-area');

  const allKeys = [word, ...decoys].sort(() => Math.random() - 0.5);
  const emojis = ['🗝️', '🔑', '✨', '💫'];

  const lockDisplay = document.createElement('span');
  lockDisplay.className = 'lock-display';
  lockDisplay.id = 'key-lock';
  lockDisplay.textContent = '🎁🔒';
  area.appendChild(lockDisplay);

  const prompt = document.createElement('p');
  prompt.className = 'key-prompt';
  prompt.textContent = 'which key opens your gift?';
  area.appendChild(prompt);

  const keysRow = document.createElement('div');
  keysRow.className = 'keys-row';

  allKeys.forEach((label, i) => {
    const btn = document.createElement('div');
    btn.className = 'key-choice';
    btn.innerHTML = `<span class="key-emoji">${emojis[i]}</span><span class="key-label">${label}</span>`;
    btn.addEventListener('click', () => {
      if (label === word) {
        document.getElementById('key-lock').textContent = '🎁✨';
        document.getElementById('hint-text').textContent = '🎉 you found it!!';
        document.querySelectorAll('.key-choice').forEach(k => k.style.pointerEvents = 'none');
        setTimeout(() => finishLevel(), 900);
      } else {
        document.getElementById('hint-text').textContent = 'not that one! 🙈';
        btn.classList.add('wrong');
        setTimeout(() => btn.classList.remove('wrong'), 500);
      }
    });
    keysRow.appendChild(btn);
  });
  area.appendChild(keysRow);
}

// ---- Level complete ----
function finishLevel() {
  const isLast = currentLevel === levels.length - 1;
  document.getElementById('between-msg').textContent = isLast ? '🎉 you did it!!' : '🌸 yay!!';
  document.getElementById('between-sub').textContent = isLast
    ? 'now for your actual gift…'
    : `keep going! ${levels.length - currentLevel - 1} more to go 💕`;
  document.getElementById('next-btn').textContent = isLast ? 'open your gift 🎁' : 'next level →';
  showScreen('screen-between');
}

// ---- Next level or final ----
function nextLevel() {
  currentLevel++;
  if (currentLevel >= levels.length) {
    showScreen('screen-final');
    makeSparkles('final-stars', 30);
  } else {
    loadLevel();
    showScreen('screen-game');
  }
}

// ---- Fullscreen video ----
function goFullscreen() {
  const video = document.getElementById('bday-video');
  if (video.requestFullscreen) video.requestFullscreen();
  else if (video.webkitRequestFullscreen) video.webkitRequestFullscreen();
  video.play();
}

// ---- Init sparkles on welcome ----
makeSparkles('sparkles', 20);
