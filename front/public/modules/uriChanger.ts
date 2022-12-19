import {APIStrings, FrontUrl} from "../common/consts.js";
import {SearchData} from "../common/types";

export class URIChanger {
    /**
     * Перемещает на страницу популярных страниц
     */
    static rootPage() {
        window.history.pushState(null, '', FrontUrl + APIStrings.root());
    }

    /**
     * Перемещает на страницу популярных страниц
     */
    static feedPage() {
        window.history.pushState(null, '', FrontUrl + APIStrings.feedPage());
    }

    /**
     * Перемещает на страницу подписок
     */
    static subscriptionFeedPage() {
        window.history.pushState(null, '', FrontUrl + APIStrings.subscriptionsPage());
    }

    /**
     * Перемещает на страницу автора
     */
    static userFeedPage(login: string) {
        window.history.pushState(null, '', FrontUrl + APIStrings.authorPage(login));
    }

    /**
     * Перемещает на страницу автора
     */
    static categoryFeedPage(category: string) {
        window.history.pushState(null, '', FrontUrl + APIStrings.categoryPage(category));
    }

    /**
     * Перемещает на страницу просмотра статьи
     */
    static articlePage(articleId: number, comments: boolean) {
        window.history.pushState(null, '', FrontUrl + APIStrings.articlePage(articleId, comments));
    }

    /**
     * Перемещает на страницу профиля
     */
    static settingsPage() {
        window.history.pushState(null, '', FrontUrl + APIStrings.settingsPage());
    }

    /**
     * Перемещает на редактирования/создания статьи
     */
    static editArticle(articleId?: number) {
        if (articleId === undefined) {
            window.history.pushState(null, '', FrontUrl + APIStrings.newArticlePage());
        } else {
            window.history.pushState(null, '', FrontUrl + APIStrings.articleEditPage(articleId));
        }
    }

    /**
     * Перемещает на поиск
     */
    static searchPage(data: SearchData) {
        window.history.pushState(null, '', FrontUrl + APIStrings.searchPage(data));
    }

    /**
     * Перемещает на поиск
     */
    static searchByTagPage(tag: string) {
        const data: SearchData = {
            tags: [tag],
        }
        window.history.pushState(null, '', FrontUrl + APIStrings.searchPage(data));
    }
}
