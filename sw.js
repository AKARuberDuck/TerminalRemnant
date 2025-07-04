self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("remnant-cache").then(cache => {
      return cache.addAll([
        "./",
        "./index.html",
        "./manifest.json",
        "./styles/base.css",
        "./styles/remnant.css",
        "./icons/icon-192.png",
        "./icons/icon-512.png",
        "./renderer/utils.js",
        "./renderer/riddles_remnant.js",
        "./renderer/app.js",
        "./renderer/remnantEngine.js",
        "./renderer/journal.js",
        "./renderer/echoCodex.js",
        "./renderer/loreFragments.js",
        "./renderer/sandboxTools.js",
        "./renderer/uiEnhancements.js"
      ]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
