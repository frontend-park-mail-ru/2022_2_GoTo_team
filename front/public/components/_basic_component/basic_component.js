import BaseComponentView from './basic_component_view.js';

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
        this.event_removers = [];
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
     */
    subscribe() {
    }

    /**
     * Очистка памяти и отписка от связанных событий
     */
    destroy() {
        this.view = null;
        this.event_removers.forEach((event_remover) => {
            if (typeof event_remover === 'function') {
                event_remover();
            }
        });
    }
}