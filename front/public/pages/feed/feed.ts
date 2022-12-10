import FeedView from "./feedView.js";
import {Requests} from "../../modules/requests.js"
import Article, {ArticleComponentEventBus} from "../../components/article/article.js";
import {Events} from "../../modules/events.js";
import Page from "../_basic/page.js";
import {NavbarEventBus} from "../../components/navbar/navbar";
import {URIChanger} from "../../modules/uriChanger.js";

/**
 * ModalView-контроллер для соответсвующих страниц
 * @class Feed
 */
export default class Feed extends Page{
    view: FeedView;

    constructor(root: HTMLElement) {
        super(root);
        this.view = new FeedView(root);
    }

    /**
     * Отобразить подконтрольную страницу.
     */
    async render() {
        Events.scrollUp();
        const articleEventBus : ArticleComponentEventBus = {
            goToAuthorFeed: Events.goToAuthorFeed,
            goToCategoryFeed: Events.goToCategoryFeed,
            openArticle: URIChanger.articlePage,
            openTagPage: URIChanger.searchByTagPage,
        }
        await this.view.render();
        Requests.getArticles().then((articles) => {
            if (articles && Array.isArray(articles)) {
                this.view.mainContentElement!.innerHTML = '';
                articles.forEach((article) => {
                    const articleView = new Article();
                    articleView.render(article)
                    this.view.mainContentElement!.appendChild(articleView.root);
                    articleView.subscribe(articleEventBus);
                })
            }
        });
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
    }
}