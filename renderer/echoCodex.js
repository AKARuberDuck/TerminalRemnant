codexToggle.onclick = () => {
  codexPanel.style.display = codexPanel.style.display === "none" ? "block" : "none";
  codexContent.textContent = "";

  const history = users[currentUser]?.history || [];
  const display = history.map(entry => {
    const mark = entry.success ? "✅" : "❌";
    return `${mark} [${entry.format}] ${entry.riddle}\n→ You answered: ${entry.answered}\n`;
  }).join("\n");

  codexContent.textContent = display || "📂 No riddle history yet.";
};

// 🔍 Search Functionality
codexSearch.oninput = () => {
  const query = codexSearch.value.trim().toLowerCase();
  const history = users[currentUser]?.history || [];
  const filtered = history.filter(entry =>
    entry.riddle.toLowerCase().includes(query) ||
    entry.answered.toLowerCase().includes(query)
  );

  const display = filtered.map(entry => {
    const mark = entry.success ? "✅" : "❌";
    return `${mark} [${entry.format}] ${entry.riddle}\n→ You answered: ${entry.answered}`;
  }).join("\n");

  codexContent.textContent = display || "🔍 No matches found.";
};
