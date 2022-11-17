import BaseComponentView from './basic_component_view.js';
import BasicComponentView from "./basic_component_view.js";

/**
 * [Интерфейс] View_model для View
 * @class BasicComponent
 */
export default class BasicComponent {
    root: HTMLElement;
    view: BasicComponentView;

    /**
     * Конструктор
     */
    constructor() {
        this.root = document.createElement('div');
        this.view = new BaseComponentView();
    }

    /**
     * Перерисовка подконтрольного элемента
     * @return {HTMLElement}
     */
    async render(parameters?: object): Promise<HTMLElement> {
        return document.createElement('div');
    }

    /**
     * Подписка на связанные события
     */
    async subscribe(eventBus?: object) {
    }
}