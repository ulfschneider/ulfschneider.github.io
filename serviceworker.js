const STATIC = 'static';
const RUNTIME = 'runtime';
const IMAGE = 'image';

const CACHE_NAME = 'cache';

const STATIC_CACHE_MINUTES = 60 * 24; //one day
const IMAGE_CACHE_MINUTES = 60 * 24 * 10; //cache for 10 days
const IMAGE_CACHE_LIMIT_COUNT = 150; //cache 150 images

//!!!! if you change the url, change it also in the URLS_TO_IGNORE in the offline page !!!!
const OFFLINE_URL = '/offline/';

const STATIC_CACHE_NAME = `${STATIC}-${CACHE_NAME}`;
const IMAGE_CACHE_NAME = `${IMAGE}-${CACHE_NAME}`;
const RUNTIME_CACHE_NAME = `${RUNTIME}-${CACHE_NAME}`;
const CACHE_NAMES = [STATIC_CACHE_NAME, IMAGE_CACHE_NAME, RUNTIME_CACHE_NAME];

const STATIC_PRECACHE_URLS = [
    OFFLINE_URL
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

function setExpire(headers, minutes) {
    minutes = minutes ? minutes : CACHE_MINUTES;

    let expires = new Date();
    expires.setMinutes(expires.getMinutes() + minutes);
    headers.append(`${CACHE_NAME}-expires`, expires.toUTCString());
}

function getExpire(headers) {
    const expires = headers.get(`${CACHE_NAME}-expires`);
    return expires ? Date.parse(expires) : 0;
}

async function maintainExpiration(response, expireMinutes) {

    cloneHeaders = function (response) {
        let headers = new Headers();
        for (var kv of response.headers.entries()) {
            headers.append(kv[0], kv[1]);
        }
        return headers;
    }

    cloneResponse = async function (response, headers) {
        try {
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

    if (expireMinutes > 0 && response.type != 'opaque') {
        //unfortunately, for opaque response types 
        //the expiration cannot be controlled here
        let headers = cloneHeaders(response);
        setExpire(headers, expireMinutes);
        return cloneResponse(response, headers);
    } else {
        return response;
    }

}

async function ensureCacheLimit(cacheName, limitCount) {
    try {
        if (limitCount > 0) {
            let cache = await caches.open(cacheName);
            let keys = await cache.keys();
            let removeCount = keys.length - limitCount;
            for (let i = 0; i < removeCount; i++) {
                devlog(`Removing from ${cacheName} to ensure cache limit of ${limitCount}: ${keys[i].url}`);
                await cache.delete(keys[i]).catch(error => console.error(error));
            }
        }
    } catch (error) {
        console.error(error);
    }
}

async function putResponseIntoCache({ request, response, cacheName, expireMinutes, limitCount }) {
    try {
        let metaResponse = await maintainExpiration(response, expireMinutes)
        let cache = await caches.open(cacheName);
        devlog(`Putting into ${cacheName}: ${request.url}`);
        let result = cache.put(request, metaResponse);
        await ensureCacheLimit(cacheName, limitCount);
        return result;
    } catch (error) {
        console.error(error);
    }
}

function isExpired(response) {
    const expires = getExpire(response.headers);

    if (expires > 0) {
        const now = new Date();
        if (expires < now) {
            return true; //response is expired
        }
    }
    return false;
}


//precache on install
addEventListener('install', event => {
    const precache = async function () {
        let staticCache = await caches.open(STATIC_CACHE_NAME);
        for (let url of STATIC_PRECACHE_URLS) {
            try {
                await staticCache.add(url); //TODO put offline page into runtime cache
            } catch (err) {
                console.error(`Failure when adding ${url} to ${STATIC_CACHE_NAME}`, err);
            }
        }
    }

    skipWaiting();
    event.waitUntil(precache())
});

//remove old static caches on activate    
addEventListener('activate', event => {
    const cleanUpCaches = async function () {
        return caches
            .keys()
            .then(cacheNames => cacheNames.filter(name => !CACHE_NAMES.includes(name)))
            .then(cacheNames => Promise.all(cacheNames.map(name => caches.delete(name))))
            .then(() => clients.claim());
    }

    event.waitUntil(cleanUpCaches());
});


async function networkFirst(event) {
    const request = event.request;
    try {
        if (request.headers.get('Accept').includes('text/html')) {
            devlog(`Responding from network ${request.url}`);
            let responseFromNetwork = await fetch(request);
            if (responseFromNetwork) {
                await putResponseIntoCache({
                    cacheName: RUNTIME_CACHE_NAME,
                    request: request,
                    response: responseFromNetwork.clone()
                });
            }
            return responseFromNetwork;
        }
    } catch (error) {
        console.error(error);
    }
}


async function cacheFirst(event) {
    const request = event.request;
    const responseFromCache = await caches.match(request);

    const fetchAndCache = async function () {
        return fetch(request)
            .then(async responseFromNetwork => {

                if (!responseFromCache
                    || isExpired(responseFromCache)
                    || getExpire(responseFromCache.headers) == 0) {

                    const url = new URL(request.url);
                    if (/\/manifest\.json$/.test(url.pathname)) {
                        await putResponseIntoCache({
                            cacheName: STATIC_CACHE_NAME,
                            expireMinutes: STATIC_CACHE_MINUTES,
                            request: request,
                            response: responseFromNetwork.clone()
                        });
                    } else if (/js$/.test(url.pathname)) {
                        await putResponseIntoCache({
                            cacheName: STATIC_CACHE_NAME,
                            expireMinutes: STATIC_CACHE_MINUTES,
                            request: request,
                            response: responseFromNetwork.clone()
                        });
                    } else if (/css[2]?$/.test(url.pathname)) {
                        await putResponseIntoCache({
                            cacheName: STATIC_CACHE_NAME,
                            expireMinutes: STATIC_CACHE_MINUTES,
                            request: request,
                            response: responseFromNetwork.clone()
                        });
                    } else if (/(woff[2]?|ttf|otf|sfnt)$/.test(url.pathname)) {
                        await putResponseIntoCache({
                            cacheName: STATIC_CACHE_NAME,
                            expireMinutes: STATIC_CACHE_MINUTES,
                            request: request,
                            response: responseFromNetwork.clone()
                        });
                    } else if (/(jpg|jpeg|ico|png|gif|svg)$/.test(url.pathname)) {
                        await putResponseIntoCache({
                            cacheName: IMAGE_CACHE_NAME,
                            expireMinutes: IMAGE_CACHE_MINUTES,
                            limitCount: IMAGE_CACHE_LIMIT_COUNT,
                            request: request,
                            response: responseFromNetwork.clone()
                        });
                    }
                }

                return responseFromNetwork;
            }).catch(error => {
                devlog(error);
                if (responseFromCache) {
                    //use an outdated cache response, 
                    //because that is better than nothing
                    return responseFromCache;
                } else {
                    return caches.match(OFFLINE_URL);
                }
            });
    }

    if (responseFromCache && !isExpired(responseFromCache)) {
        devlog(`Responding from cache ${request.url}`);
        fetchAndCache(); //call without await
        return responseFromCache;
    } else {
        return fetchAndCache();
    }

}


addEventListener('fetch', event => {
    const request = event.request;
    const handleEvent = async function () {
        let networkFirstResponse = await networkFirst(event);
        if (networkFirstResponse) {
            return networkFirstResponse;
        } else {
            let cacheFirstResponse = await cacheFirst(event);
            return cacheFirstResponse;
        }
    }


    devlog('Requesting ' + request.url);
    event.respondWith(handleEvent());
});



