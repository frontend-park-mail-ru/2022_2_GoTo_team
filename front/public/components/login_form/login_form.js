import LoginFormView from "./login_form_view.js";
import BasicComponent from "../_basic_component/basic_component.js";

/**
 * View_model-компонент соответсвующего View
 * @class LoginForm
 */
export default class LoginForm extends BasicComponent {
    /**
     * Универсальный компонент заголовка
     */
    constructor() {
        super();
        this.view = new LoginFormView();
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
     * @property {function} goToRegistration
     * @property {function} emailValidation
     * @property {function} passwordValidation
     * @property {function?} closeForm
     */
    subscribe(event_bus) {
        super.subscribe()
        const submit_button = document.getElementById("login_form__submit_button");
        submit_button.addEventListener('click', event_bus.submit);

        const reg_button = document.getElementById("login_form__signup_button");
        reg_button.addEventListener('click', event_bus.go_to_registration);

        const email_form = document.getElementById("login_form__email_login");
        email_form.addEventListener('focusout', event_bus.email_validation);

        const password_form = document.getElementById("login_form__password");
        password_form.addEventListener('focusout', event_bus.password_validation);


        const close_button = document.getElementById("login_form__cross");
        if (typeof event_bus.close_form !== 'undefined'){
            close_button.addEventListener('click', event_bus.close_form);
        }else{
            this.root.removeChild(close_button);
        }
    }
    //TODO:destroy()
};