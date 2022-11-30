import BasicComponent from "../_basicComponent/basicComponent.js";
import RegistrationFormView from "./registrationFormView.js";
import {Listener, Subscription} from "../../common/types";

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
 * ViewModel-компонент соответсвующего View
 * @class RegistrationForm
 */
export default class RegistrationForm extends BasicComponent {
    view: RegistrationFormView;

    constructor() {
        super();
        this.view = new RegistrationFormView();
    }

    render(): HTMLElement {
        this.root =this.view.render();
        return this.root;
    }

    subscribe(eventBus: RegistrationFormEventBus) {
        let subscription: Subscription;
        const submitButton = document.getElementById("registration_form__submit_button")!;
        subscription = {
            element: submitButton,
            event: 'click',
            listener: eventBus.submit,
        }
        this._subscribeEvent(subscription);

        const backButton = document.getElementById("login_form__go_back")!;
        if (eventBus.goToLogin !== undefined) {
            subscription = {
                element: backButton,
                event: 'click',
                listener: eventBus.goToLogin,
            }
            this._subscribeEvent(subscription);
        } else {
            this.root.removeChild(backButton);
        }

        const closeButton = document.getElementById("login_form__cross")!;
        if (eventBus.closeForm !== undefined) {
            subscription = {
                element: closeButton,
                event: 'click',
                listener: eventBus.closeForm,
            }
            this._subscribeEvent(subscription);
        } else {
            this.root.removeChild(closeButton);
        }

        const emailForm = document.getElementById("registration_form__email")!;
        subscription = {
            element: emailForm,
            event: 'focusout',
            listener: eventBus.emailValidation,
        }
        this._subscribeEvent(subscription);

        const loginForm = document.getElementById("registration_form__login")!;
        subscription = {
            element: loginForm,
            event: 'focusout',
            listener: eventBus.loginValidation,
        }
        this._subscribeEvent(subscription);

        const usernameForm = document.getElementById("registration_form__username")!;
        subscription = {
            element: usernameForm,
            event: 'focusout',
            listener: eventBus.usernameValidation,
        }
        this._subscribeEvent(subscription);

        const passwordForm = document.getElementById("registration_form__password")!;
        subscription = {
            element: passwordForm,
            event: 'focusout',
            listener: eventBus.passwordValidation,
        }
        this._subscribeEvent(subscription);
        subscription.listener = eventBus.repeatPasswordValidation;
        this._subscribeEvent(subscription);

        const repeatPasswordForm = document.getElementById("registration_form__repeat-password")!;
        subscription = {
            element: repeatPasswordForm,
            event: 'focusout',
            listener: eventBus.repeatPasswordValidation,
        }
        this._subscribeEvent(subscription);
    }
};
