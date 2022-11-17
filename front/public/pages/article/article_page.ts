import ArticlePageView from "./article_page_view.js";
import {Requests} from "../../modules/requests.js"
import {Events} from "../../modules/events.js";
import Page from "../_basic/page.js";
/**
 * ModalView-контроллер для соответсвующих страниц
 * @class ArticlePage
 */
export default class ArticlePage extends Page{
    /**
     * Страница содержит главный компонент
     * @param {HTMLElement} root
     */
    constructor(root: any) {
        super(root);
        this.view = new ArticlePageView(root);
    }

    /**
     * Отобразить подконтрольную страницу.
     * Должен быть вызван render() для обновления.
     */
    async render(articleId: number) {
        const article = await Requests.getArticle(articleId);
        await this.view.render(article);
        Events.updateAuth();
    }

    /**
     * Подписка на связанные события
     */
    async subscribe() {
        this.view.children.get('navbar').subscribe();
        this.view.children.get('article').subscribe();
    }
}