import {Events} from "../../modules/events.js";
import Page from "../_basic/page.js";
import CategoryFeedView from "./categoryFeedView.js";
import {Requests} from "../../modules/requests.js";
import Article, {ArticleComponentEventBus} from "../../components/article/article.js";
import CategoryFeedHeader, {
    CategoryFeedHeaderEventBus
} from "../../components/categoryFeedHeader/categoryFeedHeader.js";
import {NavbarEventBus} from "../../components/navbar/navbar";
import {URIChanger} from "../../modules/uriChanger.js";

/**
 * ModalView-контроллер для соответсвующих страниц
 * @class  CategoryFeed
 */
export default class CategoryFeed extends Page {
    view: CategoryFeedView;

    /**
     * Страница содержит главный компонент
     */
    constructor(root: HTMLElement) {
        super(root);
        this.view = new CategoryFeedView(root);
    }

    /**
     * Отобразить подконтрольную страницу.
     * Должен быть вызван render() для обновления.
     */
    async render(category: string): Promise<void> {
        Events.scrollUp();
        await this.view.render();

        category = decodeURIComponent(category);

        Requests.categoryHeaderInfo(category).then((categoryData) => {
            const eventBus: CategoryFeedHeaderEventBus = {};

            const header = new CategoryFeedHeader();
            header.render(categoryData);
            header.subscribe(eventBus);
            this.view.center!.insertBefore(header.root, this.view.center!.children[0]);
        });

        Requests.getCategoryArticles(category).then((articles) => {
            const articleEventBus: ArticleComponentEventBus = {
                goToAuthorFeed: Events.goToAuthorFeed,
                goToCategoryFeed: Events.goToCategoryFeed,
                openArticle: URIChanger.articlePage,
                openTagPage: URIChanger.searchByTagPage,
            }

            if (articles && Array.isArray(articles)) {
                this.view.mainContentElement!.innerHTML = '';
                articles.forEach((article) => {
                    const articleView = new Article();
                    articleView.render(article)
                    articleView.subscribe(articleEventBus);
                    this.view.mainContentElement!.appendChild(articleView.root);
                })
            }
        });

        Events.updateAuth();
    }

    /**
     * Подписка на связанные события
     */
    async subscribe(): Promise<void> {
        const navbarEventBus: NavbarEventBus = {
            goToHotFeed: URIChanger.feedPage,
            //goToNewFeed: URIChanger.feedPage,
            //goToSubscribeFeed: URIChanger.feedPage,
            //openOtherMenu: Events.showOtherMenuListener,
            goToNewArticle: Events.newArticlePageListener,
            openSearch: Events.showSearchForm,
        }

        this.view.children.get('navbar')!.subscribe(navbarEventBus);
    }
}