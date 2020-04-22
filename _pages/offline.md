---
permalink: /offline/
title: You´re currently offline
---
<p>
<span id="we-are-offline"></span>
<span id="something-is-cached"></span>
</p>

<script>
  
const CACHE_PREFIX = 'ulf-codes'; //!!!!this prefix needs to be the same as what is used in the service worker!!!!
const URLS_TO_IGNORE = [/\/offline\/$/, /\.xml\/$/]; //!!!! the offline ignore pattern needs to be in sync with what is used in the service worker !!!

const WE_ARE_OFFLINE_ID = 'we-are-offline';
const WE_ARE_OFFLINE = `We can´t connect to <i>${location.hostname}</i> right now, and the page you want to see has not been saved for offline reading.`

const SOMETHING_IS_CACHED_ID = "something-is-cached";
const SOMETHING_IS_CACHED = 'However, these pages <i>have been</i> saved:'

async function evaluateCacheKeys(cacheName, cachedURLs) {
    if (cacheName.startsWith(CACHE_PREFIX)) {
         await caches.open(cacheName).then(async cache => {
             await cache.keys().then(requests => {                 

                requests.forEach(request => {
                    let url = new URL(request.url);
                    if (url.pathname.endsWith('/') && url.hostname == location.hostname) {
                        //i´m only interested in cached pages from my host   
                        //and the pages pathname must end with /                      
                        let ignore = false;
                        for (let pattern of URLS_TO_IGNORE) {
                            if (pattern.test(url.pathname)) {
                                ignore = true;
                                break;
                            }
                        }             
                        if (!ignore) {
                            cachedURLs.push(new URL(request.url));
                        }       
                    }
                });                
            });
        });
    } 
    return Promise.resolve(cachedURLs); 
}

async function evaluateCaches() {
    let cachedURLs = [];
    caches.keys().then(async cacheNames => {
        for(let name of cacheNames) {
            await evaluateCacheKeys(name, cachedURLs);
        }
        if (cachedURLs.length) {
            let weAreOffline = document.getElementById(WE_ARE_OFFLINE_ID);
            weAreOffline.innerHTML = WE_ARE_OFFLINE;
            let somethingCached = document.getElementById(SOMETHING_IS_CACHED_ID);
            somethingCached.innerHTML = SOMETHING_IS_CACHED;            
            let history = document.createElement('ul');
            history.classList = "reset";

            somethingCached.parentNode.insertBefore(history, somethingCached.nextSibling)                      
            for (let url of cachedURLs) {
                history.innerHTML += '<li><a href="' + url + '">' + url.pathname + '</a></li>';
            }
        }
    });
}

evaluateCaches();

</script>
