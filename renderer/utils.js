// 🔁 Random element from array
function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// 🔠 Convert word to ASCII string by format
function wordToAscii(word, format) {
  return word.split("").map(char => {
    const code = char.charCodeAt(0);
    if (format === "[DEC]") return code.toString(10);
    if (format === "[HX]")  return code.toString(16).toUpperCase();
    if (format === "[OCT]") return code.toString(8);
    if (format === "[ΔHX]") return (code ^ 0x5A).toString(16).toUpperCase(); // Glitched format
    return code;
  }).join(" ");
}

// 🔐 SHA-256 password hashing
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// ✅ Validate riddle answer (case-insensitive)
function isCorrectAnswer(input, riddle) {
  const normalized = input.trim().toLowerCase();
  return riddle.answers.some(ans => normalized === ans.toLowerCase());
}

// 📊 Riddle format stats
function getRiddleStats() {
  const formats = ["[DEC]", "[HX]", "[OCT]", "[ΔHX]", "[REVOKE]", "[NULL]", "[ECHO]"];
  const stats = {
    total: typeof riddles !== "undefined" ? riddles.length : 0,
    formats: {}
  };
  formats.forEach(fmt => {
    stats.formats[fmt] = typeof riddles !== "undefined"
      ? riddles.filter(r => r.format === fmt).length
      : 0;
  });
  return stats;
}
