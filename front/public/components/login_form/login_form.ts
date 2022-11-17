import LoginFormView from "./login_form_view.js";
import BasicComponent from "../_basic_component/basic_component.js";
import {Listener} from "../../common/types";

export type LoginFormEventBus = {
    submit: Listener,
    goToRegistration: Listener,
    emailValidation: Listener,
    passwordValidation: Listener,
    closeForm: Listener,
}

/**
 * View_model-компонент соответсвующего View
 * @class LoginForm
 */
export default class LoginForm extends BasicComponent {
    view: LoginFormView;
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
    async render(): Promise<HTMLElement> {
        await super.render();
        this.root = await this.view.render();
        return this.root;
    }

    /**
     * Подписка на связанные события
     * @param {LoginFormEventBus} eventBus
     * @property {function?} closeForm
     */
    async subscribe(eventBus: LoginFormEventBus) {
        await super.subscribe()
        const submit_button = document.getElementById("login_form__submit_button");
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        submit_button.addEventListener('click', eventBus.submit);

        const reg_button = document.getElementById("login_form__signup_button");
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        reg_button.addEventListener('click', eventBus.goToRegistration);

        const email_form = document.getElementById("login_form__email_login");
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        email_form.addEventListener('focusout', eventBus.emailValidation);

        const password_form = document.getElementById("login_form__password");
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        password_form.addEventListener('focusout', eventBus.passwordValidation);


        const close_button = document.getElementById("login_form__cross")!;
        if (typeof eventBus.closeForm !== 'undefined') {
            close_button.addEventListener('click', eventBus.closeForm);
        } else {
            this.root.removeChild(close_button);
        }
    }
};