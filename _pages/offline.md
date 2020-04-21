---
permalink: /offline/
title: You´re currently offline
---

We can´t connect to [{{site.url | remove:"https://"}}]({{site.url}}) right now, and the page you want to see has not been saved for offline reading. However, here are a few pages that _have been_ saved:

<ul class="reset" id="history"></ul>
<script>
caches.open('ulf-codes-cache-v6')
    .then( cache => {
        let cacheCount = 0;
        cache.keys()
            .then(keys => {      
                let markup = '';
                keys.forEach( request => {
                if (request.url.endsWith('/')) {
                    cacheCount++;                    
                    markup += `<li><a href="${request.url}">${request.url}</a></li>`;
                }
            });
        if (cacheCount) {
            document.getElementById('history').innerHTML = markup;
        }
    });
});
</script>
