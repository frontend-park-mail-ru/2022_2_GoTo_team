import {Events} from "../../modules/events.js";
import SettingsPageView from "./settingsPageView.js";
import Page from "../_basic/page.js";
import Settings, {SettingsEventBus} from "../../components/settings/settings.js";
import {Requests} from "../../modules/requests.js";
import {NavbarEventBus} from "../../components/navbar/navbar";
import {URIChanger} from "../../modules/uriChanger.js";

/**
 * ModalView-контроллер для соответсвующих страниц
 * @class  SettingsPage
 */
export default class SettingsPage extends Page {
    view: SettingsPageView;

    constructor(root: HTMLElement) {
        super(root);
        this.view = new SettingsPageView(root);
    }

    /**
     * Отобразить подконтрольную страницу.
     * Должен быть вызван render() для обновления.
     */
    async render() {
        Events.scrollUp();
        await this.view.render();
        if (window.sessionStorage.getItem('login') === null){
            this.view.mainContentElement!.innerHTML = '';
            Events.openAlertMessage('Вы не авторизованы', 'На главную', URIChanger.rootPage);
        } else {
            const userData = await Requests.getProfile();
            const settingsForm = new Settings();
            await settingsForm.render(userData);
            this.view.mainContentElement!.appendChild(settingsForm.root);
            this.view.children.set('form', settingsForm);
        }
        Events.updateAuth();
    }

    /**
     * Подписка на связанные события
     */
    async subscribe() {
        const navbarEventBus: NavbarEventBus = {
            goToRoot: URIChanger.rootPage,
            goToHotFeed: URIChanger.feedPage,
            //goToNewFeed: URIChanger.feedPage,
            goToSubscribeFeed: URIChanger.subscriptionFeedPage,
            //openOtherMenu: Events.showOtherMenuListener,
            goToNewArticle: Events.newArticlePageListener,
            openAdvSearch: Events.openAdvSearchListener,
            search: Events.searchFormListener,
        }

        this.view.children.get('navbar')!.subscribe(navbarEventBus);

        const settingsEventBus: SettingsEventBus = {
            emailValidation: Events.emailValidateListenerSettings,
            loginValidation: Events.loginValidateListenerSettings,
            passwordValidation: Events.passwordValidateListenerSettings,
            repeatPasswordValidation: Events.passwordRepeatValidateListenerSettings,
            usernameValidation: Events.usernameValidateListenerSettings,
            saveProfile: Events.saveProfileListener,
            tooBigAlert: Events.tooBigProfilePicture,
        }
        this.view.children.get('form')!.subscribe(settingsEventBus);
    }
}