import PageView from "./page_view.js";

/**
 * ModalView-контроллер для соответсвующих страниц
 * @class Page
 */
export default class Page {
    view: PageView;

    /**
     * Страница содержит главный компонент - .
     * @param {HTMLElement} root
     */
    constructor(root: HTMLElement) {
        this.view = new PageView(root);
    }

    /**
     * Отобразить подконтрольную страницу.
     */
    async render(parameter?: any) {
        await this.view.render();
    }

    /**
     * Подписка на связанные события
     */
    async subscribe() {
    }
}