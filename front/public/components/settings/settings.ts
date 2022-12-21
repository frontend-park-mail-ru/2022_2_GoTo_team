import SettingsView from "./settingsView.js";
import BasicComponent from "../_basicComponent/basicComponent.js";
import {Listener, Subscription, UserData} from "../../common/types";

export type SettingsEventBus = {
    saveProfile: Listener,
    emailValidation: Listener,
    loginValidation: Listener,
    usernameValidation: Listener,
    passwordValidation: Listener,
    repeatPasswordValidation: Listener,
    tooBigAlert: Listener,
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

    render(userData: UserData): HTMLElement {
        this.root = this.view.render(userData);
        return this.root;
    }

    subscribe(eventBus: SettingsEventBus) {
        let subscription: Subscription;
        const saveButton = document.getElementById('save')!;
        subscription = {
            element: saveButton,
            event: 'click',
            listener: eventBus.saveProfile,
        }
        this._subscribeEvent(subscription);

        const emailForm = document.getElementById("settings__email")!;
        subscription = {
            element: emailForm,
            event: 'focusout',
            listener: eventBus.emailValidation,
        }
        this._subscribeEvent(subscription);

        const loginForm = document.getElementById("settings__login")!;
        subscription = {
            element: loginForm,
            event: 'focusout',
            listener: eventBus.loginValidation,
        }
        this._subscribeEvent(subscription);

        const usernameForm = document.getElementById("settings__nickname")!;
        subscription = {
            element: usernameForm,
            event: 'focusout',
            listener: eventBus.usernameValidation,
        }
        this._subscribeEvent(subscription);

        const passwordForm = document.getElementById("settings__password")!;
        subscription = {
            element: passwordForm,
            event: 'focusout',
            listener: eventBus.passwordValidation,
        }
        this._subscribeEvent(subscription);
        subscription.listener = eventBus.repeatPasswordValidation;
        this._subscribeEvent(subscription);

        const repeatPasswordForm = document.getElementById("settings__repeat_password")!;
        subscription = {
            element: repeatPasswordForm,
            event: 'focusout',
            listener: eventBus.repeatPasswordValidation,
        }
        this._subscribeEvent(subscription);

        const inputImageForm = this.root.querySelector("#avatar_upload")! as HTMLInputElement;
        let loadedFile: File;
        subscription = {
            element: inputImageForm,
            event: 'change',
            listener: (e) => {
                const image = this.root.querySelector('.settings__avatar_row_avatar__image')!;
                console.log(inputImageForm.files![0].size);
                if(inputImageForm.files![0].size > 4 * 1024 * 1024){
                    eventBus.tooBigAlert();
                    const dataTransfer = new DataTransfer();
                    if (loadedFile !== undefined){
                        dataTransfer.items.add(loadedFile);
                    }
                    inputImageForm.files = dataTransfer.files;
                    return;
                }
                image.setAttribute('src', URL.createObjectURL(inputImageForm.files![0]));
                loadedFile = inputImageForm.files![0];
            },
        }
        this._subscribeEvent(subscription);
    }
}
