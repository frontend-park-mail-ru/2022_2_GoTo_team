import Login_page from "../pages/login/login_page.js";
import Feed from "../pages/feed/feed.js";
import Registration_page from "../pages/registration/registration_page.js";
import User_feed from "../pages/user_feed/user_feed.js";
import Category_feed from "../pages/category_feed/category_feed.js";
import Article_page from "../pages/article/article_page.js";
import Settings_page from "../pages/settings_page/settings_page.js";

const root = document.getElementsByTagName('body')[0];

export class Page_loaders {
    /**
     * Отрисовывает страницу популярных страниц
     */
    static feed_page() {
        const page = new Feed(root);
        page.render();
        page.subscribe();
    }

    /**
     * Отрисовывает страницу логина
     */
    static login_page() {
        const page = new Login_page(root);
        page.render();
        page.subscribe();
    }

    /**
     * Отрисовывает страницу регистрации
     */
    static registration_page() {
        const page = new Registration_page(root);
        page.render();
        page.subscribe();
    }

    /**
     * Отрисовывает страницу автора
     */
    static user_feed_page(login) {
        const page = new User_feed(root);
        page.render(login);
        page.subscribe();
    }

    /**
     * Отрисовывает страницу автора
     */
    static category_feed_page(category) {
        const page = new Category_feed(root);
        page.render(category);
        page.subscribe();
    }

    /**
     * Отрисовывает страницу просмотра статьи
     */
    static article_page(article_id) {
        const page = new Article_page(root);
        page.render(article_id);
        page.subscribe();
    }

    /**
     * Отрисовывает страницу профиля
     */
    static settings_page(article_id) {
        const page = new Settings_page(root);
        page.render();
        page.subscribe();
    }
}