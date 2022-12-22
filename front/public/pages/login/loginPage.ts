import {Events} from "../../modules/events.js";
import LoginPageView from "./loginPageView.js";
import Page from "../_basic/page.js";
import {PageLoaders} from "../../modules/pageLoaders.js";
import {NavbarEventBus} from "../../components/navbar/navbar";
import {URIChanger} from "../../modules/uriChanger.js";

/**
 * ModalView-контроллер для соответсвующих страниц
 * @class  LoginPage
 */
export default class LoginPage extends Page {
    view: LoginPageView;

    /**
     * Страница содержит главный компонент
     */
    constructor(root: HTMLElement) {
        super(root);
        this.view = new LoginPageView(root);
    }

    /**
     * Отобразить подконтрольную страницу.
     * Должен быть вызван render() для обновления.
     */
    async render() {
        Events.scrollUp();
        this.view.render();
        Events.updateAuth();
    }

    /**
     * Подписка на связанные события
     */
    async subscribe() {
        const navbarEventBus: NavbarEventBus = {
            goToRoot: URIChanger.rootPage,
            goToHotFeed: URIChanger.feedPage,
            //goToNewFeed: PageLoaders.feedPage,
            goToSubscribeFeed: URIChanger.subscriptionFeedPage,
            //goToNewArticle: PageLoaders.editArticle,
            goToNewArticle: URIChanger.editArticle,
            openAdvSearch: Events.openAdvSearchListener,
            search: Events.searchFormListener,
        }

        this.view.children.get('navbar')!.subscribe(navbarEventBus);
        const loginEventBus = {
            submit: Events.submitLogin,
            go_to_registration: PageLoaders.registrationPage,
            email_validation: Events.emailValidateListenerLogin,
            password_validation: Events.passwordValidateListenerLogin
        }
        this.view.children.get('form')!.subscribe(loginEventBus);

        const profile_button = document.getElementById('navbar__auth_button')!.lastChild!;
        profile_button.removeEventListener('click', Events.makeLoginOverlayListener);
        profile_button.addEventListener('click', PageLoaders.loginPage);
    }
}