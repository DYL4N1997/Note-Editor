// TODO: Create a service worker that caches static assets:
const { warmStrategyCache } = require("workbox-recipes");
const { CacheFirst } = require("workbox-strategies");
const { registerRoute } = require("workbox-routing");
const { CacheableResponsePlugin } = require("workbox-cacheable-response");
const { ExpirationPlugin } = require("workbox-expiration");
const { precacheAndRoute } = require("workbox-precaching/precacheAndRoute");

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

registerRoute(({ request }) => request.mode === "navigate", pageCache);

warmStrategyCache({
    urls: ["/index.html", "/"],
    strategy: pageCache,
  });

// asset caching
registerRoute(
    ({ request }) => request.destination === 'image',
    new CacheFirst({
      // Identification stringof the cache storage.
      cacheName: 'asset-cache',
      plugins: [
      // This plugin will cache responses with headers, maximum time of 30 days
        new CacheableResponsePlugin({
          statuses: [0, 200],
        }),
      ],
    })
  );
