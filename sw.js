// Service worker: caches the app shell so it can launch offline (works when hosted on https).
var CACHE = "crew-clock-v1";
self.addEventListener("install", function(e){
  e.waitUntil(
    caches.open(CACHE).then(function(c){ return c.addAll(["./", "./index.html"]); })
      .then(function(){ return self.skipWaiting(); })
      .catch(function(){})
  );
});
self.addEventListener("activate", function(e){
  e.waitUntil(self.clients.claim());
});
self.addEventListener("fetch", function(e){
  e.respondWith(
    caches.match(e.request).then(function(r){ return r || fetch(e.request); })
      .catch(function(){ return caches.match("./index.html"); })
  );
});
