// Pro 18 V4 intentionally uses no offline cache.
// If an older installation loads this file, unregister it and delete old caches.
self.addEventListener('install', event => self.skipWaiting());
self.addEventListener('activate', event => {
  event.waitUntil((async()=>{
    const names=await caches.keys();
    await Promise.all(names.map(n=>caches.delete(n)));
    await self.registration.unregister();
    const clientsList=await self.clients.matchAll({type:'window'});
    clientsList.forEach(c=>c.navigate(c.url));
  })());
});
