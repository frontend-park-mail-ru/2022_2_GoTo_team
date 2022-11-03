import Feed_view from "./feed_view.js";
import {Requests} from "../../modules/requests.js"
import Article from "../../components/article/article.js";
/**
 * ModalView-контроллер для соответсвующих страниц
 * @class Feed
 */
export default class Feed {
    /**
     * Страница содержит главный компонент
     * @param {HTMLElement} root
     */
    constructor(root) {
        this.view = new Feed_view(root);
    }
    /**
     * Отобразить подконтрольную страницу.
     * Должен быть вызван render() для обновления.
     */
    render() {
        this.view.render();
        Requests.get_articles().then((articles) => {
            console.log(articles);
            if (articles && Array.isArray(articles)) {
                this.view.main_content_element.innerHTML = '';
                articles.forEach((article) => {
                    const article_view = new Article();
                    article_view.render(article);
                    this.view.main_content_element.appendChild(article_view.root);
                })
            }
        });

    }

    /**
     * Подписка на связанные события
     */
    subscribe() {
    }
}