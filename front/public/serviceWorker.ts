const cacheName = 've.ru';
const APIPrefix = '/api/v1/';
const notifStringLenLimit = 36;
const notifTextLenLimit = 5 * notifStringLenLimit;

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
    //@ts-ignore
    const url = event.request.url.toString();
    /** online first */
    if (navigator.onLine) {
        console.log('SW кеширует', url);
        //@ts-ignore
        return fetch(event.request).then((response) => {
            return caches.open(cacheName).then((cache) => {
                //@ts-ignore
                cache.match(event.request).then((cachedResponse) => {
                    if (cachedResponse === undefined) {
                        //@ts-ignore
                        cache.put(event.request, response.clone());
                    }
                })
                return response;
            });
        });
    }


    /** cache first */
    //@ts-ignore
    event.respondWith(
        caches.open(cacheName).then((cache) => {
            //@ts-ignore
            return cache.match(event.request).then((cachedResponse) => {
                console.log('SW выдаёт из кэша', url);
                // выдаём кэш, если он есть
                if (cachedResponse) {
                    console.log(cachedResponse);
                    return cachedResponse;
                }
                console.log('No cached for ', url);
                //@ts-ignore
                return fetch(event.request);
            });
        })
    );

});
