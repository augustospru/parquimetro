self.addEventListener("install", event => {
    console.log("Service Worker Installed");
    event.waitUntil(
        caches.open("parquimetro").then(cache => {
            return cache.addAll([
                "./",
                "./src/master.css",
                "./img"
            ])
        })
    )
})

self.addEventListener("fetch", event => {
    console.log("Fetching Service Worker: " + event.request.url);
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request)
        })
    )
})