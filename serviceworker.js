importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

if (!workbox) {
    console.error('Workbox didn´t load');
}

if (workbox) {

    const { registerRoute } = workbox.routing;
    const { precacheAndRoute } = workbox.precaching;
    const { CacheFirst, StaleWhileRevalidate } = workbox.strategies;
    const { CacheableResponsePlugin } = workbox.cacheableResponse;
    const { ExpirationPlugin } = workbox.expiration;

    precacheAndRoute([
        { url: '/search/', revision: null },
        { url: '/r/lunr.js', revision: null }
    ], {
        // Ignore all URL parameters.
        ignoreURLParametersMatching: [/.*/]
    });


    //For everything that´s to be loaded from this site, use stale-while-revalidate strategy
    registerRoute(
        new RegExp('\/.*'),
        new StaleWhileRevalidate()
    );

    // Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
    registerRoute(
        new RegExp('^https:\/\/fonts\.googleapis\.com'),
        new StaleWhileRevalidate({
            cacheName: 'google-fonts-stylesheets',
        })
    );

    // Cache the underlying font files with a cache-first strategy for 1 year.
    registerRoute(
        new RegExp('^https:\/\/fonts\.gstatic\.com'),
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
        new RegExp('\.(?:png|gif|jpg|jpeg|webp|svg)$'),
        new CacheFirst({
            cacheName: 'images',
            plugins: [
                new ExpirationPlugin({
                    maxEntries: 60,
                    maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
                }),
            ],
        })
    );

    registerRoute(
        new RegExp('\.(?:js|css)$'),
        new StaleWhileRevalidate({
            cacheName: 'static-resources',
        })
    );

}