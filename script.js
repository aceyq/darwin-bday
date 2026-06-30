// ---- Game data ----
const levels = [
  {
    type: 'wordle',
    word: 'HAPPY',
    title: 'guess the word 💭',
    hint: 'like you make me 🥰',
    extraHint: 'hint: how do i feel about you? 💕'
  },
  {
    type: 'hangman',
    word: 'BIRTHDAY',
    title: 'save the balloons 🎈',
    hint: 'guess letters to spell the word!'
  },
  {
    type: 'choice',
    title: 'important question 🤔',
    hint: 'choose wisely… 👀',
    question: "what's my fav nickname for u?",
    choices: ['beeeebis', 'jpxfrd', 'darwino', 'wiwiwi'],
    reactions: [
      'correct!! 🩷',
      'also correct!! 🫣',
      'heehee 🥰',
      'yes always 💕'
    ]
  }
];

let currentLevel = 0;
let wordleState  = null;
let hangmanState = null;

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
  document.removeEventListener('keydown', handleWordleKey);

  if      (level.type === 'wordle')  loadWordle(level);
  else if (level.type === 'hangman') loadHangman(level);
  else if (level.type === 'choice')  loadChoice(level);
}

// ======== WORDLE ========
function loadWordle(level) {
  const { word } = level;
  const maxGuesses = 6;
  wordleState = {
    word, maxGuesses,
    currentRow: 0, currentCol: 0,
    guesses: Array.from({ length: maxGuesses }, () => Array(word.length).fill('')),
    done: false, wrongCount: 0
  };

  const area = document.getElementById('game-area');

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
  if (e.key === 'Enter')              handleWordleInput('ENTER');
  else if (e.key === 'Backspace')     handleWordleInput('⌫');
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
      const row = document.getElementById(`wrow-${s.currentRow}`);
      row.classList.add('shake');
      setTimeout(() => row?.classList.remove('shake'), 450);
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
  const word  = s.word;
  const result = Array(word.length).fill('absent');
  const pool = {};
  word.split('').forEach(l => pool[l] = (pool[l] || 0) + 1);

  for (let i = 0; i < word.length; i++) {
    if (guess[i] === word[i]) { result[i] = 'correct'; pool[guess[i]]--; }
  }
  for (let i = 0; i < word.length; i++) {
    if (result[i] === 'correct') continue;
    if (pool[guess[i]] > 0) { result[i] = 'present'; pool[guess[i]]--; }
  }

  result.forEach((state, i) => {
    setTimeout(() => {
      document.getElementById(`wcell-${s.currentRow}-${i}`)?.classList.add(state);
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

// ======== HANGMAN (balloon edition) ========
function loadHangman(level) {
  const { word } = level;
  const maxWrong = 6;
  hangmanState = { word, guessed: new Set(), wrongCount: 0, maxWrong, done: false };

  const area = document.getElementById('game-area');

  // Balloons
  const balloonsRow = document.createElement('div');
  balloonsRow.className = 'balloons-row';
  for (let i = 0; i < maxWrong; i++) {
    const b = document.createElement('span');
    b.className = 'balloon';
    b.id = `balloon-${i}`;
    b.textContent = '🎈';
    balloonsRow.appendChild(b);
  }
  area.appendChild(balloonsRow);

  // Word slots
  const wordDisplay = document.createElement('div');
  wordDisplay.className = 'hangman-word';
  wordDisplay.id = 'hangman-word';
  word.split('').forEach(() => {
    const slot = document.createElement('span');
    slot.className = 'hangman-slot';
    slot.textContent = '_';
    wordDisplay.appendChild(slot);
  });
  area.appendChild(wordDisplay);

  // Letter grid
  const grid = document.createElement('div');
  grid.className = 'letter-grid';
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(l => {
    const btn = document.createElement('button');
    btn.className = 'letter-btn';
    btn.textContent = l;
    btn.dataset.letter = l;
    btn.addEventListener('click', () => guessLetter(l));
    grid.appendChild(btn);
  });
  area.appendChild(grid);
}

function guessLetter(letter) {
  const s = hangmanState;
  if (s.done || s.guessed.has(letter)) return;
  s.guessed.add(letter);

  const btn = document.querySelector(`.letter-btn[data-letter="${letter}"]`);

  if (s.word.includes(letter)) {
    btn.classList.add('correct');
    // Reveal matching slots
    const slots = document.querySelectorAll('.hangman-slot');
    s.word.split('').forEach((l, i) => {
      if (l === letter) {
        slots[i].textContent = letter;
        slots[i].classList.add('revealed');
      }
    });
    // Win check
    if (s.word.split('').every(l => s.guessed.has(l))) {
      document.getElementById('hint-text').textContent = '🎉 you got it!!';
      s.done = true;
      setTimeout(() => finishLevel(), 900);
    }
  } else {
    btn.classList.add('absent');
    const balloon = document.getElementById(`balloon-${s.wrongCount}`);
    balloon.textContent = '🫧';
    balloon.classList.add('popped');
    s.wrongCount++;
    if (s.wrongCount >= s.maxWrong) {
      // Reveal all
      const slots = document.querySelectorAll('.hangman-slot');
      s.word.split('').forEach((l, i) => {
        slots[i].textContent = l;
        slots[i].classList.add('revealed');
      });
      document.getElementById('hint-text').textContent = `it was ${s.word.toLowerCase()}! 💕 onwards~`;
      s.done = true;
      setTimeout(() => finishLevel(), 1600);
    }
  }
  btn.disabled = true;
}

// ======== MULTIPLE CHOICE ========
function loadChoice(level) {
  const { question, choices, reactions } = level;
  const area = document.getElementById('game-area');

  const q = document.createElement('p');
  q.className = 'mc-question';
  q.textContent = question;
  area.appendChild(q);

  const choicesEl = document.createElement('div');
  choicesEl.className = 'mc-choices';

  choices.forEach((choice, i) => {
    const btn = document.createElement('button');
    btn.className = 'mc-btn';
    btn.textContent = choice;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.mc-btn').forEach(b => {
        b.style.pointerEvents = 'none';
        b.classList.add('dimmed');
      });
      btn.classList.remove('dimmed');
      btn.classList.add('selected');
      document.getElementById('hint-text').textContent = reactions[i];
      setTimeout(() => finishLevel(), 1200);
    });
    choicesEl.appendChild(btn);
  });
  area.appendChild(choicesEl);
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
