import Navbar_view from "./navbar_view.js";
import Basic_component from "../_basic_component/basic_component";

/**
 * View_model-компонент соответсвующего View
 * @class Navbar
 */
export default class Navbar extends Basic_component {
    /**
     * Универсальный компонент заголовка
     */
    constructor() {
        super();
        this.view = new Navbar_view();
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
    //TODO:subscribe()
    //TODO:destroy()
};