import Basic_component from "../_basic_component/basic_component.js";
import Registration_form_view from "./registration_form_view.js";
import {Events} from "../../modules/events.js";

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
    /**
     * Подписка на связанные события
     */
    subscribe() {
        super.subscribe()
        const back_button = document.getElementById("login_form__go_back");
        back_button .addEventListener('click', Events.redraw_login_overlay);

        const close_button = document.getElementById("login_form__cross");
        close_button.addEventListener('click', Events.close_overlay_listener);
    }
    //TODO:subscribe()
    //TODO:destroy()
};