import Login_form_view from "./login_form_view";
import Basic_component from "../_basic_component/basic_component";

/**
 * View_model-компонент соответсвующего View
 * @class Login_form
 */
export default class Login_form extends Basic_component {
    /**
     * Универсальный компонент заголовка
     */
    constructor() {
        super();
        this.view = new Login_form_view();
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