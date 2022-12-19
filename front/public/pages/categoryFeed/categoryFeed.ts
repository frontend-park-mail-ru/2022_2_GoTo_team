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
import {CategoryData} from "../../common/types";
import NoResults from "../../components/noResults/noResults";

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
    async render(categoryData: CategoryData): Promise<void> {
        Events.scrollUp();
        await this.view.render();

        const eventBus: CategoryFeedHeaderEventBus = {
            subscribe: Events.categorySubscribeListener,
            unsubscribe: Events.categoryUnsubscribeListener,
        };

        const header = new CategoryFeedHeader();
        header.render(categoryData);
        header.subscribe(eventBus);
        this.view.center!.insertBefore(header.root, this.view.center!.children[0]);

        Requests.getCategoryArticles(categoryData.name).then((articles) => {
            const articleEventBus: ArticleComponentEventBus = {
                goToAuthorFeed: Events.goToAuthorFeed,
                goToCategoryFeed: Events.goToCategoryFeed,
                openArticle: URIChanger.articlePage,
                openTagPage: URIChanger.searchByTagPage,
                editArticle: Events.editArticleListener,
                shareListener: Events.openShareBox,
                likeListener: Events.articleLikeListener,
                openLogin: Events.makeLoginOverlayListener,
            }

            if (articles && Array.isArray(articles)) {
                if (articles.length > 0){
                    this.view.mainContentElement!.innerHTML = '';
                    articles.forEach((article) => {
                        const articleView = new Article();
                        articleView.render(article)
                        articleView.subscribe(articleEventBus);
                        this.view.mainContentElement!.appendChild(articleView.root);
                    })
                }else{
                    const noResults = new NoResults();
                    noResults.render();
                    this.view.mainContentElement!.innerHTML = '';
                    this.view.mainContentElement!.appendChild(noResults.root);
                }
            }
        });

        Events.updateAuth();
    }

    /**
     * Подписка на связанные события
     */
    async subscribe(): Promise<void> {
        const navbarEventBus: NavbarEventBus = {
            goToRoot: URIChanger.rootPage,
            goToHotFeed: URIChanger.feedPage,
            //goToNewFeed: URIChanger.feedPage,
            //goToSubscribeFeed: URIChanger.feedPage,
            goToNewArticle: Events.newArticlePageListener,
            openAdvSearch: Events.openAdvSearchListener,
            search: Events.searchFormListener,
        }

        this.view.children.get('navbar')!.subscribe(navbarEventBus);
    }
}