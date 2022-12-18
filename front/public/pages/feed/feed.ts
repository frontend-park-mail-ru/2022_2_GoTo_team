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
            editArticle: Events.editArticleListener,
            shareListener: Events.openShareBox,
        }
        await this.view.render();
        Requests.getArticles().then((articles) => {
            console.log(articles);
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