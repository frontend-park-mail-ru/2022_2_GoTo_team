import {Events} from "./events.js";
import {APIStrings} from "../common/consts.js";
import {FullSearchData, SearchData} from "../common/types";

export class URIChanger {
    /**
     * Отрисовывает страницу популярных страниц
     */
    static rootPage() {
        Events.setLocation(APIStrings.root());
    }

    /**
     * Отрисовывает страницу популярных страниц
     */
    static feedPage() {
        Events.setLocation(APIStrings.feedPage());
    }

    /**
     * Отрисовывает страницу автора
     */
    static userFeedPage(login: string) {
        Events.setLocation(APIStrings.authorPage(login));
    }

    /**
     * Отрисовывает страницу автора
     */
    static categoryFeedPage(category: string) {
        Events.setLocation(APIStrings.categoryPage(category));
    }

    /**
     * Отрисовывает страницу просмотра статьи
     */
    static articlePage(articleId: number) {
        Events.setLocation(APIStrings.articlePage(articleId));
    }

    /**
     * Отрисовывает страницу профиля
     */
    static settingsPage() {
        Events.setLocation(APIStrings.settingsPage());
    }

    /**
     * Отрисовывает редактирования/создания статьи
     */
    static editArticle(articleId?: number) {
        if (typeof articleId === 'undefined') {
            Events.setLocation(APIStrings.newArticlePage());
        } else {
            Events.setLocation(APIStrings.articleEditPage(articleId));
        }
    }

    /**
     * Отрисовывает поиск
     */
    static searchPage(data: FullSearchData | SearchData) {
        let searchData: FullSearchData | undefined;
        // @ts-ignore
        if (typeof data.primary === 'undefined'){
            searchData = {
                primary: data as SearchData,
                advanced: {}
            }
        }else{
            searchData = data as FullSearchData;
        }
        console.log(searchData)
        Events.setLocation(
            APIStrings.searchPage(searchData!.primary.request,
                searchData!.advanced.author, searchData!.advanced.tags));
    }
}