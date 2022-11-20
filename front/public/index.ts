/* global Handlebars */

import {PageLoaders} from "./modules/page_loaders.js";
import Router from "./modules/router.js";

const router = new Router({
    root: ''
});

router
    .add(/about/, () => {
        alert('welcome in about page');
    })
    .add(/settings/, () => {
        PageLoaders.settingsPage();
    })
    .add(/products\/(.*)\/specification\/(.*)/, (id: string, specification: string) => {
        alert(`products: ${id} specification: ${specification}`);
    })
    .add('', () => {
        PageLoaders.feedPage();
    });
//PageLoaders.feedPage();
//PageLoaders.userFeedPage('admin');
//PageLoaders.categoryFeedPage('Финансы');
//PageLoaders.articlePage(3);
//PageLoaders.settingsPage();
//PageLoaders.editArticle();
