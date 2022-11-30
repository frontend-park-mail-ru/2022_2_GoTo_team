import ArticleEditPageView from "./articleEditPageView.js";
import {Requests} from "../../modules/requests.js"
import {Events} from "../../modules/events.js";
import Page from "../_basic/page.js";
import {NavbarEventBus} from "../../components/navbar/navbar";
import {ArticleEditEventBus} from "../../components/articleEdit/articleEdit.js";
import {URIChanger} from "../../modules/uriChanger.js";

/**
 * ModalView-контроллер для соответсвующих страниц
 * @class ArticleEditPage
 */
export default class ArticleEditPage extends Page {
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
    async render(articleId?: number) {
        if (typeof articleId !== 'undefined'){
            const article = await Requests.getArticle(articleId);
            await this.view.render(article);
        }else{
            await this.view.render();
        }
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
        this.view.children.get('navbar')!.subscribe(navbarEventBus);

        const articleEventBus: ArticleEditEventBus = {
            articleCreate: Events.articleCreateListener,
            articleRemove: Events.articleRemove,
            articleUpdate: Events.articleUpdateListener,
            tagAdd: Events.addArticleTagListener,
        }
        this.view.children.get('edit')!.subscribe(articleEventBus);
    }
}