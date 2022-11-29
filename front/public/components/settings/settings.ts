import SettingsView from "./settingsView.js";
import BasicComponent from "../_basicComponent/basic_component.js";
import {Listener, UserData} from "../../common/types";

export type SettingsEventBus = {
    saveProfile: Listener,
    emailValidation: Listener,
    loginValidation: Listener,
    usernameValidation: Listener,
    passwordValidation: Listener,
    repeatPasswordValidation: Listener,
}

/**
 * ViewModel-компонент соответсвующего View
 * @class Settings
 */
export default class Settings extends BasicComponent {
    view: SettingsView;

    constructor() {
        super();
        this.view = new SettingsView();
    }

    async render(userData: UserData) {
        await super.render();
        this.root = await this.view.render(userData);
        return this.root;
    }

    async subscribe(eventBus: SettingsEventBus) {
        const saveButton = document.getElementById('save')!;
        saveButton.addEventListener('click', eventBus.saveProfile);

        const emailForm = document.getElementById("settings__email")!;
        emailForm.addEventListener('focusout', eventBus.emailValidation);

        const loginForm = document.getElementById("settings__login")!;
        loginForm.addEventListener('focusout', eventBus.loginValidation);

        const usernameForm = document.getElementById("settings__nickname")!;
        usernameForm.addEventListener('focusout', eventBus.usernameValidation);

        const passwordForm = document.getElementById("settings__password")!;
        passwordForm.addEventListener('focusout', eventBus.passwordValidation);
        passwordForm.addEventListener('focusout', eventBus.repeatPasswordValidation);

        const repeatPasswordForm = document.getElementById("settings__repeat_password")!;
        repeatPasswordForm.addEventListener('focusout', eventBus.repeatPasswordValidation);
    }
};