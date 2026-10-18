/*
 * AutoMate service worker.
 *
 * Deliberately conservative, because every screen is server-rendered and gated
 * by an auth cookie:
 *
 *   - navigations      → network only, with the cached /offline screen as fallback
 *   - /api/*           → never touched (auth + data must always be live)
 *   - built assets     → cache-first (Next hashes these names, so they're immutable)
 *   - icons            → cache-first
 *
 * Cache names are versioned; bump VERSION to invalidate everything on activate.
 */

const VERSION = "automate-v1";
const SHELL_CACHE = `${VERSION}-shell`;
const ASSET_CACHE = `${VERSION}-assets`;

const OFFLINE_URL = "/offline";

const PRECACHE = [
  OFFLINE_URL,
  "/manifest.webmanifest",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/icon-maskable-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(SHELL_CACHE);
      // Individually, so one 404 can never break the whole install.
      await Promise.all(
        PRECACHE.map(async (url) => {
          try {
            await cache.add(new Request(url, { cache: "reload" }));
          } catch {
            /* offline or missing — ignore */
          }
        }),
      );
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => !key.startsWith(VERSION))
          .map((key) => caches.delete(key)),
      );
      await self.clients.claim();
    })(),
  );
});

// Lets the page ask a waiting worker to take over immediately.
self.addEventListener("message", (event) => {
  if (event.data === "automate:skip-waiting") void self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") return;

  let url;
  try {
    url = new URL(request.url);
  } catch {
    return;
  }

  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/api/")) return;

  if (request.mode === "navigate") {
    event.respondWith(networkFirstNavigation(request));
    return;
  }

  if (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/icons/") ||
    url.pathname.startsWith("/_next/image")
  ) {
    event.respondWith(cacheFirst(request));
  }
});

async function networkFirstNavigation(request) {
  try {
    // Always live: these responses are per-user and must never be cached.
    return await fetch(request);
  } catch {
    const cache = await caches.open(SHELL_CACHE);
    const fallback = await cache.match(OFFLINE_URL);
    if (fallback) return fallback;
    return new Response("You are offline.", {
      status: 503,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }
}

async function cacheFirst(request) {
  const cache = await caches.open(ASSET_CACHE);
  const cached = await cache.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response && response.ok && response.type === "basic") {
      await cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const fallback = await cache.match(request);
    if (fallback) return fallback;
    throw error;
  }
}
