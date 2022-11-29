import {Events} from "../../modules/events.js";
import SettingsPageView from "./settings_page_view.js";
import Page from "../_basic/page.js";
import Settings, {SettingsEventBus} from "../../components/settings/settings.js";
import {Requests} from "../../modules/requests.js";
import {NavbarEventBus} from "../../components/navbar/navbar";
import {URIChanger} from "../../modules/uri_changer.js";

/**
 * ModalView-контроллер для соответсвующих страниц
 * @class  SettingsPage
 */
export default class SettingsPage extends Page {
    view: SettingsPageView;

    /**
     * Страница содержит главный компонент
     * @param {HTMLElement} root
     */
    constructor(root: HTMLElement) {
        super(root);
        this.view = new SettingsPageView(root);
    }

    /**
     * Отобразить подконтрольную страницу.
     * Должен быть вызван render() для обновления.
     */
    async render() {
        const authCheck = await Requests.getSessionInfo();
        if (authCheck.status === 401) {
            alert("Вы не авторизованы");
            URIChanger.feedPage();
            return;
        }

        this.view.render();

        const userData = await Requests.getProfile();
        const settingsForm = new Settings();
        await settingsForm.render(userData);
        this.view.mainContentElement!.appendChild(settingsForm.root);
        this.view.children.set('form', settingsForm);

        Events.updateAuth();
    }

    /**
     * Подписка на связанные события
     */
    async subscribe() {
        const navbarEventBus: NavbarEventBus = {
            goToHotFeed: URIChanger.feedPage,
            //goToNewFeed: URIChanger.feedPage,
            //goToSubscribeFeed: URIChanger.feedPage,
            //openOtherMenu: Events.showOtherMenuListener,
            goToNewArticle: Events.newArticlePageListener,
            openSearch: Events.showSearchForm,
        }

        this.view.children.get('navbar').subscribe(navbarEventBus);

        const settingsEventBus: SettingsEventBus = {
            emailValidation: Events.emailValidateListenerSettings,
            loginValidation: Events.loginValidateListenerSettings,
            passwordValidation: Events.passwordValidateListenerSettings,
            repeatPasswordValidation: Events.passwordRepeatValidateListenerSettings,
            usernameValidation: Events.usernameValidateListenerSettings,
            saveProfile: Events.saveProfileListener,
        }
        this.view.children.get('form').subscribe(settingsEventBus);
    }
}