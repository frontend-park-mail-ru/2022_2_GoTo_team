import {APIStrings, Url} from "../common/consts.js";
import {SearchData} from "../common/types";

export class URIChanger {
    /**
     * Перемещает на страницу популярных страниц
     */
    static rootPage() {
        window.history.pushState(null, '', Url + APIStrings.root());
    }

    /**
     * Перемещает на страницу популярных страниц
     */
    static feedPage() {
        window.history.pushState(null, '', Url + APIStrings.feedPage());
    }

    /**
     * Перемещает на страницу подписок
     */
    static subscriptionFeedPage() {
        window.history.pushState(null, '', Url + APIStrings.subscriptionsPage());
    }

    /**
     * Перемещает на страницу автора
     */
    static userFeedPage(login: string) {
        window.history.pushState(null, '', Url + APIStrings.authorPage(login));
    }

    /**
     * Перемещает на страницу автора
     */
    static categoryFeedPage(category: string) {
        window.history.pushState(null, '', Url + APIStrings.categoryPage(category));
    }

    /**
     * Перемещает на страницу просмотра статьи
     */
    static articlePage(articleId: number, comments: boolean) {
        window.history.pushState(null, '', Url + APIStrings.articlePage(articleId, comments));
    }

    /**
     * Перемещает на страницу профиля
     */
    static settingsPage() {
        window.history.pushState(null, '', Url + APIStrings.settingsPage());
    }

    /**
     * Перемещает на редактирования/создания статьи
     */
    static editArticle(articleId?: number) {
        if (articleId === undefined) {
            window.history.pushState(null, '', Url + APIStrings.newArticlePage());
        } else {
            window.history.pushState(null, '', Url + APIStrings.articleEditPage(articleId));
        }
    }

    /**
     * Перемещает на поиск
     */
    static searchPage(data: SearchData) {
        window.history.pushState(null, '', Url + APIStrings.searchPage(data));
    }

    /**
     * Перемещает на поиск
     */
    static searchByTagPage(tag: string) {
        const data: SearchData = {
            tags: [tag],
        }
        window.history.pushState(null, '', Url + APIStrings.searchPage(data));
    }
}
