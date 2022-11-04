import Basic_component from "../_basic_component/basic_component.js";
import Overlay_view from "./overlay_view.js";

/**
 * View_model-компонент соответсвующего View
 * @class Overlay
 */
export default class Overlay extends Basic_component {
    /**
     * Универсальный компонент заголовка
     */
    constructor() {
        super();
        this.view = new Overlay_view();
    }
    /**
     * Перерисовка подконтрольного элемента
     * @return {HTMLElement}
     */
    render() {
        super.render();
        this.root = this.view.render();
        return this.root;
    }
};