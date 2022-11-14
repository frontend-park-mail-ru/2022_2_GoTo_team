import {Events} from "../../modules/events.js";
import Page from "../_basic/page.js";
import RegistrationPageView from "./registration_page_view.js";
import {PageLoaders} from "../../modules/page_loaders.js";
/**
 * ModalView-контроллер для соответсвующих страниц
 * @class  RegistrationPage
 */
export default class RegistrationPage extends Page{
    /**
     * Страница содержит главный компонент
     * @param {HTMLElement} root
     */
    constructor(root: any) {
        super(root);
        this.view = new RegistrationPageView(root);
    }
    /**
     * Отобразить подконтрольную страницу.
     * Должен быть вызван render() для обновления.
     */
    render() {
        this.view.render();
        Events.updateAuth();
    }

    /**
     * Подписка на связанные события
     */
    subscribe() {
        this.view.children.get('navbar').subscribe();
        const registrationEventBus = {
            submit: Events.submitRegistration,
            email_validation: Events.emailValidateListenerRegistration,
            login_validation: Events.loginValidateListenerRegistration,
            username_validation: Events.usernameValidateListenerRegistration,
            password_validation: Events.passwordValidateListenerRegistration,
            repeat_password_validation: Events.passwordRepeatValidateListenerRegistration,
        }
        this.view.children.get('form').subscribe(registrationEventBus);
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        const profileButton = document.getElementById('navbar__auth_button').lastChild;
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        profileButton.removeEventListener('click', Events.makeLoginOverlayListener);
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        profileButton.addEventListener('click', PageLoaders.loginPage);
    }
}