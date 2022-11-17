import BasicComponent from "../_basic_component/basic_component.js";
import RegistrationFormView from "./registration_form_view.js";
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

    /**
     * Универсальный компонент заголовка
     */
    constructor() {
        super();
        this.view = new RegistrationFormView();
    }

    /**
     * Перерисовка подконтрольного элемента
     * @return {HTMLElement}
     */
    async render() {
        await super.render();
        this.root = await this.view.render();
        return this.root;
    }

    /**
     * Подписка на связанные события
     * @param {Object} eventBus
     * @property {function} submit
     * @property {function?} goToLogin
     * @property {function} emailValidation
     * @property {function} loginValidation
     * @property {function} usernameValidation
     * @property {function} passwordValidation
     * @property {function} repeatPasswordValidation
     * @property {function?} closeForm
     */
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

        const emailForm = document.getElementById("registration_form__email");
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        emailForm.addEventListener('focusout', eventBus.emailValidation);

        const loginForm = document.getElementById("registration_form__login");
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        loginForm.addEventListener('focusout', eventBus.loginValidation);

        const usernameForm = document.getElementById("registration_form__username");
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        usernameForm.addEventListener('focusout', eventBus.usernameValidation);

        const passwordForm = document.getElementById("registration_form__password");
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        passwordForm.addEventListener('focusout', eventBus.passwordValidation);
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        passwordForm.addEventListener('focusout', eventBus.repeatPasswordValidation);

        const repeatPasswordForm = document.getElementById("registration_form__repeat-password");
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        repeatPasswordForm.addEventListener('focusout', eventBus.repeatPasswordValidation);
    }
};