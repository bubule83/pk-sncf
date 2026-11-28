const CACHE = 'pk-sncf-v6';
const FILES = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png', './pks.json', './gares.json', './jingle.wav'];
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
  const url = e.request.url, same = url.startsWith(self.location.origin);
  const nav = e.request.mode === 'navigate' || url.endsWith('index.html');
  if (nav) {
    e.respondWith(fetch(e.request).then(res => {
      const c = res.clone(); caches.open(CACHE).then(x => x.put(e.request, c)); return res;
    }).catch(() => caches.match(e.request).then(h => h || caches.match('./index.html'))));
  } else if (same && /\.json(\?|$)/.test(url) && !url.includes('pks.json')) {
    // petits fichiers de données : réseau d'abord, cache en secours
    e.respondWith(fetch(e.request).then(res => {
      if (res.ok) { const c = res.clone(); caches.open(CACHE).then(x => x.put(e.request, c)); }
      return res;
    }).catch(() => caches.match(e.request)));
  } else {
    e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
      if (res.ok && same) { const c = res.clone(); caches.open(CACHE).then(x => x.put(e.request, c)); }
      return res;
    })));
  }
});
