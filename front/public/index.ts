/* global Handlebars */

import {PageLoaders} from "./modules/page_loaders.js";
import Router from "./modules/router.js";
import {API} from "./common/consts.js";
import {FullSearchData} from "./common/types";

const router = new Router({
    root: ''
});

router
    .add(API.feedPage, () => {
        PageLoaders.feedPage();
    })
    .add(API.settingsPage, () => {
        PageLoaders.settingsPage();
    })
    .add(API.articlePage, (id: number) => {
        PageLoaders.articlePage(id);
    })
    .add(API.categoryPage, (name: string) => {
        PageLoaders.categoryFeedPage(name);
    })
    .add(API.authorPage, (login: string) => {
        PageLoaders.userFeedPage(login);
    })
    .add(API.newArticlePage, () => {
        PageLoaders.editArticle();
    })
    .add(API.articleEditPage, (id: number) => {
        PageLoaders.editArticle(id);
    })
    .add(API.searchPage, (request: string, ...params: string[]) => {
        console.log(params);
        const searchData : FullSearchData = {
            primary: {
                request: request,
                number: 0,
            },
            advanced: {
                author: params[1],
                tags: params[3]?.split(','),
            }
        }
        PageLoaders.searchPage(searchData);
    })
    .add(API.root, () => {
        PageLoaders.feedPage();
    });
//PageLoaders.feedPage();
//PageLoaders.userFeedPage('admin');
//PageLoaders.categoryFeedPage('Финансы');
//PageLoaders.articlePage(3);
//PageLoaders.settingsPage();
//PageLoaders.editArticle();
