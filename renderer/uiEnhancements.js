// 🔔 Badge / Toast Notifications
function showBadge(message = "✅", duration = 1200) {
  const toast = document.getElementById("badgeToast");
  toast.textContent = message;
  toast.classList.remove("hidden");
  setTimeout(() => toast.classList.add("hidden"), duration);
}

// 🔮 Tier Change Alerts
function tierAlert(tier) {
  const colorMap = {
    "Standard Ops": "#00ff88",
    "Anomaly Zone": "#ffdd00",
    "Blackout Protocol": "#ff0000",
    "REMNANT Loop": "#ff00cc"
  };
  const display = document.getElementById("levelDisplay");
  display.style.color = colorMap[tier] || "#00ff88";
  display.classList.add("lore-glow");
  setTimeout(() => display.classList.remove("lore-glow"), 1500);
}

// 🔌 Glitch Pulse
function triggerGlitchFlash() {
  const terminal = document.getElementById("terminal");
  terminal.classList.add("glitch-flicker");
  setTimeout(() => terminal.classList.remove("glitch-flicker"), 400);
}
