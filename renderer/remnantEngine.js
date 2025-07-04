// 🔄 Format Mutation Logic
function mutateFormat(riddle) {
  const formats = ["[DEC]", "[HX]", "[OCT]", "[REVOKE]", "[ECHO]", "[NULL]", "[ΔHX]"];
  const newFormat = getRandom(formats.filter(f => f !== riddle.format));
  riddle.format = newFormat;
  r.encodedAnswers = riddle.answers.map(ans => wordToAscii(ans, newFormat));
}

// ⚡ Visual Glitch
function triggerFormatGlitch() {
  const terminal = document.getElementById("terminal");
  terminal.classList.add("glitch-flicker");
  setTimeout(() => terminal.classList.remove("glitch-flicker"), 400);
}

// 💥 Emergency Red Flash
function triggerEmergencyFlash() {
  const terminal = document.getElementById("terminal");
  terminal.classList.add("emergency-flash");
  setTimeout(() => terminal.classList.remove("emergency-flash"), 500);
}

// 🧠 REMNANT Mutation Hook
function applyRemnantMutation(level) {
  if (level >= 5) {
    mutateFormat(currentRiddle);
    triggerFormatGlitch();
  }
  if (level >= 10 && currentRiddle.riddle) {
    currentRiddle.riddle = scrambleText(currentRiddle.riddle);
  }
}
