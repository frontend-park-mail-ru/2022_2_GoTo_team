/* global Handlebars */

import {PageLoaders} from "./modules/pageLoaders.js";
import Router from "./modules/router.js";
import {API} from "./common/consts.js";
import {SearchData} from "./common/types";
import Page from "./pages/_basic/page";

const router = new Router({
    mode: 'history',
    root: ''
});

let openedPage: Page;

router
    .add(API.feedPage, () => {
        if (openedPage !== undefined){
            openedPage.destroy();
        }
        openedPage = PageLoaders.feedPage();
    })
    .add(API.settingsPage, () => {
        if (openedPage !== undefined){
            openedPage.destroy();
        }
        openedPage = PageLoaders.settingsPage();
    })
    .add(API.articlePage, (id: number, comments: string) => {
        if (openedPage !== undefined){
            openedPage.destroy();
        }
        console.log(comments);
        openedPage = PageLoaders.articlePage(id, comments !== undefined);
    })
    .add(API.categoryPage, (name: string) => {
        if (openedPage !== undefined){
            openedPage.destroy();
        }
        openedPage = PageLoaders.categoryFeedPage(name);
    })
    .add(API.authorPage, (login: string) => {
        if (openedPage !== undefined){
            openedPage.destroy();
        }
        openedPage = PageLoaders.userFeedPage(login);
    })
    .add(API.newArticlePage, () => {
        if (openedPage !== undefined){
            openedPage.destroy();
        }
        openedPage = PageLoaders.editArticle();
    })
    .add(API.articleEditPage, (id: number) => {
        if (openedPage !== undefined){
            openedPage.destroy();
        }
        openedPage = PageLoaders.editArticle(id);
    })
    .add(API.searchPage, (...params: string[]) => {
        if (openedPage !== undefined){
            openedPage.destroy();
        }

        const searchData : SearchData = {
                request: params[1],
                author: params[3],
                tags: params[5]?.split(','),
            }
        openedPage = PageLoaders.searchPage(searchData);
    })
    .add(API.root, () => {
        if (openedPage !== undefined){
            openedPage.destroy();
        }
        openedPage = PageLoaders.feedPage();
    });
