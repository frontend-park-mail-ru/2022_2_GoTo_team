import LoginPage from "../pages/login/login_page.js";
import Feed from "../pages/feed/feed.js";
import RegistrationPage from "../pages/registration/registration_page.js";
import UserFeed from "../pages/userFeed/user_feed.js";
import CategoryFeed from "../pages/categoryFeed/category_feed.js";
import ArticlePage from "../pages/article/article_page.js";
import SettingsPage from "../pages/settingsPage/settings_page.js";
import ArticleEditPage from "../pages/articleEdit/article_edit_page.js";
import {FullSearchData, SearchData} from "../common/types";
import SearchPage from "../pages/search/search_page.js";
import SearchTagPage from "../pages/searchTag/search_tag_page.js";

const root = document.getElementsByTagName('body')[0];

export class PageLoaders {
    /**
     * Отрисовывает страницу популярных страниц
     */
    static feedPage() {
        const page = new Feed(root);
        page.render().then(() => {
            page.subscribe();
        });
    }

    /**
     * Отрисовывает страницу логина
     */
    static loginPage() {
        const page = new LoginPage(root);
        page.render();
        page.subscribe();
    }

    /**
     * Отрисовывает страницу регистрации
     */
    static registrationPage() {
        const page = new RegistrationPage(root);
        page.render();
        page.subscribe();
    }

    /**
     * Отрисовывает страницу автора
     */
    static userFeedPage(login: string) {
        const page = new UserFeed(root);
        page.render(login).then(() => {
            page.subscribe();
        });
    }

    /**
     * Отрисовывает страницу автора
     */
    static categoryFeedPage(category: string) {
        const page = new CategoryFeed(root);
        page.render(category).then(() => {
            page.subscribe();
        });
    }

    /**
     * Отрисовывает страницу просмотра статьи
     */
    static articlePage(articleId: number) {
        const page = new ArticlePage(root);
        page.render(articleId).then(() => {
            page.subscribe();
        });
    }

    /**
     * Отрисовывает страницу профиля
     */
    static async settingsPage() {
        const page = new SettingsPage(root);
        page.render().then(() => {
            page.subscribe();
        });
    }

    /**
     * Отрисовывает редактирования/создания статьи
     */
    static async editArticle(articleId?: number) {
        const page = new ArticleEditPage(root)
        await page.render(articleId).then(() => {
            page.subscribe();
        });
    }

    /**
     * Отрисовывает поиск
     */
    static async searchPage(searchData: FullSearchData) {
        const page = new SearchPage(root)
        await page.render(searchData).then(() => {
            page.subscribe();
        });
    }

    /**
     * Отрисовывает поиск по тегу
     */
    static async searchByTagPage(searchData: SearchData) {
        const page = new SearchTagPage(root)
        await page.render(searchData).then(() => {
            page.subscribe();
        });
    }
}