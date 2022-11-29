import {Events} from "../../modules/events.js";
import Page from "../_basic/page.js";
import UserFeedView from "./userFeedView.js";
import UserFeedHeader, {UserFeedHeaderEventBus} from "../../components/userFeedHeader/userFeedHeader.js";
import {Requests} from "../../modules/requests.js";
import Article, {ArticleComponentEventBus} from "../../components/article/article.js";
import {NavbarEventBus} from "../../components/navbar/navbar";
import {URIChanger} from "../../modules/uriChanger.js";

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
    async render(login: string) {
        await this.view.render();

        Requests.userHeaderInfo(login).then((userData) => {
            const eventBus: UserFeedHeaderEventBus = {
            };

            const header = new UserFeedHeader();
            header.render(userData);
            header.subscribe(eventBus);
            this.view.center!.insertBefore(header.root, this.view.center!.children[0]);
        });

        Requests.getUserArticles(login).then((articles) => {
            const articleEventBus : ArticleComponentEventBus = {
                goToAuthorFeed: Events.goToAuthorFeed,
                goToCategoryFeed: Events.goToCategoryFeed,
                openArticle: URIChanger.articlePage,
                openTagPage: URIChanger.searchByTagPage,
            }

            if (articles && Array.isArray(articles)) {
                this.view.mainContentElement!.innerHTML = '';
                articles.forEach((article) => {
                    const articleView = new Article();
                    articleView.render(article).then(()=>{
                        articleView.subscribe(articleEventBus);
                        this.view.mainContentElement!.appendChild(articleView.root);
                    });
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