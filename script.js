// ---- Valid 5-letter words (Wordle accepts these) ----
const VALID_WORDS = new Set([
  'ABACK','ABASE','ABATE','ABBEY','ABBOT','ABHOR','ABIDE','ABODE','ABORT','ABOUT',
  'ABOVE','ABUSE','ABYSS','ACUTE','ADAGE','ADAPT','ADEPT','ADMIT','ADOBE','ADOPT',
  'ADORE','ADORN','ADULT','AFTER','AGAIN','AGENT','AGILE','AGLOW','AGONY','AGREE',
  'AHEAD','ALARM','ALBUM','ALDER','ALERT','ALIBI','ALIGN','ALIKE','ALLAY','ALLEY',
  'ALLOT','ALLOW','ALONE','ALONG','ALOUD','ALPHA','ALTER','AMAZE','AMBLE','AMEND',
  'AMPLE','AMUSE','ANGEL','ANGER','ANGLE','ANGRY','ANGST','ANKLE','ANNEX','ANNOY',
  'ANTIC','ANVIL','AORTA','APART','APPLE','APPLY','APTLY','ARBOR','ARDOR','ARISE',
  'ARMOR','AROMA','AROSE','ARRAY','ARROW','ASKED','ASSET','ATLAS','ATONE','ATTIC',
  'AUDIO','AUDIT','AVAIL','AVERT','AVOID','AWAIT','AWAKE','AWARE',
  'BACON','BADGE','BADLY','BANJO','BARON','BASIC','BASIL','BASIN','BASIS','BATCH',
  'BAYOU','BEACH','BEARD','BEAST','BEGIN','BEING','BEIGE','BENCH','BESET','BEVEL',
  'BINGO','BIRCH','BISON','BLACK','BLADE','BLAME','BLAND','BLANK','BLAZE','BLEAK',
  'BLEAT','BLEED','BLEND','BLESS','BLIND','BLISS','BLOAT','BLOCK','BLOOD','BLOOM',
  'BLOWN','BLUES','BLUNT','BLURT','BLUSH','BOARD','BONUS','BOXER','BRACE','BRAIN',
  'BRAVE','BRAVO','BREAD','BREAK','BREED','BRIBE','BRICK','BRIDE','BRIEF','BRING',
  'BROIL','BROOK','BROTH','BULLY','BURNT','BURST',
  'CABIN','CAMEL','CANDY','CARGO','CAROL','CARRY','CATCH','CAUSE','CEDAR','CHAIN',
  'CHAIR','CHALK','CHARM','CHASE','CHEAP','CHECK','CHEEK','CHEER','CHESS','CHEST',
  'CHILD','CHIME','CHIRP','CHOIR','CIVIC','CIVIL','CLAIM','CLASS','CLEAN','CLEAR',
  'CLERK','CLICK','CLIFF','CLIMB','CLING','CLOCK','CLONE','CLOTH','CLOUD','CLOUT',
  'CLOWN','CLUES','COMET','COMIC','COMMA','COMES','CORAL','COULD','COURT','COVER',
  'CRACK','CRAFT','CRANE','CRAZE','CREAM','CREEK','CRISP','CROSS','CROWD','CROWN',
  'CRUEL','CRUSH','CRUST','CYCLE',
  'DAILY','DAIRY','DANCE','DATUM','DAUNT','DECAY','DEPOT','DERBY','DIRTY','DISCO',
  'DITCH','DITTY','DIZZY','DODGE','DOING','DONUT','DOUBT','DOUGH','DRAFT','DRAIN',
  'DRAMA','DRAPE','DRAWL','DREAD','DREAM','DRESS','DRIFT','DRINK','DRIVE','DROOP',
  'DROVE','DUCHY','DUSKY','DUSTY','DWELL','DYING',
  'EARLY','EARTH','EATER','EIGHT','ELATE','ELDER','ELITE','EMAIL','EMBER','EMPTY',
  'ENEMY','ENJOY','ENTER','ENTRY','EQUIP','EVADE','EVENT','EVERY','EXACT','EXIST',
  'EXTRA','EXULT',
  'FABLE','FACET','FAITH','FALSE','FANCY','FARCE','FAULT','FEAST','FENCE','FERRY',
  'FETCH','FEVER','FIRST','FLAIL','FLAME','FLARE','FLESH','FLIER','FLOCK','FLOOD',
  'FLOOR','FLOSS','FLOUR','FLUTE','FOGGY','FORCE','FORGE','FOUND','FRAIL','FRAME',
  'FRESH','FRISK','FROCK','FRONT','FROST','FROWN','FROZE','FRUIT',
  'GAVEL','GHOUL','GIDDY','GIVEN','GLARE','GLASS','GLEAM','GLEAN','GLIDE','GLOOM',
  'GLOSS','GLOVE','GLORY','GOING','GRACE','GRADE','GRAIN','GRAPE','GRASP','GRASS',
  'GRAZE','GREAT','GREED','GREET','GRILL','GRIME','GRIND','GROAN','GROSS','GROVE',
  'GROWL','GUESS','GUISE','GUSTO',
  'HABIT','HAPPY','HARSH','HAVEN','HAUNT','HEART','HEATH','HEAVY','HEDGE','HEIST',
  'HELLO','HENCE','HERBS','HITCH','HOIST','HOLLY','HONEY','HONOR','HORSE','HOTEL',
  'HOURS','HOUSE','HOVEL','HOVER','HUMID','HUMOR','HURRY','HYENA',
  'IDEAL','IDIOM','IDIOT','IMPLY','INLET','INPUT','INTER','INTRO','IRONY','ISSUE',
  'IVORY',
  'JAUNT','JELLY','JIFFY','JOLLY','JOUST','JUDGE','JUICE','JUICY','JUMPY','JUROR',
  'KAZOO','KNACK','KNAVE','KNEEL','KNIFE','KNOLL','KNOWN',
  'LABEL','LAPEL','LARGE','LASER','LATCH','LATER','LAUGH','LAYER','LEAPT','LEARN',
  'LEDGE','LEGAL','LEMON','LEVEL','LIGHT','LINEN','LIVER','LIVED','LOCAL','LODGE',
  'LOFTY','LOGIC','LOOSE','LOVED','LOVER','LOWLY','LUCID','LUCKY','LUNAR','LUSTY',
  'LYRIC',
  'MAGIC','MAJOR','MAKER','MANOR','MAPLE','MARCH','MATCH','MAYOR','MEANS','MERIT',
  'MERRY','MESSY','MIGHT','MIMIC','MIRTH','MISTY','MOIST','MONEY','MONTH','MORAL',
  'MOTOR','MOUNT','MOURN','MOUTH','MOVED','MOVIE','MUDDY','MUGGY','MUSHY','MUSIC',
  'MUTED','MYRRH',
  'NAIVE','NASTY','NERVE','NEVER','NIGHT','NOBLE','NOISE','NOTCH','NOTED','NOVEL',
  'NYMPH',
  'OCCUR','OCEAN','OFFER','OFTEN','OLIVE','ONSET','OPERA','ORDER','OTHER','OUGHT',
  'OUTDO','OUTER','OWNER',
  'PANIC','PAPER','PASTA','PATCH','PAUSE','PEACE','PEACH','PEARL','PENAL','PERCH',
  'PERKY','PILOT','PIVOT','PIXEL','PIZZA','PLACE','PLAIN','PLANE','PLANK','PLANT',
  'PLATE','PLAZA','PLEAD','PLUME','PLUMP','PLUNK','PLUSH','POINT','POKER','POLAR',
  'POWER','PRANK','PRESS','PRICE','PRIDE','PRIME','PRINT','PRIZE','PRONE','PROOF',
  'PROSE','PROUD','PROWL','PSALM','PUPIL','PURGE',
  'QUEEN','QUEST','QUICK','QUIET','QUILT','QUIRK','QUITE','QUOTA','QUOTE',
  'RADAR','RAISE','RALLY','RANCH','RANGE','RAPID','RAVEN','REACH','REALM','REBEL',
  'REIGN','REPLY','REPAY','RISEN','RISKY','RIVAL','RIVER','RIVET','ROBOT','ROCKY',
  'ROUGE','ROUGH','ROUND','ROYAL','RULER','RURAL','RUSTY',
  'SADLY','SAINT','SALSA','SAUCE','SCALE','SCARE','SCARF','SCENE','SCONE','SCORE',
  'SCORN','SCOUT','SCOWL','SEEMS','SERVE','SEVEN','SHADE','SHAKE','SHAME','SHAPE',
  'SHARE','SHARK','SHARP','SHAWL','SHEEP','SHEER','SHELF','SHELL','SHIFT','SHINE',
  'SHIRT','SHOCK','SHORE','SHORT','SHOUT','SIGHT','SILLY','SINCE','SKILL','SLATE',
  'SLAVE','SLEET','SLEPT','SLICK','SLOPE','SMART','SMELL','SMILE','SMOKE','SMOTE',
  'SNARE','SNEAK','SNORE','SOLVE','SORRY','SPARK','SPAWN','SPEAK','SPEND','SPICE',
  'SPINE','SPITE','SPLIT','SPOKE','SPORT','SPRAY','SPREE','SPUNK','STAGE','STAKE',
  'STALE','STALL','START','STATE','STEAL','STEAM','STEEL','STEEP','STEER','STERN',
  'STICK','STILL','STOMP','STORE','STORM','STORY','STOVE','STRAP','STRAY','STRIP',
  'STRUT','STUCK','STUNT','SUGAR','SUITE','SUNNY','SUPER','SURGE','SWAMP','SWEAR',
  'SWEAT','SWEET','SWIFT','SWIPE','SWIRL','SWOOP',
  'TABLE','TAKEN','TALON','TEACH','TEARS','TEETH','THANK','THEIR','THEME','THERE',
  'THESE','THICK','THIRD','THREE','THREW','THROW','THUMB','TIARA','TIGER','TIGHT',
  'TIMES','TIRED','TOKEN','TOPAZ','TOTAL','TOUCH','TOUGH','TOWER','TOXIC','TRACE',
  'TRACK','TRADE','TRAIL','TRAIN','TREAD','TREND','TRIAL','TRICK','TRIED','TROUT',
  'TROVE','TRYST','TULIP','TUTOR','TWICE','TWIST','TYING',
  'ULCER','ULTRA','UNDER','UNFIT','UNITY','UNTIL','UPSET','URBAN','USHER','USUAL',
  'VALID','VALOR','VALUE','VALVE','VAUNT','VERSE','VIGIL','VIOLA','VIPER','VISOR',
  'VITAL','VIVID','VOCAL','VOICE','VOTER','VOWEL',
  'WALTZ','WASTE','WATCH','WATER','WEARY','WEAVE','WEDGE','WEIGH','WEIRD','WHACK',
  'WHERE','WHICH','WHIFF','WHILE','WHIRL','WITCH','WOMAN','WOMEN','WORDS','WORLD',
  'WORRY','WORSE','WORST','WORTH','WOULD','WOVEN','WRATH','WRIST',
  'YACHT','YEARS','YEARN','YIELD','YOURS','YOUTH','YUMMY',
  'ZEBRA','ZESTY','ZILCH','ZINGY','ZIPPY'
]);

// ---- Game data ----
const levels = [
  {
    type: 'wordle',
    word: 'HAPPY',
    title: 'guess the word 💭',
    hint: '',
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
      '(all are correct actually... and u know that lol)',
      '(all are correct actually... and u know that lol)',
      '(all are correct actually... and u know that lol)',
      '(all are correct actually... and u know that lol)'
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
    s.style.fontSize = (8 + Math.random() * 10) + 'px';
    s.textContent = '♥';
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

function shakeWordleRow(rowIdx) {
  const row = document.getElementById(`wrow-${rowIdx}`);
  if (!row) return;
  row.classList.add('shake');
  setTimeout(() => row.classList.remove('shake'), 450);
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
      shakeWordleRow(s.currentRow);
      return;
    }
    const guess = s.guesses[s.currentRow].join('');
    if (!VALID_WORDS.has(guess)) {
      shakeWordleRow(s.currentRow);
      document.getElementById('hint-text').textContent = 'not a word! 🤔';
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

  const keyRows = [
    ['Q','W','E','R','T','Y','U','I','O','P'],
    ['A','S','D','F','G','H','J','K','L'],
    ['Z','X','C','V','B','N','M']
  ];
  const grid = document.createElement('div');
  grid.className = 'letter-grid';
  keyRows.forEach(row => {
    const rowEl = document.createElement('div');
    rowEl.className = 'letter-row';
    row.forEach(l => {
      const btn = document.createElement('button');
      btn.className = 'letter-btn';
      btn.textContent = l;
      btn.dataset.letter = l;
      btn.addEventListener('click', () => guessLetter(l));
      rowEl.appendChild(btn);
    });
    grid.appendChild(rowEl);
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
    const slots = document.querySelectorAll('.hangman-slot');
    s.word.split('').forEach((l, i) => {
      if (l === letter) {
        slots[i].textContent = letter;
        slots[i].classList.add('revealed');
      }
    });
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
      s.done = true;
      showHangmanFail();
    }
  }
  btn.disabled = true;
}

function showHangmanFail() {
  const s = hangmanState;
  const slots = document.querySelectorAll('.hangman-slot');

  // Reveal letters one by one
  s.word.split('').forEach((l, i) => {
    setTimeout(() => {
      slots[i].textContent = l;
      slots[i].classList.add('revealed');
    }, i * 130);
  });

  // Show cute fail card after reveal
  setTimeout(() => {
    const area = document.getElementById('game-area');
    const fail = document.createElement('div');
    fail.className = 'hangman-fail';
    fail.innerHTML = `
      <div class="fail-balloons">🫧 🫧 🫧</div>
      <p class="fail-msg">oh no, all the balloons!! 🎈</p>
      <p class="fail-word">it was <strong>${s.word.toLowerCase()}</strong> 🎂</p>
    `;
    area.appendChild(fail);
    document.getElementById('hint-text').textContent = 'onwards though!! 💕';
    setTimeout(() => finishLevel(), 2600);
  }, s.word.length * 130 + 400);
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

  if (isLast) {
    // Gift animation → straight to final screen, no between-screen
    showGiftAnimation(() => {
      localStorage.setItem('bday-completed', '1');
      document.getElementById('skip-hint').classList.add('visible');
      showScreen('screen-final');
      makeSparkles('final-stars', 30);
    });
  } else {
    document.getElementById('between-msg').textContent = '🌸 yay!!';
    document.getElementById('between-sub').textContent = `keep going! ${levels.length - currentLevel - 1} more to go 💕`;
    document.getElementById('next-btn').textContent = 'next level →';
    showScreen('screen-between');
  }
}

// ---- Gift opening animation ----
function showGiftAnimation(onDone) {
  const overlay = document.createElement('div');
  overlay.className = 'gift-overlay';
  document.body.appendChild(overlay);

  const confettiEl = document.createElement('div');
  confettiEl.className = 'confetti-container';
  overlay.appendChild(confettiEl);

  const giftEl = document.createElement('div');
  giftEl.className = 'gift-box';
  giftEl.textContent = '🎁';
  overlay.appendChild(giftEl);

  const msgEl = document.createElement('p');
  msgEl.className = 'gift-msg';
  msgEl.textContent = 'gift unlocked!! 🎊';
  overlay.appendChild(msgEl);

  // "Open" the gift after wiggle
  setTimeout(() => {
    giftEl.textContent = '🎊';
    giftEl.classList.add('gift-opened');
    msgEl.classList.add('visible');
    createConfetti(confettiEl);
  }, 800);

  // Fade out and proceed
  setTimeout(() => {
    overlay.classList.add('fade-out');
    setTimeout(() => { overlay.remove(); onDone(); }, 500);
  }, 2200);
}

function createConfetti(container) {
  const colors = ['#f4a7c3','#ffd6a5','#d4b8ff','#b8f0e8','#fff','#f9d4e2','#ffc0d4'];
  for (let i = 0; i < 60; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-piece';
    p.style.left = (Math.random() * 100) + '%';
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.animationDuration = (1 + Math.random() * 1.4) + 's';
    p.style.animationDelay  = (Math.random() * 0.8) + 's';
    const size = 5 + Math.random() * 8;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.borderRadius = Math.random() > 0.5 ? '50%' : '3px';
    p.style.setProperty('--drift', ((Math.random() - 0.5) * 160) + 'px');
    container.appendChild(p);
  }
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
  video.play();
  if (video.requestFullscreen)            video.requestFullscreen();
  else if (video.webkitEnterFullscreen)   video.webkitEnterFullscreen();
  else if (video.webkitRequestFullscreen) video.webkitRequestFullscreen();
}

// ---- Skip to end (dev shortcut, only after first playthrough) ----
function skipToEnd() {
  document.removeEventListener('keydown', handleWordleKey);
  const overlay = document.querySelector('.gift-overlay');
  if (overlay) overlay.remove();
  showScreen('screen-final');
  makeSparkles('final-stars', 30);
}

// ---- Init ----
makeSparkles('sparkles', 20);
if (localStorage.getItem('bday-completed')) {
  document.getElementById('skip-hint').classList.add('visible');
}
