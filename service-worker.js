const CACHE_NAME = 'coldwoods-v7';  // ← VERSIÓN INCREMENTADA para forzar refresco
const urlsToCache = [
    '/',
    '/index.html',
    '/css/estilos.css',
    '/js/game-shapes.js',
    '/js/game-colors.js',
    '/js/refuge-core.js',
    '/js/app-main.js',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js'
];

self.addEventListener('install', event => {
    event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});
self.addEventListener('fetch', event => {
    event.respondWith(caches.match(event.request).then(response => response || fetch(event.request)));
});
