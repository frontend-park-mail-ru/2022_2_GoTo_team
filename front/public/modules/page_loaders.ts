import LoginPage from "../pages/login/login_page.js";
import Feed from "../pages/feed/feed.js";
import RegistrationPage from "../pages/registration/registration_page.js";
import UserFeed from "../pages/user_feed/user_feed.js";
import CategoryFeed from "../pages/category_feed/category_feed.js";
import ArticlePage from "../pages/article/article_page.js";
import SettingsPage from "../pages/settings_page/settings_page.js";
import ArticleEditPage from "../pages/article_edit/article_edit_page.js";

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
    static userFeedPage(login: any) {
        const page = new UserFeed(root);
        page.render(login);
        page.subscribe();
    }

    /**
     * Отрисовывает страницу автора
     */
    static categoryFeedPage(category: any) {
        const page = new CategoryFeed(root);
        page.render(category).then(() => {
            page.subscribe();
        });
    }

    /**
     * Отрисовывает страницу просмотра статьи
     */
    static articlePage(articleId: any) {
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
    static async editArticle(articleId: any) {
        const page = new ArticleEditPage(root)
        await page.render(articleId);
        page.subscribe();
    }
}