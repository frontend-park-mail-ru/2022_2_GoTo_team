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

        const submit_button = document.getElementById("registration_form__submit_button");
        submit_button.addEventListener('click', Events.submit_registration);

        const email_form = document.getElementById("registration_form__email");
        email_form.addEventListener('focusout', Events.email_validate_listener_registration);

        const login_form = document.getElementById("registration_form__login");
        login_form.addEventListener('focusout', Events.login_validate_listener_registration);

        const username_form = document.getElementById("registration_form__username");
        username_form.addEventListener('focusout', Events.username_validate_listener_registration);

        const password_form = document.getElementById("registration_form__password");
        password_form.addEventListener('focusout', Events.password_validate_listener_registration);
        password_form.addEventListener('focusout', Events.password_repeat_validate_listener_registration);

        const repeat_password_form = document.getElementById("registration_form__repeat-password");
        repeat_password_form.addEventListener('focusout', Events.password_repeat_validate_listener_registration);
    }
    //TODO:destroy()
};