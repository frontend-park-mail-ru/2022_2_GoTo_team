import ArticlePageView from "./article_page_view.js";
import {Requests} from "../../modules/requests.js"
import {Events} from "../../modules/events.js";
import Page from "../_basic/page.js";
import {OpenedArticleEventBus} from "../../components/opened_article/opened_article";
import {NavbarEventBus} from "../../components/navbar/navbar";
import {PageLoaders} from "../../modules/page_loaders.js";
import {APIStrings} from "../../common/consts.js";

/**
 * ModalView-контроллер для соответсвующих страниц
 * @class ArticlePage
 */
export default class ArticlePage extends Page {
    view: ArticlePageView;

    /**
     * Страница содержит главный компонент
     * @param {HTMLElement} root
     */
    constructor(root: any) {
        super(root);
        this.view = new ArticlePageView(root);
    }

    /**
     * Отобразить подконтрольную страницу.
     * Должен быть вызван render() для обновления.
     */
    async render(articleId: number) {
        Events.setLocation(APIStrings.articlePage(articleId));
        const article = await Requests.getArticle(articleId);
        await this.view.render(article);
        Events.updateAuth();
    }

    /**
     * Подписка на связанные события
     */
    async subscribe() {
        const navbarEventBus: NavbarEventBus = {
            goToHotFeed: PageLoaders.feedPage,
            goToNewFeed: PageLoaders.feedPage,
            goToSubscribeFeed: PageLoaders.feedPage,
            //goToNewArticle: PageLoaders.editArticle,
            openOtherMenu: Events.showOtherMenuListener,
            openSearch: Events.showSearchForm,
        }

        const articleEventBus: OpenedArticleEventBus = {
            goToCategoryFeed: Events.goToCategoryFeed,
            goToAuthorFeed: Events.goToAuthorFeed,
        }

        this.view.children.get('navbar').subscribe(navbarEventBus);
        this.view.children.get('article').subscribe(articleEventBus);
    }
}