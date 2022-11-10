import PageView from "./page_view.js";
/**
 * ModalView-контроллер для соответсвующих страниц
 * @class Page
 */
export default class Page {
    /**
     * Страница содержит главный компонент - .
     * @param {HTMLElement} root
     */
    constructor(root) {
        this.view = new PageView(root);
    }

    /**
     * Отобразить подконтрольную страницу.
     */
    render() {
        this.view.render();
    }

    /**
     * Подписка на связанные события
     */
    subscribe() {
    }
}