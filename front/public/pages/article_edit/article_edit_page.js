import ArticleEditPageView from "./article_edit_page_view.js";
import {Requests} from "../../modules/requests.js"
import {Events} from "../../modules/events.js";
import Page from "../_basic/page.js";
/**
 * ModalView-контроллер для соответсвующих страниц
 * @class ArticleEditPage
 */
export default class ArticleEditPage extends Page {
    /**
     * Страница содержит главный компонент
     * @param {HTMLElement} root
     */
    constructor(root) {
        super(root);
        this.view = new ArticleEditPageView(root);
    }

    /**
     * Отобразить подконтрольную страницу.
     * Должен быть вызван render() для обновления.
     */
    async render(articleId) {
        if (typeof articleId !== 'undefined'){
            const article = await Requests.getArticle(articleId);
            await this.view.render(article);
        }else{
            await this.view.render();
        }
        Events.updateAuth();
    }

    /**
     * Подписка на связанные события
     */
    subscribe() {
        this.view.children.get('navbar').subscribe();
        this.view.children.get('edit').subscribe();
    }
}