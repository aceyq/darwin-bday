// ---- Game data ---- 
// The 3 words your boyfriend needs to spell, one per level
const levels = [
    { word: "HAPPY",   hint: "like you make me 🥰" },
    { word: "BIRTHDAY", hint: "today's the day!! 🎂" },
    { word: "BEBIS",   hint: "that's you 🐣" },
  ];
  
  let currentLevel = 0;
  let currentAnswer = [];
  let levelBubbles = [];
  
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
    const { word, hint } = levels[currentLevel];
    currentAnswer = Array(word.length).fill(null);
    levelBubbles = [];
  
    document.getElementById('level-label').textContent = `level ${currentLevel + 1} of ${levels.length}`;
    document.getElementById('target-word').textContent = word.toLowerCase();
    document.getElementById('hint-text').textContent = '';
  
    renderAnswerRow(word);
    renderBubbles(word);
  }
  
  // ---- Render the blank slots ----
  function renderAnswerRow(word) {
    const row = document.getElementById('answer-row');
    row.innerHTML = '';
    for (let i = 0; i < word.length; i++) {
      const slot = document.createElement('div');
      slot.className = 'answer-slot';
      slot.id = `slot-${i}`;
      row.appendChild(slot);
    }
  }
  
  // ---- Render the shuffled letter bubbles ----
  function renderBubbles(word) {
    // Put the correct letters in, plus some red herrings
    const extras = 'QZXVMWJK';
    const letters = word.split('');
    const count = Math.max(9, letters.length + 4);
    while (letters.length < count) {
      letters.push(extras[Math.floor(Math.random() * extras.length)]);
    }
    // Shuffle
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
  
    const grid = document.getElementById('bubble-grid');
    grid.innerHTML = '';
    letters.forEach((letter, i) => {
      const bubble = document.createElement('div');
      bubble.className = 'bubble';
      bubble.textContent = letter;
      bubble.dataset.index = i;
      bubble.dataset.letter = letter;
      bubble.onclick = () => tapBubble(bubble, letter, i);
      grid.appendChild(bubble);
      levelBubbles.push(bubble);
    });
  }
  
  // ---- Tap a bubble ----
  function tapBubble(bubble, letter, bubbleIdx) {
    const { word } = levels[currentLevel];
    // Find the next empty slot that matches this letter
    const nextSlot = currentAnswer.findIndex((v, i) => v === null && word[i] === letter);
    if (nextSlot === -1) {
      // Wrong letter — shake hint
      document.getElementById('hint-text').textContent = `hmm, that's not quite right! 🤔`;
      return;
    }
    currentAnswer[nextSlot] = { letter, bubbleIdx };
    bubble.classList.add('used');
    document.getElementById(`slot-${nextSlot}`).textContent = letter;
    document.getElementById(`slot-${nextSlot}`).classList.add('filled');
    document.getElementById('hint-text').textContent = levels[currentLevel].hint;
  
    // Check if complete
    if (currentAnswer.every(v => v !== null)) {
      setTimeout(() => finishLevel(), 500);
    }
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