import Article_page_view from "./article_page_view.js";
import {Requests} from "../../modules/requests.js"
import {Events} from "../../modules/events.js";
import Page from "../_basic/page.js";
/**
 * ModalView-контроллер для соответсвующих страниц
 * @class Article_page
 */
export default class Article_page extends Page{
    /**
     * Страница содержит главный компонент
     * @param {HTMLElement} root
     */
    constructor(root) {
        super(root);
        this.view = new Article_page_view(root);
    }

    /**
     * Отобразить подконтрольную страницу.
     * Должен быть вызван render() для обновления.
     */
    async render(article_id) {

        const article = await Requests.get_article(article_id);
        this.view.render(article);
        Events.update_auth();
    }

    /**
     * Подписка на связанные события
     */
    subscribe() {
        this.view.children.get('navbar').subscribe();
        this.view.children.get('article').subscribe();
    }
}