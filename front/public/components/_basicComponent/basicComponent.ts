import BasicComponentView from "./basicComponentView.js";

/**
 * [Интерфейс] ViewModel для View
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
        this.view = new BasicComponentView();
    }

    /**
     * Перерисовка подконтрольного элемента
     */
    render(parameters?: object): HTMLElement | Promise<HTMLElement> {
        return document.createElement('div');
    }

    /**
     * Подписка на связанные события
     */
    subscribe(eventBus?: object): void {
    }
}