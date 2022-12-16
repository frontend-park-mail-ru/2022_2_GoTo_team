import {Events} from "../../modules/events.js";
import Page404View from "./page404View";
import Page from "../_basic/page.js";
import {PageLoaders} from "../../modules/pageLoaders.js";
import {NavbarEventBus} from "../../components/navbar/navbar";
import {URIChanger} from "../../modules/uriChanger.js";

/**
 * ModalView-контроллер для соответсвующих страниц
 * @class  Page404
 */
export default class Page404 extends Page {
    view: Page404View;

    /**
     * Страница содержит главный компонент
     */
    constructor(root: HTMLElement) {
        super(root);
        this.view = new Page404View(root);
    }

    /**
     * Отобразить подконтрольную страницу.
     * Должен быть вызван render() для обновления.
     */
    async render() {
        Events.scrollUp();
        await this.view.render();
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
            //goToSubscribeFeed: PageLoaders.feedPage,
            //goToNewArticle: PageLoaders.editArticle,
            goToNewArticle: URIChanger.editArticle,
            openAdvSearch: Events.openAdvSearchListener,
            search: Events.searchFormListener,
        }

        this.view.children.get('navbar')!.subscribe(navbarEventBus);
    }
}