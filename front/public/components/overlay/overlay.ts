import BasicComponent from "../_basic_component/basic_component.js";
import OverlayView from "./overlay_view.js";

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
    async render(eventBus?: object) {
        await super.render();
        this.root = await this.view.render();
        return this.root;
    }
}