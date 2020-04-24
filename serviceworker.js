const STATIC = 'static';
const RUNTIME = 'runtime';
const CACHE_NAME = 'cache';
const CACHE_VERSION = Date.now();

//!!!! if you change the url, change it also in the URLS_TO_IGNORE in the offline page !!!!
const OFFLINE_URL = '/offline/';


const STATIC_CACHE_NAME = `${STATIC}-${CACHE_NAME}-${CACHE_VERSION}`;
const RUNTIME_CACHE_NAME = `${RUNTIME}-${CACHE_NAME}-${CACHE_VERSION}`;

const STATIC_PRECACHE_URLS = [
    OFFLINE_URL,
    '/css/main.css',
    '/favicon.ico',
    '/apple-touch-icon.png',
    '/manifest.json',
    '/r/active-toc.min.js',
    '/r/dynamic-header.min.js',
    '/r/fluid-vids.min.js',
    'https://unpkg.com/lunr/lunr.js',
    'https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@0,400;0,700;1,400;1,700&family=IBM+Plex+Sans:wght@200;400;700&family=IBM+Plex+Mono:ital,wght@0,400;0,700;1,400&display=swap'
];


//logging on localhost
function devlog(message) {
    if (location.hostname == 'localhost') {
        console.log(message);
    }
}

//error logging on localhost
function deverror(message) {
    if (location.hostname == 'localhost') {
        console.error(message);
    }
}

//precache on install
addEventListener('install', event => {
    skipWaiting();
    event.waitUntil(
        caches.open(STATIC_CACHE_NAME)
            .then(async staticCache => {
                for (let url of STATIC_PRECACHE_URLS) {
                    try {
                        await staticCache.add(url);
                    } catch (err) {
                        deverror(`Failure when adding ${url} to ${STATIC_CACHE_NAME}`, err);
                    }
                }
            })
    )
});

//remove old static caches on activate    
addEventListener('activate', event => {
    event.waitUntil(
        caches
            .keys()
            .then(cacheNames => cacheNames.filter(name => name.includes(STATIC) && !name.endsWith(CACHE_VERSION)))
            .then(cacheNames => Promise.all(cacheNames.map(name => caches.delete(name))))
            .then(() => clients.claim())
    );
});

//return the contents of the cache, if available, otherwise use the network
addEventListener('fetch', event => {
    const request = event.request;
    devlog('Requesting ' + request.url);

    event.respondWith(
        caches.match(request)
            .then(responseFromCache => {
                if (responseFromCache) {
                    devlog(`Responding from cache ${request.url}`);
                    return responseFromCache;
                }
                devlog(`Responding from network ${request.url}`);
                return fetch(request)
                    .catch(error => caches.match(OFFLINE_URL));
            })
    );
});


