/* global Handlebars */

import {PageLoaders} from "./modules/page_loaders.js";
import Router from "./modules/router.js";
import {API} from "./common/consts.js";
import {FullSearchData, SearchData} from "./common/types";

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
        const searchData : FullSearchData = {
            primary: {
                request: request,
            },
            advanced: {
                author: params[1],
                tags: params[3]?.split(','),
            }
        }
        PageLoaders.searchPage(searchData);
    })
    .add(API.searchByTagPage, (tag: string) => {
        const searchData: SearchData = {
            request: tag,
        }
        PageLoaders.searchByTagPage(searchData);
    })
    .add(API.root, () => {
        PageLoaders.feedPage();
    });
