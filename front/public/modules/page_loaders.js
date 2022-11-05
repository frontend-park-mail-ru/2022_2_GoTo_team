import Login_page from "../pages/login/login_page.js";
import Feed from "../pages/feed/feed.js";
import Registration_page from "../pages/registration/registration_page.js";

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
}