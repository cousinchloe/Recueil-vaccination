/* Service worker — met l'outil en cache pour un fonctionnement hors ligne.
   Aucune donnée patient ne transite ici : seuls les fichiers de l'application
   (page, icônes, manifeste) sont mis en cache. Les recueils restent dans le
   localStorage du navigateur et ne sont jamais lus par ce script. */
const VERSION = "recueil-vaccination-v2";
const SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
  "./apple-touch-icon.png"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(VERSION)
      .then(c => c.addAll(SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Cache d'abord : l'outil s'ouvre instantanément et fonctionne sans réseau.
   En parallèle, on rafraîchit discrètement le cache si le réseau répond,
   pour qu'une correction publiée soit récupérée à la prochaine ouverture. */
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then(hit => {
      const live = fetch(e.request)
        .then(resp => {
          if (resp && resp.status === 200 && resp.type === "basic") {
            const copy = resp.clone();
            caches.open(VERSION).then(c => c.put(e.request, copy));
          }
          return resp;
        })
        .catch(() => hit);
      return hit || live;
    })
  );
});
