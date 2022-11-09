import {Events} from "../../modules/events.js";
import Page from "../_basic/page.js";
import Category_feed_view from "./category_feed_view.js";
import {Requests} from "../../modules/requests.js";
import Article from "../../components/article/article.js";
import Category_feed_header from "../../components/category_feed_header/category_feed_header.js";

/**
 * ModalView-контроллер для соответсвующих страниц
 * @class  Category_feed
 */
export default class Category_feed extends Page {
    /**
     * Страница содержит главный компонент
     * @param {HTMLElement} root
     */
    constructor(root) {
        super(root);
        this.view = new Category_feed_view(root);
    }

    /**
     * Отобразить подконтрольную страницу.
     * Должен быть вызван render() для обновления.
     */
    render(category) {
        this.view.render();
        Requests.category_header_info(category).then((category_data) => {
            const header = new Category_feed_header();
            header.render(category_data);
            header.subscribe();
            this.view.center.insertBefore(header.root, this.view.center.children[0]);
        });

        Requests.get_category_articles(category).then((articles) => {
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
        this.view.children.get('navbar').subscribe();
    }
}