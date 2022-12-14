import ArticleEditPageView from "./articleEditPageView.js";
import {Requests} from "../../modules/requests.js"
import {Events} from "../../modules/events.js";
import Page from "../_basic/page.js";
import {NavbarEventBus} from "../../components/navbar/navbar";
import {ArticleEditEventBus} from "../../components/articleEdit/articleEdit.js";
import {URIChanger} from "../../modules/uriChanger.js";
import {FullArticleData} from "../../common/types";
import SettingsPageView from "../settingsPage/settingsPageView";

/**
 * ModalView-контроллер для соответсвующих страниц
 * @class ArticleEditPage
 */
export default class ArticleEditPage extends Page {

    view: ArticleEditPageView;

    /**
     * Страница содержит главный компонент
     * @param {HTMLElement} root
     */
    constructor(root: HTMLElement) {
        super(root);
        this.view = new ArticleEditPageView(root);
    }

    /**
     * Отобразить подконтрольную страницу.
     * Должен быть вызван render() для обновления.
     */
    async render(article?: FullArticleData) {
        Events.scrollUp();
        if (article !== undefined){
            await this.view.render(article);
        }else{
            await this.view.render();
        }
        if (window.sessionStorage.getItem('login') === null){
            this.view.mainContentElement!.innerHTML = '';
            Events.openAlertMessage('Вы не авторизованы', 'На главную', URIChanger.rootPage);
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

        const articleEventBus: ArticleEditEventBus = {
            articleCreate: Events.articleCreateListener,
            articleRemove: Events.articleRemoveListener,
            articleUpdate: Events.articleUpdateListener,
            tagAdd: Events.addArticleTagListener,
        }
        this.view.children.get('edit')!.subscribe(articleEventBus);
    }
}