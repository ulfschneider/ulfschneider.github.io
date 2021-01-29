const CACHE_VERSION = 'v4'; //version is used to remove old caches

const STATIC = 'static';
const RUNTIME = 'runtime';
const IMAGE = 'image';
const FONT = 'font';
const CACHE_NAME = 'cache';

const STATIC_CACHE_NAME = `${STATIC}-${CACHE_NAME}-${CACHE_VERSION}`;
const FONT_CACHE_NAME = `${FONT}-${CACHE_NAME}-${CACHE_VERSION}`;
const IMAGE_CACHE_NAME = `${IMAGE}-${CACHE_NAME}-${CACHE_VERSION}`;
const RUNTIME_CACHE_NAME = `${RUNTIME}-${CACHE_NAME}-${CACHE_VERSION}`;
const CACHE_NAMES = [FONT_CACHE_NAME, STATIC_CACHE_NAME, IMAGE_CACHE_NAME, RUNTIME_CACHE_NAME];

const CACHE_SETTINGS = {
    [STATIC_CACHE_NAME]: {
        maxAgeMinutes: 60 * 24 //expire static entries after one day
    },
    [FONT_CACHE_NAME]: {
        maxAgeMinutes: 60 * 24 * 180 //expire fonts after 180 days
    },
    [RUNTIME_CACHE_NAME]: {
        maxAgeMinutes: 60 * 24 //expire runtime entries after one day
    },
    [IMAGE_CACHE_NAME]: {
        maxAgeMinutes: 60 * 24 * 10, //expire images after 10 days
        maxItems: 100 //cache this amount of images, not more
    }
}

//!!!! if you change the url, change it also in the URLS_TO_IGNORE in the offline page !!!!
const OFFLINE_URL = '/offline/';

const NO_CACHE_URLS = [
    '/feed.xml/'
]

const PRECACHE_URLS = [
    OFFLINE_URL,
    '/',
    '/reading/',
    '/articles/',
    '/tools/',
    '/journal/',
    '/search/',
    '/colophon/',
    '/ownership/',
    '/r/fit-vids.js',
    '/r/measure-load-time.js',
    '/fonts/ibm-plex-serif-v8-latin-regular.woff2',
    '/fonts/ibm-plex-serif-v8-latin-italic.woff2',
    '/fonts/ibm-plex-serif-v8-latin-700.woff2',
    '/fonts/ibm-plex-serif-v8-latin-700italic.woff2',
    '/fonts/ibm-plex-sans-v7-latin-regular.woff2',
    '/fonts/ibm-plex-sans-v7-latin-italic.woff2',
    '/fonts/ibm-plex-sans-v7-latin-200.woff2',
    '/fonts/ibm-plex-sans-v7-latin-700.woff2',
    '/fonts/ibm-plex-sans-v7-latin-700italic.woff2',
    '/fonts/ibm-plex-mono-v5-latin-regular.woff2',
    '/fonts/ibm-plex-mono-v5-latin-italic.woff2',
    '/fonts/ibm-plex-mono-v5-latin-700.woff2',
    '/fonts/ibm-plex-mono-v5-latin-700italic.woff2',
    'https://unpkg.com/lunr/lunr.js'
];


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
        for (let cacheName of CACHE_NAMES) {
            if (CACHE_SETTINGS[cacheName]) {
                const maxItems = CACHE_SETTINGS[cacheName].maxItems;
                if (maxItems) {
                    devlog(`Trimming ${cacheName} to a max limit of ${maxItems} items`);
                    trimCache({ cacheName: cacheName, maxItems: maxItems });
                }
            }
        }
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
    for (let url of PRECACHE_URLS) {
        try {
            await fetchAndCache(makeURL(url));
        } catch (err) {
            console.error(`Failure when caching ${url}:` + err);
        }
    }
}


async function clearOldCaches() {
    return caches
        .keys()
        .then(cacheNames => cacheNames.filter(name => CACHE_NAMES.indexOf(name) == -1))
        .then(cacheNames => Promise.all(cacheNames.map(name => caches.delete(name))));
}


async function networkFirst(event) {
    const request = event.request;

    return fetchAndCache(request)
        .catch(error => deverror('Failure in network first operation: ' + error));
}


async function cacheFirst(event, options) {
    options = options ? options : {};
    const request = event.request;
    const responseFromCache = await caches.match(request, options);

    if (responseFromCache && !isExpired(responseFromCache)) {
        devlog(`Responding from cache ${request.url}`);

        if (options.revalidate) {
            //clone response and call without await
            options.responseFromCache = responseFromCache.clone();
            fetchAndCache(request, options)
                .catch(error => deverror('Failure in cache first operation: ' + error));
        }

        return responseFromCache;
    } else {
        return fetchAndCache(request, options)
            .catch(error => {
                deverror('Failure in cache first operation: ' + error);
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




async function fetchAndCache(request, options) {
    options = options ? options : {};
    if (options.responseFromCache
        && getExpire(options.responseFromCache) > 0
        && !isExpired(options.responseFromCache)
        && !options.revalidate) {
        //we have a cache entry that´s not expired
        //and we do not enforce a revalidation
        //no need to bother the network        
        return options.responseFromCache;
    }

    if (typeof request == 'string'
        || request instanceof String
        || request instanceof URL) {
        request = new Request(request);
    }

    let url = new URL(request.url);

    if (options.responseFromCache) {
        //we have a cache entry, but it´s expired 
        //or we have no expiration date for the entry
        //or we enforce a revalidation
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
                || /^\/.+\/$/.test(url.pathname)) {
                await stashInCache({
                    cacheName: RUNTIME_CACHE_NAME,
                    request: request,
                    response: responseFromNetwork.clone(),
                    options
                });
            } else if (/\/manifest\.json$/.test(url.pathname)) {
                await stashInCache({
                    cacheName: STATIC_CACHE_NAME,
                    request: request,
                    response: responseFromNetwork.clone(),
                    options,
                });
            } else if (/js$/.test(url.pathname)) {
                await stashInCache({
                    cacheName: STATIC_CACHE_NAME,
                    request: request,
                    response: responseFromNetwork.clone(),
                    options
                });
            } else if (/css[2]?$/.test(url.pathname)) {
                await stashInCache({
                    cacheName: STATIC_CACHE_NAME,
                    request: request,
                    response: responseFromNetwork.clone(),
                    options
                });
            } else if (/(woff[2]?|ttf|otf|sfnt)$/.test(url.pathname)) {
                await stashInCache({
                    cacheName: FONT_CACHE_NAME,
                    request: request,
                    response: responseFromNetwork.clone(),
                    options
                });
            } else if (/(jpg|jpeg|ico|png|gif|svg)$/.test(url.pathname)) {
                await stashInCache({
                    cacheName: IMAGE_CACHE_NAME,
                    request: request,
                    response: responseFromNetwork.clone(),
                    options
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


async function maintainExpiration({ response, maxAgeMinutes }) {

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
            expires.setMinutes(expires.getMinutes() + maxAgeMinutes);
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

    if (maxAgeMinutes > 0 && !response.type.includes('opaque') && response.type != 'error') {
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

function isValidToCache({ request, response }) {
    const url = new URL(request.url);
    if (/^\/browser-sync\//.test(url.pathname)) {
        devlog(`Refusing to cache because of browser-sync request: ${request.url}`);
        return false;
    }
    if (request.method == 'POST') {
        devlog(`Refusing to cache because of POST request: ${request.url}`);
        return false;
    }
    if (request.method == 'PUT') {
        devlog(`Refusing to cache because of PUT request: ${request.url}`);
        return false;
    }
    if (response.type == 'error') {
        devlog(`Refusing to cache because of error response: ${request.url}`);
        return false;
    }
    if (response.type == 'opaque') {
        devlog(`Refusing to cache because of opaque response: ${request.url}`);
        return false;
    }
    return true;
}

async function stashInCache({ request, response, cacheName, options }) {
    options = options ? options : {};
    try {
        if (isValidToCache({ request: request, response: response })) {

            if (!options.maxAgeMinutes && CACHE_SETTINGS[cacheName]) {
                options.maxAgeMinutes = CACHE_SETTINGS[cacheName].maxAgeMinutes;
            }

            let metaResponse = await maintainExpiration({ response: response, maxAgeMinutes: options.maxAgeMinutes })
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