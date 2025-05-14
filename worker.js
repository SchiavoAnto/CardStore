const VERSION = "0.1";
const CACHE_NAME = `card-store-v${VERSION}`;
const APP_STATIC_RESOURCES = [
    "/",

    "/add.html",
    "/card.html",
    "/index.html",

    "/css/add.css",
    "/css/card.css",
    "/css/common.css",
    "/css/index.css",

    "/js/add.js",
    "/js/app.js",
    "/js/card.js",
    "/js/JsBarcode.all.min.js",

    "/icons/chevron-left.svg",
    "/icons/export.svg",
    "/icons/import.svg",
    "/icons/logo-96.svg",
    "/icons/logo-128.svg",
    "/icons/logo-192.svg",
    "/icons/logo-256.svg",
    "/icons/logo-512.svg",
    "/icons/plus.svg",
    "/icons/search.svg"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        (async () => {
            const cache = await caches.open(CACHE_NAME);
            await cache.addAll(APP_STATIC_RESOURCES);
        })(),
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        (async () => {
            const names = await caches.keys();
            for (const key of names) {
                if (key !== CACHE_NAME) await caches.delete(key);
            }
        })(),
    );
});

self.addEventListener("fetch", (event) => {
    if (event.request.method !== "GET") return;

    event.respondWith(
        (async () => {
            const cache = await caches.open(CACHE_NAME);
            const cachedResponse = await cache.match(event.request.url.split("?")[0]);
            if (cachedResponse) {
                return cachedResponse;
            }
            return new Response(null, { status: 404 });
        })(),
    );
});