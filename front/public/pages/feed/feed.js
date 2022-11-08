import Feed_view from "./feed_view.js";
import {Requests} from "../../modules/requests.js"
import Article from "../../components/article/article.js";
import {Events} from "../../modules/events.js";
import Page from "../_basic/page.js";
/**
 * ModalView-контроллер для соответсвующих страниц
 * @class Feed
 */
export default class Feed extends Page{
    /**
     * Страница содержит главный компонент
     * @param {HTMLElement} root
     */
    constructor(root) {
        super(root);
        this.view = new Feed_view(root);
    }

    /**
     * Отобразить подконтрольную страницу.
     * Должен быть вызван render() для обновления.
     */
    render() {
        this.view.render();
        Requests.get_articles().then((articles) => {
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