import {Events} from "../../modules/events.js";
import LoginPageView from "./login_page_view.js";
import Page from "../_basic/page.js";
import {PageLoaders} from "../../modules/pageLoaders.js";
import {NavbarEventBus} from "../../components/navbar/navbar";
import {URIChanger} from "../../modules/uriChanger.js";

/**
 * ModalView-контроллер для соответсвующих страниц
 * @class  LoginPage
 */
export default class LoginPage extends Page {
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
        const navbarEventBus: NavbarEventBus = {
            goToHotFeed: PageLoaders.feedPage,
            //goToNewFeed: PageLoaders.feedPage,
            //goToSubscribeFeed: PageLoaders.feedPage,
            //goToNewArticle: PageLoaders.editArticle,
            //openOtherMenu: Events.showOtherMenuListener,
            goToNewArticle: URIChanger.editArticle,
            openSearch: Events.showSearchForm,
        }

        this.view.children.get('navbar').subscribe(navbarEventBus);
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