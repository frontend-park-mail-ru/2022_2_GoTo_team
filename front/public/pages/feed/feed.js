import Feed_view from "./feed_view.js";
/**
 * ModalView-контроллер для соответсвующих страниц
 * @class Feed
 */
export default class Feed {
    /**
     * Страница содержит главный компонент - .
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
    }

    /**
     * Подписка на связанные события
     */
    subscribe() {
    }
}