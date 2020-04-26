const STATIC = 'static';
const RUNTIME = 'runtime';
const IMAGE = 'image';

const CACHE_NAME = 'cache';
const CACHE_MINUTES = 60 * 24 * 30; //30 days
const CACHE_VERSION = Date.now();

const IMAGE_CACHE_MINUTES = 60 * 24 * 10; //10 days

//!!!! if you change the url, change it also in the URLS_TO_IGNORE in the offline page !!!!
const OFFLINE_URL = '/offline/';


const STATIC_CACHE_NAME = `${STATIC}-${CACHE_NAME}-${CACHE_VERSION}`;
const IMAGE_CACHE_NAME = `${IMAGE}-${CACHE_NAME}`;
const RUNTIME_CACHE_NAME = `${RUNTIME}-${CACHE_NAME}`;

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

async function cloneResponse(response, expireMinutes) {

    cloneHeaders = function (response) {
        let headers = new Headers();
        for (var kv of response.headers.entries()) {
            headers.append(kv[0], kv[1]);
        }
        return headers;
    }

    let clone = response.clone();
    if (expireMinutes) {
        let headers = cloneHeaders(clone);
        setExpire(headers, expireMinutes);
        return new Promise(resolve => {
            return clone.blob().then(blob => {
                resolve(new Response(blob, {
                    status: clone.status,
                    statusText: clone.statusText,
                    headers: headers
                }));
            });
        });
    } else {
        return Promise.resolve(clone);
    }
}

async function putIntoCache({ event, cacheName, expireMinutes, response }) {
    //TODO limit items in cache
    const request = event.request;
    return cloneResponse(response, expireMinutes)
        .then(clone => {
            return caches.open(cacheName)
                .then(cache => {
                    devlog(`Putting ${request.url} into ${cacheName}`);
                    return cache.put(request, clone);
                })
        }).catch(error => deverror(error));
}

async function getFromCache(request) {
    return caches.match(request, { ignoreSearch: true })
        .then(responseFromCache => {
            if (responseFromCache) {
                const expires = getExpire(responseFromCache.headers);
                if (!expires) {
                    return responseFromCache;
                }

                const now = new Date();
                if (expires > now) {
                    return responseFromCache;
                } else {
                    devlog(`${request.url} is expired in cache`);
                }
            }
        });
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
    const cleanUpCaches = async () => {
        caches
            .keys()
            .then(cacheNames => cacheNames.filter(name => name.includes(STATIC) && !name.endsWith(CACHE_VERSION)))
            .then(cacheNames => Promise.all(cacheNames.map(name => caches.delete(name))))
            .then(() => clients.claim());
    }

    event.waitUntil(cleanUpCaches());

});


function cacheFirst(event) {
    const request = event.request;

    event.respondWith(
        getFromCache(request)
            .then(responseFromCache => {
                if (responseFromCache) {
                    devlog(`Responding from cache ${request.url}`);
                    return responseFromCache;
                }
                devlog(`Responding from network ${request.url}`);
                return fetch(request)
                    .then(responseFromNetwork => {
                        const url = new URL(request.url);
                        if (url.hostname == 'fonts.gstatic.com' || url.hostname == 'fonts.googleapis.com') {
                            putIntoCache({ event: event, cacheName: STATIC_CACHE_NAME, response: responseFromNetwork });
                        } else if (/\.js$/.test(url.pathname)) {
                            putIntoCache({ event: event, cacheName: STATIC_CACHE_NAME, response: responseFromNetwork });
                        } else if (/\.css$/.test(url.pathname)) {
                            putIntoCache({ event: event, cacheName: STATIC_CACHE_NAME, response: responseFromNetwork });
                        } else if (/\.(jpg|jpeg|ico|png|gif|svg)$/.test(url.pathname)) {
                            putIntoCache({ event: event, cacheName: IMAGE_CACHE_NAME, expireMinutes: IMAGE_CACHE_MINUTES, response: responseFromNetwork });
                        }

                        return responseFromNetwork;
                    }).catch(error => {
                        deverror(error);
                        return caches.match(OFFLINE_URL);
                    });
            })
    );
}


addEventListener('fetch', event => {
    const request = event.request;
    devlog('Requesting ' + request.url);

    //TODO network first
    //if pathname is '\/.*\/$ or '\/.*\/\?
    //fetch network
    //put into cache
    //respond from network

    cacheFirst(event);
});


