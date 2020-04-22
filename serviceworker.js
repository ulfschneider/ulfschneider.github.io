importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

//!!!! if you change the prefix, change it also in the offline page !!!!
const CACHE_PREFIX = 'ulf-codes';

const CACHE_SUFFIX = 'v2';
const PRECACHE_NAME = 'precache';
const RUNTIME_CACHE_NAME = 'cache';

//!!!! if you change the url, change it also in the URLS_TO_IGNORE in the offline page !!!!
const OFFLINE_URL = '/offline/';

if (!workbox) {
    console.error('Workbox didn´t load');
}

if (workbox) {
    const { cacheNames, setCacheNameDetails } = workbox.core;
    const { registerRoute } = workbox.routing;
    const { precacheAndRoute } = workbox.precaching;
    const { CacheFirst, NetworkFirst, StaleWhileRevalidate } = workbox.strategies;
    const { CacheableResponsePlugin } = workbox.cacheableResponse;
    const { ExpirationPlugin } = workbox.expiration;

    setCacheNameDetails({
        prefix: CACHE_PREFIX,
        suffix: CACHE_SUFFIX,
        precache: PRECACHE_NAME,
        runtime: RUNTIME_CACHE_NAME,
    });

    //Remove old caches    
    addEventListener('activate', event => {
        event.waitUntil(
            caches
                .keys()
                .then(keys => keys.filter(key => !key.endsWith(CACHE_SUFFIX)))
                .then(keys => Promise.all(keys.map(key => caches.delete(key))))
        );
    });

    // Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
    registerRoute(
        /'^https:\/\/fonts\.googleapis\.com'/,
        new StaleWhileRevalidate({
            cacheName: 'google-fonts-stylesheets',
        })
    );

    // Cache the underlying font files with a cache-first strategy for 1 year.
    registerRoute(
        /^https:\/\/fonts\.gstatic\.com'/,
        new CacheFirst({
            cacheName: 'google-fonts-webfonts',
            plugins: [
                new CacheableResponsePlugin({
                    statuses: [0, 200],
                }),
                new ExpirationPlugin({
                    maxAgeSeconds: 60 * 60 * 24 * 365,
                    maxEntries: 30,
                }),
            ],
        })
    );

    registerRoute(
        /\.(?:png|gif|jpg|jpeg|webp|svg|ico)$'/,
        new CacheFirst({
            cacheName: 'images',
            plugins: [
                new ExpirationPlugin({
                    maxEntries: 75,
                    maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
                }),
            ],
        })
    );

    precacheAndRoute([
        { url: '/r/lunr.js', revision: null },
        { url: '/r/active-toc.min.js', revision: null },
        { url: '/r/dynamic-header.min.js', revision: null },
        { url: OFFLINE_URL, revision: null }
    ]);

    registerRoute(
        /\.(?:js|css|manifest\.json)$/,
        new StaleWhileRevalidate({
            cacheName: CACHE_PREFIX + '-static-cache'
        })
    );


    const networkFirst = new NetworkFirst({
        cacheName: cacheNames.runtime
    })

    const networkFirstHandler = async (args) => {
        try {
            const response = await networkFirst.handle(args);
            return response || await caches.match(OFFLINE_URL);
        } catch (error) {
            return await caches.match(OFFLINE_URL);
        }
    };

    registerRoute(
        /.*\//,
        networkFirstHandler
    );

}


