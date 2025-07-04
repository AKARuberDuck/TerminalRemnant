// 🔄 ASCII Conversion Toolkit
function asciiDecode(input, mode) {
  const parts = input.trim().split(/\s+/);
  return parts.map(p => {
    try {
      if (mode === "DEC") return String.fromCharCode(parseInt(p, 10));
      if (mode === "HEX") return String.fromCharCode(parseInt(p, 16));
      if (mode === "OCT") return String.fromCharCode(parseInt(p, 8));
      if (mode === "ΔHX") return String.fromCharCode(parseInt(p, 16) ^ 0x5A);
    } catch {
      return "?";
    }
  }).join("");
}

function asciiEncode(text, mode) {
  return text.split("").map(char => {
    const code = char.charCodeAt(0);
    if (mode === "ENC_DEC") return code.toString(10);
    if (mode === "ENC_HEX") return code.toString(16).toUpperCase();
    if (mode === "ENC_OCT") return code.toString(8);
    return code;
  }).join(" ");
}

// 🧪 Sandbox Tool Handler
sandboxInput.oninput = () => {
  const value = sandboxInput.value.trim();
  const mode = sandboxMode.value;
  let result = "";

  if (mode.startsWith("ENC")) {
    result = asciiEncode(value, mode);
  } else {
    result = asciiDecode(value, mode);
  }

  sandboxOutput.textContent = result || "⚠️ Invalid input or format";
};
