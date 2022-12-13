import {Events} from "./events.js";
import {APIStrings} from "../common/consts.js";
import {SearchData} from "../common/types";

export class URIChanger {
    /**
     * Перемещает на страницу популярных страниц
     */
    static rootPage() {
        Events.setLocation(APIStrings.root());
    }

    /**
     * Перемещает на страницу популярных страниц
     */
    static feedPage() {
        Events.setLocation(APIStrings.feedPage());
    }

    /**
     * Перемещает на страницу автора
     */
    static userFeedPage(login: string) {
        Events.setLocation(APIStrings.authorPage(login));
    }

    /**
     * Перемещает на страницу автора
     */
    static categoryFeedPage(category: string) {
        Events.setLocation(APIStrings.categoryPage(category));
    }

    /**
     * Перемещает на страницу просмотра статьи
     */
    static articlePage(articleId: number, comments: boolean) {
        Events.setLocation(APIStrings.articlePage(articleId, comments));
    }

    /**
     * Перемещает на страницу профиля
     */
    static settingsPage() {
        Events.setLocation(APIStrings.settingsPage());
    }

    /**
     * Перемещает на редактирования/создания статьи
     */
    static editArticle(articleId?: number) {
        if (articleId === undefined) {
            Events.setLocation(APIStrings.newArticlePage());
        } else {
            Events.setLocation(APIStrings.articleEditPage(articleId));
        }
    }

    /**
     * Перемещает на поиск
     */
    static searchPage(data: SearchData) {
        Events.setLocation(
            APIStrings.searchPage(data));
    }

    /**
     * Перемещает на поиск
     */
    static searchByTagPage(tag: string) {
        const data: SearchData = {
            tags: [tag],
        }
        Events.setLocation(
            APIStrings.searchPage(data));
    }
}
