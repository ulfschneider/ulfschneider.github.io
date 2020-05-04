const STATIC = 'static';
const RUNTIME = 'runtime';
const IMAGE = 'image';

const CACHE_NAME = 'cache';

const STATIC_CACHE_MINUTES = 60 * 24; //expire cache entries after one day
const IMAGE_CACHE_MINUTES = 60 * 24 * 10; //expire cache entries after 10 days
const FONT_CACHE_MINUTES = 60 * 24 * 30; //expire fonts after 30 days
const IMAGE_CACHE_MAX_ITEMS = 100; //cache this amount of images, not more

const STATIC_CACHE_NAME = `${STATIC}-${CACHE_NAME}`;
const IMAGE_CACHE_NAME = `${IMAGE}-${CACHE_NAME}`;
const RUNTIME_CACHE_NAME = `${RUNTIME}-${CACHE_NAME}`;
const CACHE_NAMES = [STATIC_CACHE_NAME, IMAGE_CACHE_NAME, RUNTIME_CACHE_NAME];

//!!!! if you change the url, change it also in the URLS_TO_IGNORE in the offline page !!!!
const OFFLINE_URL = '/offline/';
const NOT_FOUND_URL = "/404.html";

const STATIC_PRECACHE_URLS = [
    OFFLINE_URL,
    NOT_FOUND_URL,
    '/',
    '/reading/',
    '/articles/',
    '/tools/',
    '/journal/',
    '/search/',
    '/colophon/',
    '/ownership/',
    'https://unpkg.com/lunr/lunr.js',
    '/fonts/ibm-plex-serif-v8-latin-regular.woff2',
    '/fonts/ibm-plex-serif-v8-latin-regular.woff',
    '/fonts/ibm-plex-serif-v8-latin-italic.woff2',
    '/fonts/ibm-plex-serif-v8-latin-italic.woff',
    '/fonts/ibm-plex-serif-v8-latin-700.woff2',
    '/fonts/ibm-plex-serif-v8-latin-700.woff',
    '/fonts/ibm-plex-serif-v8-latin-700italic.woff2',
    '/fonts/ibm-plex-serif-v8-latin-700italic.woff',
    '/fonts/ibm-plex-sans-v7-latin-regular.woff2',
    '/fonts/ibm-plex-sans-v7-latin-regular.woff',
    '/fonts/ibm-plex-sans-v7-latin-italic.woff2',
    '/fonts/ibm-plex-sans-v7-latin-italic.woff',
    '/fonts/ibm-plex-sans-v7-latin-200.woff2',
    '/fonts/ibm-plex-sans-v7-latin-200.woff',
    '/fonts/ibm-plex-sans-v7-latin-700.woff2',
    '/fonts/ibm-plex-sans-v7-latin-700.woff',
    '/fonts/ibm-plex-sans-v7-latin-700italic.woff2',
    '/fonts/ibm-plex-sans-v7-latin-700italic.woff',
    '/fonts/ibm-plex-mono-v5-latin-regular.woff2',
    '/fonts/ibm-plex-mono-v5-latin-regular.woff',
    '/fonts/ibm-plex-mono-v5-latin-italic.woff2',
    '/fonts/ibm-plex-mono-v5-latin-italic.woff',
    '/fonts/ibm-plex-mono-v5-latin-700.woff2',
    '/fonts/ibm-plex-mono-v5-latin-700.woff',
    '/fonts/ibm-plex-mono-v5-latin-700italic.woff2',
    '/fonts/ibm-plex-mono-v5-latin-700italic.woff',
];



const NO_CACHE_URLS = [
    '/feed.xml/'
]


//preCache on install
addEventListener('install', async event => {
    await event.waitUntil(preCache())
    await skipWaiting(); //ensure that updates to the underlying 
    //service worker take effect immediately 
});


//remove old static caches on activate  
addEventListener('activate', async event => {
    const activate = async function () {
        await clearOldCaches();
        await clients.claim(); //let this service worker set itself 
        //as the controller for all clients within its scope        
        //use clients.claim() inside to 
        //the "activate" event listener 
        //so that clients do not need to be reloaded 
        //before their fetches will go through this service worker
    }
    await event.waitUntil(activate());
});


//the trimCache command must be sent from the onload event of 
//the page where the service worker is registered
//https://medium.com/@brandonrozek/limiting-the-cache-in-service-workers-revisited-f0245713e67e
addEventListener("message", event => {
    var data = event.data;
    if (data.command == "trimCache") {
        devlog(`Trimming ${IMAGE_CACHE_NAME} to a max limit of ${IMAGE_CACHE_MAX_ITEMS} items`);
        trimCache({ cacheName: IMAGE_CACHE_NAME, maxItems: IMAGE_CACHE_MAX_ITEMS });
    }
});


//react on requests
addEventListener('fetch', event => {
    const request = event.request;

    const handleEvent = async function () {
        if (request.headers.get('Accept').includes('text/html')) {
            let networkFirstResponse = await networkFirst(event);
            if (networkFirstResponse) {
                return networkFirstResponse;
            }
        }

        return cacheFirst(event);
    }

    devlog('Requesting ' + request.url);
    event.respondWith(handleEvent());
});


//// helpers 

async function preCache() {
    for (let url of STATIC_PRECACHE_URLS) {
        try {
            await fetchAndCache({ request: makeURL(url) });
        } catch (err) {
            console.error(`Failure when adding ${url} to ${STATIC_CACHE_NAME}`, err);
        }
    }
}


async function clearOldCaches() {
    return caches
        .keys()
        .then(cacheNames => cacheNames.filter(name => !CACHE_NAMES.includes(name)))
        .then(cacheNames => Promise.all(cacheNames.map(name => caches.delete(name))));
}


async function networkFirst(event) {
    const request = event.request;
    
    return fetchAndCache({ request: request })
        .catch(error => deverror('Failure in network first operation ' + error));
}


async function cacheFirst(event) {
    const request = event.request;
    const responseFromCache = await caches.match(request);

    if (responseFromCache && !isExpired(responseFromCache)) {
        devlog(`Responding from cache ${request.url}`);

        //clone response and call without await
        fetchAndCache({ request: request, responseFromCache: responseFromCache.clone() })
            .catch(error => deverror('Failure in cache first operation ' + error));

        return responseFromCache;
    } else {
        return fetchAndCache({ request: request })
            .catch(error => {
                devlog('Failure in cache first operation ' + error);
                if (responseFromCache) {
                    //use an outdated cache response, 
                    //because that is better than nothing
                    return responseFromCache;
                } else {
                    return caches.match(OFFLINE_URL);
                }
            });;
    }
}


async function fetchAndCache({ request, responseFromCache }) {

    if (responseFromCache
        && getExpire(responseFromCache) > 0
        && !isExpired(responseFromCache)) {
        //we have a cache entry that´s not expired
        //no need to bother the network
        return responseFromCache;
    }

    if (typeof request == 'string' || request instanceof String || request instanceof URL) {
        request = new Request(request);
    }

    let url = new URL(request.url);

    if (responseFromCache) {
        //we have a cache entry, but it´s expired 
        //or we have no expiration date for the entry
        //therefore we have to update from the network
        devlog(`Updating cache ${url}`);
    } else {
        //we have no cache and therefore have
        //to fetch a response from the network
        devlog(`Responding from network ${url}`);
    }
    return fetch(request)
        .then(async responseFromNetwork => {

            if (NO_CACHE_URLS.includes(url.pathname + url.search) || NO_CACHE_URLS.includes(url)) {
                return responseFromNetwork;
            }

            let accept = request.headers.get('Accept');
            if (accept && accept.includes('text/html')
                || /^\/.+\/(\?|$)/.test(url.pathname)) {
                await stashInCache({
                    cacheName: RUNTIME_CACHE_NAME,
                    request: request,
                    response: responseFromNetwork.clone()
                });
            } else if (/\/manifest\.json$/.test(url.pathname)) {
                await stashInCache({
                    cacheName: STATIC_CACHE_NAME,
                    expireMinutes: STATIC_CACHE_MINUTES,
                    request: request,
                    response: responseFromNetwork.clone()
                });
            } else if (/js$/.test(url.pathname)) {
                await stashInCache({
                    cacheName: STATIC_CACHE_NAME,
                    expireMinutes: STATIC_CACHE_MINUTES,
                    request: request,
                    response: responseFromNetwork.clone()
                });
            } else if (/css[2]?$/.test(url.pathname)) {
                await stashInCache({
                    cacheName: STATIC_CACHE_NAME,
                    expireMinutes: STATIC_CACHE_MINUTES,
                    request: request,
                    response: responseFromNetwork.clone()
                });
            } else if (/(woff[2]?|ttf|otf|sfnt)$/.test(url.pathname)) {
                await stashInCache({
                    cacheName: STATIC_CACHE_NAME,
                    expireMinutes: FONT_CACHE_MINUTES,
                    request: request,
                    response: responseFromNetwork.clone()
                });
            } else if (/(jpg|jpeg|ico|png|gif|svg)$/.test(url.pathname)) {
                await stashInCache({
                    cacheName: IMAGE_CACHE_NAME,
                    expireMinutes: IMAGE_CACHE_MINUTES,
                    request: request,
                    response: responseFromNetwork.clone()
                });
            }

            return responseFromNetwork;
        });
}


function devlog(message) {
    if (location.hostname == 'localhost') {
        console.log(message);
    }
}


function deverror(message) {
    if (location.hostname == 'localhost') {
        console.error(message);

    }
}


function makeURL(url) {
    if ((typeof url == 'string' || url instanceof String) && !url.startsWith('http')) {
        return new URL(url, location.origin);
    }
    return new URL(url);

}


function getExpire(response) {
    const expires = response.headers.get(`${CACHE_NAME}-expires`);
    return expires ? Date.parse(expires) : 0;
}


async function maintainExpiration({ response, expireMinutes }) {

    cloneHeaders = function (response) {
        let headers = new Headers();
        for (var kv of response.headers.entries()) {
            headers.append(kv[0], kv[1]);
        }
        return headers;
    }

    cloneResponse = async function (response) {
        try {
            let headers = cloneHeaders(response);

            let expires = new Date();
            expires.setMinutes(expires.getMinutes() + expireMinutes);
            headers.append(`${CACHE_NAME}-expires`, expires.toUTCString());

            let blob = await response.blob();
            return new Response(blob, {
                status: response.status,
                statusText: response.statusText,
                headers: headers ? headers : response.headers
            });
        } catch (error) {
            console.error(error);
            return response;
        }
    }

    if (expireMinutes > 0 && response.type != 'opaque' && response.type != 'error') {
        //unfortunately, for opaque response types 
        //the expiration cannot be controlled here        
        return cloneResponse(response);
    } else {
        return response;
    }
}

//https://medium.com/@adactio/cache-limiting-in-service-workers-d6741361ca19
async function trimCache({ cacheName, maxItems }) {
    try {
        let cache = await caches.open(cacheName);
        let keys = await cache.keys();
        if (keys.length > maxItems) {
            await cache.delete(keys[0]);
            await trimCache({ cacheName: cacheName, maxItems: maxItems });
        }
    } catch (error) {
        console.error(error);
    }
}


async function stashInCache({ request, response, cacheName, expireMinutes }) {
    try {
        if (response.type != 'error' && response.type != 'opaque') {
            let metaResponse = await maintainExpiration({ response: response, expireMinutes: expireMinutes })
            let cache = await caches.open(cacheName);
            devlog(`Putting into ${cacheName}: ${request.url}`);
            return cache.put(request, metaResponse);
        }
    } catch (error) {
        console.error(error);
    }
}


function isExpired(response) {
    const expires = getExpire(response);

    if (expires > 0) {
        const now = new Date();
        if (expires < now) {
            return true; //response is expired
        }
    }
    return false;
}