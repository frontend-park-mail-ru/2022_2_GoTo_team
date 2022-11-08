import {Events} from "../../modules/events.js";
import Page from "../_basic/page.js";
import User_feed_view from "./user_feed_view.js";
import User_feed_header from "../../components/user_feed_header/user_feed_header.js";
import {Requests} from "../../modules/requests.js";
import Article from "../../components/article/article.js";

/**
 * ModalView-контроллер для соответсвующих страниц
 * @class  User_feed
 */
export default class User_feed extends Page {
    /**
     * Страница содержит главный компонент
     * @param {HTMLElement} root
     */
    constructor(root) {
        super(root);
        this.view = new User_feed_view(root);
    }

    /**
     * Отобразить подконтрольную страницу.
     * Должен быть вызван render() для обновления.
     */
    render(login) {
        this.view.render();
        Requests.user_header_info(login).then((user_data) => {
            const header = new User_feed_header();
            header.render(user_data);
            header.subscribe();
            this.view.center.insertBefore(header.root, this.view.center.children[0]);
        });

        Requests.get_user_articles(login).then((articles) => {
            if (articles && Array.isArray(articles)) {
                this.view.main_content_element.innerHTML = '';
                articles.forEach((article) => {
                    const article_view = new Article();
                    article_view.render(article);
                    article_view.subscribe();
                    this.view.main_content_element.appendChild(article_view.root);
                })
            }
        });

        Events.update_auth();
    }

    /**
     * Подписка на связанные события
     */
    subscribe() {
    }
}