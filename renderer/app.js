// 🧠 Encode answers for speed
riddles.forEach(r => {
  r.encodedAnswers = r.answers.map(ans => wordToAscii(ans, r.format));
});

let users = JSON.parse(localStorage.getItem("lockdownUsers") || "{}");
let currentUser = null;
let level = 0;
let currentRiddle = null;
let timerLimit = 30;
let scrambleRiddles = false;
let formatVisible = true;
let lockBackspace = false;
let timer;

// 🔐 LOGIN SYSTEM
loginBtn.onclick = () => {
  const name = loginUsername.value.trim();
  const pass = loginPassword.value.trim();
  if (!name || !pass) return showBadge("⚠️ Fill fields");

  hashPassword(pass).then(hashed => {
    if (users[name]?.password === hashed) {
      currentUser = name;
      loadProfile(name);
      startGame();
    } else {
      showBadge("❌ Invalid login");
    }
  });
};

// 🧑‍💻 ACCOUNT CREATION
createAccountBtn.onclick = () => {
  const name = loginUsername.value.trim();
  const pass = loginPassword.value.trim();
  if (!name || !pass) return showBadge("⚠️ Fill fields");
  if (users[name]) return showBadge("❌ Username exists");

  hashPassword(pass).then(hashed => {
    users[name] = {
      password: hashed,
      stats: { solved: 0, failures: 0, level: 0 },
      journal: "",
      rank: "",
      achievements: [],
      lore: [],
      history: []
    };
    localStorage.setItem("lockdownUsers", JSON.stringify(users));
    showBadge("✅ Agent registered");
  });
};

// 🚀 START GAME
function startGame() {
  loginPanel.style.display = "none";
  gamePanel.style.display = "block";
  level = users[currentUser].stats.level || 0;
  applyDifficultySettings(level);
  nextRiddle();
}

// 🎚️ DIFFICULTY TIER
function getDifficultyTier(level) {
  if (level < 6) return "Standard Ops";
  if (level < 11) return "Anomaly Zone";
  if (level < 15) return "Blackout Protocol";
  return "REMNANT Loop";
}

function applyDifficultySettings(level) {
  const tier = getDifficultyTier(level);
  switch (tier) {
    case "Standard Ops":
      timerLimit = 30; formatVisible = true;
      scrambleRiddles = false; lockBackspace = false; break;
    case "Anomaly Zone":
      timerLimit = 20; formatVisible = false;
      scrambleRiddles = true; lockBackspace = false;
      tierAlert(tier); break;
    case "Blackout Protocol":
      timerLimit = 15; formatVisible = false;
      scrambleRiddles = true; lockBackspace = true;
      tierAlert(tier); break;
    case "REMNANT Loop":
      timerLimit = 15; formatVisible = false;
      scrambleRiddles = true; lockBackspace = true;
      tierAlert(tier); break;
  }
  levelDisplay.textContent = `LEVEL ${level} — ${tier}`;
  users[currentUser].rank = calculateRank(users[currentUser].stats);
}

// 🧠 RANK CALCULATOR
function calculateRank(stats) {
  const ratio = stats.solved / (stats.failures + 1);
  if (ratio > 4) return "Cipher Marshal";
  if (ratio > 2) return "Memory Collector";
  if (ratio > 1) return "Lore Operative";
  return "Entropy Fodder";
}

// 🔄 RIDDLE SELECTOR
function nextRiddle() {
  currentRiddle = getDailyRiddle(); // use seed logic
  applyRemnantMutation(level);

  if (scrambleRiddles) {
    currentRiddle.riddle = scrambleText(currentRiddle.riddle);
  }

  riddle.textContent = currentRiddle.riddle;
  formatDisplay.textContent = formatVisible ? `FORMAT: ${currentRiddle.format}` : `FORMAT: [???]`;
  asciiInput.value = "";
  status.textContent = "Decrypt now";

  clearTimeout(timer);
  let timeLeft = timerLimit;
  timerDisplay.textContent = `${timeLeft}s`;
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      failureHandler("⛔ TIMEOUT");
    }
  }, 1000);
}

// 💥 SCRAMBLE TEXT
function scrambleText(text) {
  return text.split("").sort(() => 0.5 - Math.random()).join("");
}

// 🧑‍💻 INPUT HANDLER
asciiInput.addEventListener("keydown", e => {
  if (lockBackspace && e.key === "Backspace") {
    e.preventDefault();
    showBadge("⛔ BACKSPACE LOCKED", 1500);
  }
  if (e.key === "Enter") {
    const input = asciiInput.value.trim().toLowerCase();
    const correct = isCorrectAnswer(input, currentRiddle);
    logHistory(input, correct);
    if (correct) successHandler();
    else failureHandler("❌ INVALID");
  }
});

// 📜 LOG HISTORY
function logHistory(answer, success) {
  users[currentUser].history.push({
    riddle: currentRiddle.riddle,
    format: currentRiddle.format,
    answered: answer,
    success: success,
    timestamp: Date.now()
  });
  localStorage.setItem("lockdownUsers", JSON.stringify(users));
}

// ✅ SUCCESS
function successHandler() {
  clearInterval(timer);
  status.textContent = "✅ ACCESS GRANTED";
  users[currentUser].stats.solved++;
  level++;
  users[currentUser].stats.level = level;
  users[currentUser].rank = calculateRank(users[currentUser].stats);
  unlockFragment(`REMNANT_LOG_${level}`);
  localStorage.setItem("lockdownUsers", JSON.stringify(users));
  applyDifficultySettings(level);
  setTimeout(nextRiddle, 1500);
}

// ❌ FAILURE
function failureHandler(reason = "❌ ACCESS DENIED") {
  status.textContent = reason;
  users[currentUser].stats.failures++;
  localStorage.setItem("lockdownUsers", JSON.stringify(users));
  if (level >= 15) triggerEmergencyFlash();
  setTimeout(nextRiddle, 2000);
}

// 🧠 DAILY CHALLENGE
function dailySeed() {
  const date = new Date().toDateString();
  let hash = 0;
  for (let i = 0; i < date.length; i++) {
    hash = date.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

function getDailyRiddle() {
  const seed = dailySeed();
  return riddles[Math.abs(seed) % riddles.length];
}

// 📄 LOAD PROFILE
function loadProfile(name) {
  const agent = users[name];
  if (agent.journal) {
    journalTextarea.value = decryptJournal(agent.journal);
  }
}

// 💾 AUTOSAVE JOURNAL
window.addEventListener("beforeunload", () => {
  if (currentUser && journalTextarea) {
    users[currentUser].journal = encryptJournal(journalTextarea.value);
    localStorage.setItem("lockdownUsers", JSON.stringify(users));
  }
});
