---
permalink: /offline/
title: You´re currently offline
---
We can´t connect to [{{site.url | remove:"https://"}}]({{site.url}}) right now, and the page you want to see has not been saved for offline reading. <span id="something-cached"></span>

<script>
  
const SOMETHING_CACHED_ID = "something-cached";
const OFFLINE_URL = '/offline';
const SOMETHING_CACHED = 'However, these pages <i>have been</i> saved:'

async function evaluateCacheKeys(cacheName, cachedURLs) {
    if (cacheName.startsWith('ulf-codes')) {
         await caches.open(cacheName).then(async cache => {
             await cache.keys().then(keys => {
                keys.forEach(request => {
                    if (request.url.endsWith('/') && !request.url.includes(OFFLINE_URL)) {
                        cachedURLs.push(new URL(request.url));
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
            let somethingCached = document.getElementById(SOMETHING_CACHED_ID);
            somethingCached.innerHTML = SOMETHING_CACHED;            
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
