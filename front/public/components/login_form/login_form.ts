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
     * @param {Object} eventBus
     * @property {function} submit
     * @property {function} goToRegistration
     * @property {function} emailValidation
     * @property {function} passwordValidation
     * @property {function?} closeForm
     */
    // @ts-expect-error TS(2416): Property 'subscribe' in type 'LoginForm' is not as... Remove this comment to see the full error message
    subscribe(eventBus: any) {
        super.subscribe()
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


        const close_button = document.getElementById("login_form__cross");
        if (typeof eventBus.closeForm !== 'undefined'){
            // @ts-expect-error TS(2531): Object is possibly 'null'.
            close_button.addEventListener('click', eventBus.closeForm);
        }else{
            this.root.removeChild(close_button);
        }
    }
    //TODO:destroy()
};