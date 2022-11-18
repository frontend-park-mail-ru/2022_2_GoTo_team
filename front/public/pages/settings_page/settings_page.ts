import {Events} from "../../modules/events.js";
import SettingsPageView from "./settings_page_view.js";
import Page from "../_basic/page.js";
import Settings from "../../components/settings/settings.js";
import {Requests} from "../../modules/requests.js";
import {NavbarEventBus} from "../../components/navbar/navbar";
import {PageLoaders} from "../../modules/page_loaders.js";

/**
 * ModalView-контроллер для соответсвующих страниц
 * @class  SettingsPage
 */
export default class SettingsPage extends Page{
    // @ts-ignore
    view: SettingsPageView;
    /**
     * Страница содержит главный компонент
     * @param {HTMLElement} root
     */
    constructor(root: any) {
        super(root);
        this.view = new SettingsPageView(root);
    }
    /**
     * Отобразить подконтрольную страницу.
     * Должен быть вызван render() для обновления.
     */
    async render() {
        this.view.render();

        const userData = await Requests.getProfile();
        const settingsForm = new Settings();
        await settingsForm.render(userData);
        this.view.mainContentElement.appendChild(settingsForm.root);
        this.view.children.set('form', settingsForm);

        Events.updateAuth();
    }

    /**
     * Подписка на связанные события
     */
    // @ts-ignore
    subscribe() {
        const navbarEventBus: NavbarEventBus = {
            goToHotFeed: PageLoaders.feedPage,
            goToNewFeed: PageLoaders.feedPage,
            goToSubscribeFeed: PageLoaders.feedPage,
            goToNewArticle: PageLoaders.editArticle,
        }

        this.view.children.get('navbar').subscribe(navbarEventBus);
        this.view.children.get('form').subscribe();
    }
}