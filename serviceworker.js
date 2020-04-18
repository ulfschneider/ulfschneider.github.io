importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

if (!workbox) {
    console.error('Workbox didn´t load');
}

if (workbox) {

    const { registerRoute } = workbox.routing;
    const { CacheFirst, StaleWhileRevalidate } = workbox.strategies;
    const { CacheableResponsePlugin } = workbox.cacheableResponse;
    const { ExpirationPlugin } = workbox.expiration;

    //For everything that´s to be loaded from this site, use stale-while-revalidate strategy
    registerRoute(
        new RegExp('/'),
        new StaleWhileRevalidate()
    );

    // Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
    registerRoute(
        /^https:\/\/fonts\.googleapis\.com/,
        new StaleWhileRevalidate({
            cacheName: 'google-fonts-stylesheets',
        })
    );

    // Cache the underlying font files with a cache-first strategy for 1 year.
    registerRoute(
        /^https:\/\/fonts\.gstatic\.com/,
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
        /\.(?:png|gif|jpg|jpeg|webp|svg)$/,
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
        /\.(?:js|css)$/,
        new StaleWhileRevalidate({
            cacheName: 'static-resources',
        })
    );

}