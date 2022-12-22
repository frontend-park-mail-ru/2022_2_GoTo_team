import LoginFormView from "./loginFormView.js";
import BasicComponent from "../_basicComponent/basicComponent.js";
import {Listener, Subscription} from "../../common/types";

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
        let subscription: Subscription;
        const submitButton = document.getElementById("login_form__submit_button")!;
        subscription = {
            element: submitButton,
            event: 'click',
            listener: eventBus.submit,
        }
        this._subscribeEvent(subscription);

        const regButton = document.getElementById("login_form__signup_button")!;
        subscription = {
            element: regButton,
            event: 'click',
            listener: eventBus.goToRegistration,
        }
        this._subscribeEvent(subscription);

        const emailForm = document.getElementById("login_form__email_login")!;
        subscription = {
            element: emailForm,
            event: 'focusout',
            listener: eventBus.emailValidation,
        }
        this._subscribeEvent(subscription);

        const passwordForm = document.getElementById("login_form__password")!;
        subscription = {
            element: passwordForm,
            event: 'focusout',
            listener: eventBus.passwordValidation,
        }
        this._subscribeEvent(subscription);


        const closeButton = document.getElementById("login_form__cross")!;
        if (typeof eventBus.closeForm !== 'undefined') {
            subscription = {
                element: closeButton,
                event: 'click',
                listener: eventBus.closeForm,
            }
            this._subscribeEvent(subscription);
        } else {
            this.root.removeChild(closeButton);
        }
    }
}
