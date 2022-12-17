/* global Handlebars */

import {PageLoaders} from "./modules/pageLoaders.js";
import Router from "./modules/router.js";
import {API} from "./common/consts.js";
import {SearchData} from "./common/types";
import Page from "./pages/_basic/page";
import {Requests} from "./modules/requests";

const router = new Router({
    mode: 'history',
    root: ''
});

let openedPage: Page;

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/serviceWorker.js',{scope : '/'})
        .then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
    });
}

router
    .add(API.feedPage, () => {
        if (openedPage !== undefined) {
            openedPage.destroy();
        }
        openedPage = PageLoaders.feedPage();
    })
    .add(API.settingsPage, () => {
        if (openedPage !== undefined) {
            openedPage.destroy();
        }
        openedPage = PageLoaders.settingsPage();
    })
    .add(API.articlePage, (id: number, comments: string) => {
        if (openedPage !== undefined) {
            openedPage.destroy();
        }
        Requests.getArticle(id).then((article) => {
            openedPage = PageLoaders.articlePage(article, comments !== undefined);
        }).catch((error) => {
            if (error === 404) {
                openedPage = PageLoaders.error404();
            }
        });

    })
    .add(API.categoryPage, (name: string) => {
        if (openedPage !== undefined) {
            openedPage.destroy();
        }
        Requests.categoryHeaderInfo(decodeURIComponent(name)).then((categoryData) => {
            openedPage = PageLoaders.categoryFeedPage(categoryData);
        }).catch((error) => {
            if (error === 404) {
                openedPage = PageLoaders.error404();
            }
        });
    })
    .add(API.authorPage, (login: string) => {
        if (openedPage !== undefined) {
            openedPage.destroy();
        }
        Requests.userHeaderInfo(login).then((userData) => {
            openedPage = PageLoaders.userFeedPage(userData);
        }).catch((error) => {
            if (error === 404) {
                openedPage = PageLoaders.error404();
            }
        });
    })
    .add(API.newArticlePage, () => {
        if (openedPage !== undefined) {
            openedPage.destroy();
        }
        openedPage = PageLoaders.editArticle();
    })
    .add(API.articleEditPage, (id: number) => {
        if (openedPage !== undefined) {
            openedPage.destroy();
        }
        Requests.getArticle(id).then((article) => {
            openedPage = PageLoaders.editArticle(article);
        }).catch((error) => {
            if (error === 404) {
                openedPage = PageLoaders.error404();
            }
        });
    })
    .add(API.searchPage, (...params: string[]) => {
        if (openedPage !== undefined) {
            openedPage.destroy();
        }

        const searchData: SearchData = {
            request: params[1],
            author: params[3],
            tags: params[5]?.split(','),
        }
        openedPage = PageLoaders.searchPage(searchData);
    })
    .add(API.root, () => {
        if (openedPage !== undefined) {
            openedPage.destroy();
        }
        openedPage = PageLoaders.feedPage();
    })
    .add('', () => {
        if (openedPage !== undefined) {
            openedPage.destroy();
        }
        openedPage = PageLoaders.error404();
    });
