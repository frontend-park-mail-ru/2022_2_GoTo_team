import FeedView from "./feed_view.js";
import {Requests} from "../../modules/requests.js"
import Article from "../../components/article/article.js";
import {Events} from "../../modules/events.js";
import Page from "../_basic/page.js";
/**
 * ModalView-контроллер для соответсвующих страниц
 * @class Feed
 */
export default class Feed extends Page{
    view: FeedView;
    /**
     * Страница содержит главный компонент
     * @param {HTMLElement} root
     */
    constructor(root: HTMLElement) {
        super(root);
        this.view = new FeedView(root);
    }

    /**
     * Отобразить подконтрольную страницу.
     * Должен быть вызван render() для обновления.
     */
    async render() {
        await this.view.render();
        Requests.getArticles().then((articles) => {
            if (articles && Array.isArray(articles)) {
                this.view.mainContentElement!.innerHTML = '';
                articles.forEach((article) => {
                    const articleView = new Article();
                    articleView.render(article).then(() => {
                        this.view.mainContentElement!.appendChild(articleView.root);
                        articleView.subscribe();
                    });
                })
            }
        });
        Events.updateAuth();
    }

    /**
     * Подписка на связанные события
     */
    async subscribe() {
        this.view.children.get('navbar').subscribe();
    }
}