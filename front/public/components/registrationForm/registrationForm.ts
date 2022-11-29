import BasicComponent from "../_basicComponent/basic_component.js";
import RegistrationFormView from "./registrationFormView.js";
import {Listener} from "../../common/types";

export type RegistrationFormEventBus = {
    submit: Listener,
    goToLogin: Listener,
    emailValidation: Listener,
    loginValidation: Listener,
    usernameValidation: Listener,
    passwordValidation: Listener,
    repeatPasswordValidation: Listener,
    closeForm: Listener,
}

/**
 * View_model-компонент соответсвующего View
 * @class RegistrationForm
 */
export default class RegistrationForm extends BasicComponent {
    view: RegistrationFormView;

    constructor() {
        super();
        this.view = new RegistrationFormView();
    }

    async render() {
        await super.render();
        this.root = await this.view.render();
        return this.root;
    }

    async subscribe(eventBus: RegistrationFormEventBus) {
        await super.subscribe();
        const submitButton = document.getElementById("registration_form__submit_button")!;
        submitButton.addEventListener('click', eventBus.submit);

        const backButton = document.getElementById("login_form__go_back")!;
        if (typeof eventBus.goToLogin !== 'undefined') {
            backButton.addEventListener('click', eventBus.goToLogin);
        } else {
            this.root.removeChild(backButton);
        }

        const closeButton = document.getElementById("login_form__cross")!;
        if (typeof eventBus.closeForm !== 'undefined') {
            closeButton.addEventListener('click', eventBus.closeForm);
        } else {
            this.root.removeChild(closeButton);
        }

        const emailForm = document.getElementById("registration_form__email")!;
        emailForm.addEventListener('focusout', eventBus.emailValidation);

        const loginForm = document.getElementById("registration_form__login")!;
        loginForm.addEventListener('focusout', eventBus.loginValidation);

        const usernameForm = document.getElementById("registration_form__username")!;
        usernameForm.addEventListener('focusout', eventBus.usernameValidation);

        const passwordForm = document.getElementById("registration_form__password")!;
        passwordForm.addEventListener('focusout', eventBus.passwordValidation);
        passwordForm.addEventListener('focusout', eventBus.repeatPasswordValidation);

        const repeatPasswordForm = document.getElementById("registration_form__repeat-password")!;
        repeatPasswordForm.addEventListener('focusout', eventBus.repeatPasswordValidation);
    }
};