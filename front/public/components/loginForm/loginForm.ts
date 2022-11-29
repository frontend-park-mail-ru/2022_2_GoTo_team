import LoginFormView from "./loginFormView.js";
import BasicComponent from "../_basicComponent/basicComponent.js";
import {Listener} from "../../common/types";

export type LoginFormEventBus = {
    submit: Listener,
    goToRegistration: Listener,
    emailValidation: Listener,
    passwordValidation: Listener,
    closeForm: Listener,
}

/**
 * ViewModel-компонент соответсвующего View
 * @class LoginForm
 */
export default class LoginForm extends BasicComponent {
    view: LoginFormView;

    constructor() {
        super();
        this.view = new LoginFormView();
    }

    render(): HTMLElement {
        this.root = this.view.render();
        return this.root;
    }

    subscribe(eventBus: LoginFormEventBus) {
        const submit_button = document.getElementById("login_form__submit_button")!;
        submit_button.addEventListener('click', eventBus.submit);

        const reg_button = document.getElementById("login_form__signup_button")!;
        reg_button.addEventListener('click', eventBus.goToRegistration);

        const email_form = document.getElementById("login_form__email_login")!;
        email_form.addEventListener('focusout', eventBus.emailValidation);

        const password_form = document.getElementById("login_form__password")!;
        password_form.addEventListener('focusout', eventBus.passwordValidation);


        const close_button = document.getElementById("login_form__cross")!;
        if (typeof eventBus.closeForm !== 'undefined') {
            close_button.addEventListener('click', eventBus.closeForm);
        } else {
            this.root.removeChild(close_button);
        }
    }
};
