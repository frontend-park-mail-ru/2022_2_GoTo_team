import {Events} from "../../modules/events.js";
import Page from "../_basic/page.js";
import UserFeedView from "./userFeedView.js";
import UserFeedHeader, {UserFeedHeaderEventBus} from "../../components/userFeedHeader/userFeedHeader.js";
import {Requests} from "../../modules/requests.js";
import Article, {ArticleComponentEventBus} from "../../components/article/article.js";
import {NavbarEventBus} from "../../components/navbar/navbar";
import {URIChanger} from "../../modules/uriChanger.js";
import {UserHeaderData} from "../../common/types";
import NoResults from "../../components/noResults/noResults";

/**
 * ModalView-контроллер для соответсвующих страниц
 * @class  UserFeed
 */
export default class UserFeed extends Page {
    view: UserFeedView;

    /**
     * Страница содержит главный компонент
     * @param {HTMLElement} root
     */
    constructor(root: HTMLElement) {
        super(root);
        this.view = new UserFeedView(root);
    }

    /**
     * Отобразить подконтрольную страницу.
     * Должен быть вызван render() для обновления.
     */
    async render(userData: UserHeaderData) {
        Events.scrollUp();
        await this.view.render();

        const eventBus: UserFeedHeaderEventBus = {
            subscribe: Events.userSubscribeListener,
            unsubscribe: Events.userUnsubscribeListener,
        };

        const header = new UserFeedHeader();
        header.render(userData);
        header.subscribe(eventBus);
        this.view.center!.insertBefore(header.root, this.view.center!.children[0]);

        Requests.getUserArticles(userData.login).then((articles) => {
            const articleEventBus: ArticleComponentEventBus = {
                goToAuthorFeed: Events.goToAuthorFeed,
                goToCategoryFeed: Events.goToCategoryFeed,
                openArticle: URIChanger.articlePage,
                openTagPage: URIChanger.searchByTagPage,
                editArticle: Events.editArticleListener,
                shareListener: Events.openShareBox,
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