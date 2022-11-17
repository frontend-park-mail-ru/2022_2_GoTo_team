import {Events} from "../../modules/events.js";
import LoginPageView from "./login_page_view.js";
import Page from "../_basic/page.js";
import RegistrationPage from "../registration/registration_page.js";
import {PageLoaders} from "../../modules/page_loaders.js";

/**
 * ModalView-контроллер для соответсвующих страниц
 * @class  LoginPage
 */
export default class LoginPage extends Page{
    // @ts-ignore
    view: LoginPageView;
    /**
     * Страница содержит главный компонент
     * @param {HTMLElement} root
     */
    constructor(root: any) {
        super(root);
        this.view = new LoginPageView(root);
    }
    /**
     * Отобразить подконтрольную страницу.
     * Должен быть вызван render() для обновления.
     */
    // @ts-ignore
    render() {
        this.view.render();

        Events.updateAuth();
    }

    /**
     * Подписка на связанные события
     */
    // @ts-ignore
    subscribe() {
       this.view.children.get('navbar').subscribe();
       const loginEventBus = {
            submit: Events.submitLogin,
            go_to_registration: PageLoaders.registrationPage,
            email_validation: Events.emailValidateListenerLogin,
            password_validation: Events.passwordValidateListenerLogin
       }
       this.view.children.get('form').subscribe(loginEventBus);

       // @ts-expect-error TS(2531): Object is possibly 'null'.
       const profile_button = document.getElementById('navbar__auth_button').lastChild;
       // @ts-expect-error TS(2531): Object is possibly 'null'.
       profile_button.removeEventListener('click', Events.makeLoginOverlayListener);
       // @ts-expect-error TS(2531): Object is possibly 'null'.
       profile_button.addEventListener('click', PageLoaders.loginPage);
    }
}