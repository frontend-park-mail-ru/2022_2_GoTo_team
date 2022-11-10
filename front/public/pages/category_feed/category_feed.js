import {Events} from "../../modules/events.js";
import Page from "../_basic/page.js";
import CategoryFeedView from "./category_feed_view.js";
import {Requests} from "../../modules/requests.js";
import Article from "../../components/article/article.js";
import CategoryFeedHeader from "../../components/category_feed_header/category_feed_header.js";

/**
 * ModalView-контроллер для соответсвующих страниц
 * @class  CategoryFeed
 */
export default class CategoryFeed extends Page {
    /**
     * Страница содержит главный компонент
     * @param {HTMLElement} root
     */
    constructor(root) {
        super(root);
        this.view = new CategoryFeedView(root);
    }

    /**
     * Отобразить подконтрольную страницу.
     * Должен быть вызван render() для обновления.
     */
    render(category) {
        this.view.render();
        Requests.categoryHeaderInfo(category).then((categoryData) => {
            const header = new CategoryFeedHeader()
            header.render(categoryData);
            header.subscribe();
            this.view.center.insertBefore(header.root, this.view.center.children[0]);
        });

        Requests.getCategoryArticles(category).then((articles) => {
            if (articles && Array.isArray(articles)) {
                this.view.mainContentElement.innerHTML = '';
                articles.forEach((article) => {
                    const articleView = new Article();
                    articleView.render(article);
                    articleView.subscribe();
                    this.view.mainContentElement.appendChild(articleView.root);
                })
            }
        });

        Events.updateAuth();
    }

    /**
     * Подписка на связанные события
     */
    subscribe() {
        this.view.children.get('navbar').subscribe();
    }
}