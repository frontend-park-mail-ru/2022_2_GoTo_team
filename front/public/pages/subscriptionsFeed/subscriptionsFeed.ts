import SubscriptionsFeedView from "./subscriptionsFeedView";
import {Requests} from "../../modules/requests.js"
import Article, {ArticleComponentEventBus} from "../../components/article/article.js";
import {Events} from "../../modules/events.js";
import Page from "../_basic/page.js";
import {NavbarEventBus} from "../../components/navbar/navbar";
import {URIChanger} from "../../modules/uriChanger.js";
import NoResults from "../../components/noResults/noResults";

/**
 * ModalView-контроллер для соответсвующих страниц
 * @class SubscriptionsFeed
 */
export default class SubscriptionsFeed extends Page{
    view: SubscriptionsFeedView;

    constructor(root: HTMLElement) {
        super(root);
        this.view = new SubscriptionsFeedView(root);
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
            likeListener: Events.articleLikeListener,
            openLogin: Events.makeLoginOverlayListener,
        }
        await this.view.render();
        if (window.sessionStorage.getItem('login') === null){
            this.view.mainContentElement!.innerHTML = '';
            Events.openAlertMessage('Вы не авторизованы', 'На главную', URIChanger.rootPage);
        } else{
            Requests.getSubscriptionFeed().then((articles) => {
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
            });
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
            goToNewArticle: Events.newArticlePageListener,
            openAdvSearch: Events.openAdvSearchListener,
            search: Events.searchFormListener,
        }

        this.view.children.get('navbar')!.subscribe(navbarEventBus);
    }
}