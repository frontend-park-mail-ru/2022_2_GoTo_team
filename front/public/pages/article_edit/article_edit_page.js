import Article_edit_page_view from "./article_edit_page_view.js";
import {Requests} from "../../modules/requests.js"
import {Events} from "../../modules/events.js";
import Page from "../_basic/page.js";
/**
 * ModalView-контроллер для соответсвующих страниц
 * @class Article_edit_page
 */
export default class Article_edit_page extends Page{
    /**
     * Страница содержит главный компонент
     * @param {HTMLElement} root
     */
    constructor(root) {
        super(root);
        this.view = new Article_edit_page_view(root);
    }

    /**
     * Отобразить подконтрольную страницу.
     * Должен быть вызван render() для обновления.
     */
    async render(article_id) {
        if (typeof article_id !== 'undefined'){
            const article = await Requests.get_article(article_id);
            await this.view.render(article);
        }else{
            await this.view.render();
        }
        Events.update_auth();
    }

    /**
     * Подписка на связанные события
     */
    subscribe() {
        this.view.children.get('navbar').subscribe();
        this.view.children.get('edit').subscribe();
    }
}