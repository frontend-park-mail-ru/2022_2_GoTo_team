import LoginPage from "../pages/login/loginPage.js";
import Feed from "../pages/feed/feed.js";
import RegistrationPage from "../pages/registration/registrationPage.js";
import UserFeed from "../pages/userFeed/userFeed.js";
import CategoryFeed from "../pages/categoryFeed/categoryFeed.js";
import ArticlePage from "../pages/article/articlePage.js";
import SettingsPage from "../pages/settingsPage/settingsPage.js";
import ArticleEditPage from "../pages/articleEdit/articleEditPage.js";
import {FullSearchData, SearchData} from "../common/types";
import SearchPage from "../pages/search/searchPage.js";
import SearchTagPage from "../pages/searchTag/searchTagPage.js";
import Page from "../pages/_basic/page";

const root = document.getElementsByTagName('body')[0];

export class PageLoaders {
    /**
     * Отрисовывает страницу популярных страниц
     */
    static feedPage(): Page {
        const page = new Feed(root);
        page.render().then(() => {
            page.subscribe();
        });
        return page;
    }

    /**
     * Отрисовывает страницу логина
     */
    static loginPage(): Page {
        const page = new LoginPage(root);
        page.render().then(() => {
            page.subscribe();
        });
        return page;
    }

    /**
     * Отрисовывает страницу регистрации
     */
    static registrationPage(): Page {
        const page = new RegistrationPage(root);
        page.render().then(() => {
            page.subscribe();
        });
        return page;
    }

    /**
     * Отрисовывает страницу автора
     */
    static userFeedPage(login: string): Page {
        const page = new UserFeed(root);
        page.render(login).then(() => {
            page.subscribe();
        });
        return page;
    }

    /**
     * Отрисовывает страницу автора
     */
    static categoryFeedPage(category: string): Page {
        const page = new CategoryFeed(root);
        page.render(category).then(() => {
            page.subscribe();
        });
        return page;
    }

    /**
     * Отрисовывает страницу просмотра статьи
     */
    static articlePage(articleId: number, comments: boolean): Page {
        const page = new ArticlePage(root);
        page.render({articleId: articleId, toComments: comments}).then(() => {
            page.subscribe();
        });
        return page;
    }

    /**
     * Отрисовывает страницу профиля
     */
    static settingsPage(): Page {
        const page = new SettingsPage(root);
        page.render().then(() => {
            page.subscribe();
        });
        return page;
    }

    /**
     * Отрисовывает редактирования/создания статьи
     */
    static editArticle(articleId?: number): Page {
        const page = new ArticleEditPage(root)
        page.render(articleId).then(() => {
            page.subscribe();
        });
        return page;
    }

    /**
     * Отрисовывает поиск
     */
    static searchPage(searchData: FullSearchData): Page {
        const page = new SearchPage(root)
        page.render(searchData).then(() => {
            page.subscribe();
        });
        return page;
    }

    /**
     * Отрисовывает поиск по тегу
     */
    static searchByTagPage(searchData: SearchData): Page {
        const page = new SearchTagPage(root)
        page.render(searchData).then(() => {
            page.subscribe();
        });
        return page;
    }
}
