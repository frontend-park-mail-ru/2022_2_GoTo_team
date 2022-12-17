// не используется. Перешли на вебпак
const cacheName = 've.ru';
const APIPrefix = '/api/v1/';
const notifStringLenLimit = 36;
const notifTextLenLimit = 5 * notifStringLenLimit;

// /dev/createCachedList.js заполняет этот список автоматически
const cacheUrls = [
    '/',
    '/index.html',
    '/dist/main.bandle.js',
    '/modules/handlebars.js',
    '/feed',
    '/article/'
];
// наименование для нашего хранилища кэша
// ссылки на кэшируемые файлы
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

    // не кешируем запросы к апи
    //@ts-ignore
    const url = event.request.url.toString();
    /*
    if (url.includes(APIPrefix)) {
        const imgPos = url.indexOf('img/');
        if (imgPos !== -1) {
            const img = url.substr(imgPos + 4);
            if (img === '') {
                return;
            }
        } else {
            return;
        }
    }
    */
    //@ts-ignore
    caches.match(event.request).then((cachedResponse) => {
        console.log( url, 'подходит',);
    }).catch((err) => {
        console.error('smth went wrong with caches.match: ', err);
    });
    /** online first */
    if (navigator.onLine === true) {
        console.log('SW кеширует', url);
        //@ts-ignore
        return fetch(event.request);
    }


    /** cache first */
    //@ts-ignore
    event.respondWith(
        // ищем запрашиваемый ресурс в хранилище кэша
        caches
            //@ts-ignore
            .match(event.request)
            .then((cachedResponse) => {
                console.log('SW выдаёт из кэша', url);
                console.log(cachedResponse);
                // выдаём кэш, если он есть
                if (cachedResponse) {
                    console.log(cachedResponse);
                    return cachedResponse;
                }
                console.log('No cached for ', url);
                //@ts-ignore
                return fetch(event.request);
            })
            .catch((err) => {
                console.error('smth went wrong with caches.match: ', err);
            }),
    );
});
/*
// Обработчик для пушей
self.addEventListener('push', (e) => {
    console.warn('[PushManager]: push event');
    let title = e.data.title || 'Это Ваш SaberNews!';
    const options = {
        icon: 'favicon.ico',
        image: 'logo-for-sharing.png',
        lang: 'ru-RU',
        vibrate: [200, 300, 200, 300],
        body: 'Новое событие под одной из Ваших статей',
        actions: [
            {action: 'explore', title: 'Просмотреть',
                icon: 'img/icons/comment_hover.svg'},
            //   {action: 'close', title: 'Close notification',
            //     icon: 'images/xmark.png'},
        ],
    };

    /*
      0 - для лайков по твоим статьям,
      1 - для комментов по твоим статьям,
      2 - для лаков твоих комментов,
      3 - для ответов на твои комменты
      // для комментариев и для ответов на комментарии
      // тип 1
      data: {
      articleTitle: string
      commentText: string
      articleId: number
      commentId: number
      firstName: string
      lastName: string
      }
      // тип 3
      data: {
      commentText: string
      answerText: string
      commentId: number
      answerId: number
      firstName: string
      lastName: string
      }
      // для лайка
      // тип 0
      data: {
      articleId: number
      articleTitle: string
      }
      // тип 2
      data: {
      articleId: number
      commentId: number
      commentText: string
      }
    */
/*
    // TODO: url, actions
    const data = e.data.json()?.data;
    console.log('[Push Manager]', {'recieved': e.data.json()});
    switch (e.data.json().type) {
        case 0: {
            title = 'У Вашей статьи новый лайк!';
            options.body = `
      ${data.articleTitle}
      `;
        }
        case 1: {
            title = 'У Вашей статьи новый комментарий!';
            options.body = `
      ${data.articleTitle.substring(0, notifStringLenLimit)}
      ${data.firstName} ${data.lastName}:
      ${data.commentText.substring(0, 3*notifStringLenLimit)}
      `;
        }
        case 2: {
            title = 'Ваш комментарий кто-то оценил!';
            options.body = `
      ${data.commentText.substring(0, notifTextLenLimit)}
      `;
        }
        case 3: {
            title = 'На Ваш комментарий поступил ответ!';
            // TODO: fix API ${data.answerText}
            options.body = `
      ${data.firstName} ${data.lastName}:
      ${data.commentText.substring(0, notifTextLenLimit - 30)}
      `; // 30- примерно столько займет firstName lastName
        }
    }

    e.waitUntil(
        self.registration.showNotification(title, options),
    );
});

self.addEventListener('notificationclick', (e) => {
    // const primaryKey = notification.data.primaryKey;
    const data = e.data.json()?.data;
    switch (e.action) {
        case 'explore': {
            clients.openWindow(
                // TODO:
                // `${appUrlPM}/article/${data.articleId}#comments-id=${commentId}`,
                `${appUrlPM}/article/${data.articleId}#comments`,
            );
        }
        default: {
            console.log('[PushManager] unregistered action', e.action);
        }
    }
});
*/
