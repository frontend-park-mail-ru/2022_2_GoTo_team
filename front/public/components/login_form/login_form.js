import Login_form_view from "./login_form_view.js";
import Basic_component from "../_basic_component/basic_component.js";
import {Events} from "../../modules/events.js";

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

    /**
     * Подписка на связанные события
     */
    subscribe() {
        super.subscribe()
        const reg_button = document.getElementById("login_form__signup_button");
        reg_button.addEventListener('click', Events.redraw_registration_overlay);

        const submit_button = document.getElementById("login_form__submit_button");
        submit_button.addEventListener('click', Events.submit_login);

        const close_button = document.getElementById("login_form__cross");
        close_button.addEventListener('click', Events.close_overlay_listener);
    }
    //TODO:subscribe()
    //TODO:destroy()
};