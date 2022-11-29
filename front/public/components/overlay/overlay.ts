import BasicComponent from "../_basicComponent/basic_component.js";
import OverlayView from "./overlayView.js";

export type OverlayEventBus = {
}

/**
 * View_model-компонент соответсвующего View
 * @class Overlay
 */
export default class Overlay extends BasicComponent {
    view: OverlayView;

    /**
     * Универсальный компонент заголовка
     */
    constructor() {
        super();
        this.view = new OverlayView();
    }

    /**
     * Перерисовка подконтрольного элемента
     * @return {HTMLElement}
     */
    async render() {
        await super.render();
        this.root = await this.view.render();
        return this.root;
    }

    /**
     * Подписка на связанные события
     */
    async subscribe(eventBus: OverlayEventBus) {
        await super.subscribe();
    }
}