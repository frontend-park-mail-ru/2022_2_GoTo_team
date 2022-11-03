import BaseComponentView from './basic_component_view';

/**
 * [Интерфейс] View_model для View
 * @class Basic_component
 */
export default class Basic_component {
    /**
     * Конструктор
     */
    constructor() {
        this.root = document.createElement('div');
        this.view = new BaseComponentView();
        this.unsubscribes = [];
    }


    /**
     * Перерисовка подконтрольного элемента
     * @return {HTMLElement}
     */
    render() {
        return document.createElement('div');
    }
    /**
     * Подписка на связанные события
     * param {object} event_bus
     * @return {boolean} Успешность выполнения(наличие всех нужных событий)
     */
    subscribe(event_bus) {
        return true
    }

    /**
     * Очистка памяти и отписка от связанных событий
     */
    destroy() {
        this.view = null;
        this.unsubscribes.forEach((unsubscribe) => {
            if (typeof unsubscribe === 'function') {
                unsubscribe();
            }
        });
    }
}