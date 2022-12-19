const cacheName = 've.ru';

// Только основные файлы, остальные урлы добавляются по мере работы
const cacheUrls = [
    '/',
    '/index.html',
    '/icons.svg',
    '/dist/main.bandle.js',
    '/modules/handlebars.js',
    '/static/css/index.css',
    '/static/img/404maskot.png',
];

const noCacheUrls = [
    '/feed/subscriptions/has-new-articles-from',
]
self.addEventListener('install', (event) => {
    console.log('SW is installing');
    // задержим обработку события
    // если произойдёт ошибка, serviceWorker не установится
    //@ts-ignore
    event.waitUntil(
        // находим в глобальном хранилище Cache-объект с нашим именем
        // если такого не существует, то он будет создан
        caches.open(cacheName)
            .then((cache) => {
                // загружаем в наш cache необходимые файлы
                console.log('SW on install: ', cacheName);
                return cache.addAll(cacheUrls);
            })
            .catch((err) => {
                console.error('smth went wrong with caches.open: ', err);
            }),
    );
});

self.addEventListener('fetch', (event) => {
    /** online */
    if (navigator.onLine) {
        // @ts-ignore
        return fromNetwork(event.request);
    }

    /** cache */
    //@ts-ignore
    event.respondWith(
        // @ts-ignore
        fromCache(event.request)
    );
});

/**
 * Загрузка даных из сети
 */
function fromNetwork(request: RequestInfo): Promise<Response> {
    return fetch(request).then((response) => {
        Promise.resolve().then(() => {
            //@ts-ignore
            const url = request.url.toString();
            if (shouldCache(url)){
                console.log('SW кеширует', url);
                caches.open(cacheName).then((cache) => {
                    cache.match(request).then((cachedResponse) => {
                        if (cachedResponse === undefined) {
                            cache.put(request, response.clone());
                        }
                    })
                });
            }
        })
        return response;
    });
}

/**
 * Загрузка даных из кеша
 */
function fromCache(request: RequestInfo): Promise<Response> {
    return caches.open(cacheName)
        .then((cache) => {
            return cache.match(request)
                .then((cachedResponse) => {
                    //@ts-ignore
                    console.log('SW выдаёт из кэша', request.url.toString());
                    // выдаём кэш, если он есть
                    if (cachedResponse) {
                        console.log(cachedResponse);
                        return cachedResponse;
                    }
                    //@ts-ignore
                    console.log('No cached for ', request.url.toString());
                    //@ts-ignore
                    return fetch(request);
                });
        })
}

function shouldCache(url: string): boolean {
    for (const notCached of noCacheUrls){
        if (url.includes(notCached)) {
            return false;
        }
    }
    return true;
}