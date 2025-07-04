# 🔐 Terminal Lockdown: REMNANT Protocol

> A local-only encrypted riddle engine for multi-agent play — no servers, no sync, no mercy. This is the standalone sequel to **Terminal Lockdown**, built for offline use as a Progressive Web App **(PWA)**.

---

## 🧩 Gameplay Features

- 🧠 **Encrypted Riddles** — Solve mutated logic puzzles in `[DEC]`, `[HX]`, `[OCT]`, `[NULL]`, `[ECHO]`, `[ΔHX]` formats  
- 📓 **Corruptible Journal** — Write agent logs, unlock hallucinations, encrypt thoughts  
- 📜 **Lore Fragment Engine** — Decode base64 lore shards that unveil the REMNANT backstory  
- 🧑‍💻 **Multi-User Local Accounts** — Play offline with separate identities on the same device  
- 📱 **PWA Installation** — Launch directly from desktop or mobile as a standalone app  
- 📊 **Riddle History & Rank System** — Track solve/failure ratio and unlock agent titles  
- 📅 **Daily Challenge System** — New logic puzzle seeded daily for replay and entropy gain

---

## 🛰️ How to Launch

1. **Clone the Repo**  
   `git clone https://github.com/your-username/remnant-protocol`

2. **Open Locally**  
   - Open `index.html` in your browser  
   - Or use [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

3. **Enable GitHub Pages (optional)**  
   - Go to repo `Settings → Pages`  
   - Source: `main branch /root`  
   - Access it at `https://your-username.github.io/remnant-protocol/`

---

## 🧠 PWA Mode

- Supports install to desktop or mobile  
- Works fully offline after initial load  
- Automatically caches assets via `sw.js` service worker  
- No cloud dependencies, no server calls — encrypted vault runs client-side only

---

## 🗂 Folder Structure

    TerminalRemnant/ 
    ├── index.html 
    ├── manifest.json 
    ├── sw.js 
    ├── styles/ 
    │ ├── base.css 
    │ └── remnant.css 
    ├── renderer/ │ ├── app.js 
    │ ├── riddles_remnant.js 
    │ ├── remnantEngine.js 
    │ ├── journal.js 
    │ ├── echoCodex.js 
    │ ├── loreFragments.js 
    │ ├── sandboxTools.js 
    │ ├── utils.js 
    │ └── uiEnhancements.js


---

## 🛡️ License

MIT License — this game is yours to remix, decrypt, expand, and corrupt. Attribution is required.

---

## 💡 Credits

Built by [AKARuberDuck](https://github.com/akaruberduck) with a terminal obsession and way too many riddles.

