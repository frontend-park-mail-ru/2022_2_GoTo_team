import Basic_component from "../_basic_component/basic_component";
import Registration_form_view from "./registration_form_view";

/**
 * View_model-компонент соответсвующего View
 * @class Registration_form
 */
export default class Registration_form extends Basic_component {
    /**
     * Универсальный компонент заголовка
     */
    constructor() {
        super();
        this.view = new Registration_form_view();
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