// Cache Name
const CACHE_NAME = "static-cache-v3";
// Cache Files
const FILES_TO_CACHE = ["index.html", "global.css", "build/bundle.css", "build/bundle.js", "service-worker.js"];
// install
self.addEventListener("install", (evt) => {
  console.log("[ServiceWorker] Install");
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[ServiceWorker] Pre-caching needed pages");
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Active PWA Cache and clear out anything older
self.addEventListener("activate", (evt) => {
  console.log("[ServiceWorker] Activate");
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("[ServiceWorker] Removing old cache", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// listen for fetch events in page navigation and return anything that has been cached
self.addEventListener('fetch', (e) => {

	console.log("Fetching")

	e.respondWith((async () => {
		const r = await caches.match(e.request);
		console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
		if (r) { return r; }
		const response = await fetch(e.request);
		const cache = await caches.open(CACHE_NAME);
		console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
		cache.put(e.request, response.clone());
		return response;
  })());

});
