const CACHE_NAME = 'coldwoods-v5';
const urlsToCache = ['/', '/index.html', '/css/estilos.css', '/js/game-shapes.js', '/js/game-colors.js', '/js/refuge-core.js', '/js/app-main.js', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css', 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css'];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(urlsToCache))));
self.addEventListener('fetch', e => e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))));
