// 🔐 Encrypt journal entry (Base64)
function encryptJournal(text) {
  const encoded = btoa(text);
  return `[ENCRYPTED]\n${encoded}`;
}

// 🔓 Decrypt journal entry
function decryptJournal(encrypted) {
  if (!encrypted.startsWith("[ENCRYPTED]")) return encrypted;
  try {
    return atob(encrypted.split("\n")[1]);
  } catch (e) {
    return "⚠️ Journal corrupted.";
  }
}

// 💾 Save journal
saveJournalBtn.onclick = () => {
  let entry = journalTextarea.value;
  if (encryptJournal.checked) entry = encryptJournal(entry);
  users[currentUser].journal = entry;
  localStorage.setItem("lockdownUsers", JSON.stringify(users));
  showBadge("📓 Journal saved");
};

// 🔓 Manual decrypt
decryptJournalBtn.onclick = () => {
  const raw = users[currentUser]?.journal || "";
  const visible = decryptJournal(raw);
  journalTextarea.value = visible;
  showBadge("📜 Journal decrypted");
};
