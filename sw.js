const CACHE = 'pk-sncf-v3';
const FILES = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png', './pks.json'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const nav = e.request.mode === 'navigate' || e.request.url.endsWith('index.html');
  if (nav) {
    e.respondWith(fetch(e.request).then(res => {
      const c = res.clone(); caches.open(CACHE).then(x => x.put(e.request, c)); return res;
    }).catch(() => caches.match(e.request).then(h => h || caches.match('./index.html'))));
  } else {
    e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request)));
  }
});
