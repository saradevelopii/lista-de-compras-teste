/*! Qlista | Copyright (c) 2026 Sara Brito. Todos os direitos reservados. */
// o app antigo registrou um service worker neste endereço e serve a versão em cache pra sempre.
// este arquivo o substitui: apaga os caches, se desregistra e recarrega as abas abertas pra elas
// caírem na página de redirecionamento
self.addEventListener('install', function () { self.skipWaiting(); });

self.addEventListener('activate', function (evento) {
  evento.waitUntil((async function () {
    var chaves = await caches.keys();
    await Promise.all(chaves.map(function (c) { return caches.delete(c); }));
    await self.registration.unregister();
    var janelas = await self.clients.matchAll({ type: 'window' });
    janelas.forEach(function (j) { j.navigate(j.url); });
  })());
});
