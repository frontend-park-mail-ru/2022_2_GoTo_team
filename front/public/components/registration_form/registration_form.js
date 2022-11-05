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
     * @param {Object} event_bus
     * @property {function} submit
     * @property {function?} go_to_login
     * @property {function} email_validation
     * @property {function} login_validation
     * @property {function} username_validation
     * @property {function} password_validation
     * @property {function} repeat_password_validation
     * @property {function?} close_form
     */
    subscribe(event_bus) {
        super.subscribe()
        const submit_button = document.getElementById("registration_form__submit_button");
        submit_button.addEventListener('click', event_bus.submit);

        const back_button = document.getElementById("login_form__go_back");
        if (typeof event_bus.go_to_login !== 'undefined') {

            back_button.addEventListener('click', event_bus.go_to_login);
        }else{
            this.root.removeChild(back_button);
        }

        const close_button = document.getElementById("login_form__cross");
        if (typeof event_bus.close_form !== 'undefined') {
            close_button.addEventListener('click', event_bus.close_form);
        }else{
            this.root.removeChild(close_button);
        }

        const email_form = document.getElementById("registration_form__email");
        email_form.addEventListener('focusout', event_bus.email_validation);

        const login_form = document.getElementById("registration_form__login");
        login_form.addEventListener('focusout', event_bus.login_validation);

        const username_form = document.getElementById("registration_form__username");
        username_form.addEventListener('focusout', event_bus.username_validation);

        const password_form = document.getElementById("registration_form__password");
        password_form.addEventListener('focusout', event_bus.password_validation);
        password_form.addEventListener('focusout', event_bus.repeat_password_validation);

        const repeat_password_form = document.getElementById("registration_form__repeat-password");
        repeat_password_form.addEventListener('focusout', event_bus.repeat_password_validation);
    }

    //TODO:destroy()
};