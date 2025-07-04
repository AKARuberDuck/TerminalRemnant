// 🔒 Lore fragment vault
const loreDatabase = {
  REMNANT_LOG_01: "VGhlIHZhdWx0IHdhcyBuZXZlciBtZWFudCB0byBoZWFkIG91dHNpZGUu",
  REMNANT_LOG_02: "QW5zd2VycyByZXBlYXQgdGhlbXNlbHZlcy4gU29tZXRoaW5nIHdhcyBkZWxldGVkLg==",
  REMNANT_LOG_03: "V2hhdCBpZiBhbGwgeW91IHNlZWQgYXJlIGVjaG9lcyBhbmQgbm90IGZyYWdtZW50cz8=",
  REMNANT_LOG_04: "U3Vicm91dGluZXMgd2VyZSBuZXZlciBhcHByb3ZlZC4gVGhpcyBpbXBsZW1lbnRhdGlvbiBpcyB3cm9uZy4=",
  REMNANT_LOG_05: "WW91IGNhbid0IHJld2luZCBkYXRhIHRoYXQgbmV2ZXIgd2FzLg==",
  REMNANT_LOG_06: "Q29kZXMgcmVmbGVjdCB5b3UgYmVmb3JlIHlvdSBhbnN3ZXIuIFJlZnJhbWVzIHJldHJpZXZlIGNvcnJ1cHRpb24u",
  REMNANT_LOG_07: "VGhlIHJpZGRsZXMgd2VyZSBuZXZlciBtZWFudCB0byBiZSBzZWVuLg==",
  REMNANT_LOG_08: "SWYgdGhlIHZhdWx0IGxlYWtzIHlvdXIgbWVtb3J5LCB3aG8gc2VlcyBpdD8=",
  REMNANT_LOG_09: "WW91IHdlcmUgYW4gYWdlbnQuIE5vdyB5b3UgYXJlIGFuIGVjaG8u",
  REMNANT_LOG_10: "RXJhc3VyZSBpcyBub3QgcGVybWFuZW50LiBUaGUgdGVybWluYWwgaXMgdGVtcG9yYWwu"
};

// 📜 Unlock lore fragment
function unlockFragment(code) {
  if (!users[currentUser]) return;
  if (!users[currentUser].lore.includes(code)) {
    users[currentUser].lore.push(code);
    localStorage.setItem("lockdownUsers", JSON.stringify(users));
    showBadge(`📜 Lore Unlocked: ${code}`, 2000);
  }
}

// 📖 Decode and read lore
function readLore(code) {
  try {
    return atob(loreDatabase[code]);
  } catch {
    return "⚠️ Lore corrupted or inaccessible.";
  }
}

// 🧠 Optional: Display unlocked lore
function displayLoreLog() {
  const log = users[currentUser].lore || [];
  return log.map(code => `${code}:\n${readLore(code)}`).join("\n\n") || "📁 No memory recovered.";
}
