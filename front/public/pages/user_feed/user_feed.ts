import {Events} from "../../modules/events.js";
import Page from "../_basic/page.js";
import UserFeedView from "./user_feed_view.js";
import UserFeedHeader from "../../components/user_feed_header/user_feed_header.js";
import {Requests} from "../../modules/requests.js";
import Article, {ArticleComponentEventBus} from "../../components/article/article.js";
import {PageLoaders} from "../../modules/page_loaders.js";

/**
 * ModalView-контроллер для соответсвующих страниц
 * @class  UserFeed
 */
export default class UserFeed extends Page {
    // @ts-ignore
    view: UserFeedView;
    /**
     * Страница содержит главный компонент
     * @param {HTMLElement} root
     */
    constructor(root: any) {
        super(root);
        this.view = new UserFeedView(root);
    }

    /**
     * Отобразить подконтрольную страницу.
     * Должен быть вызван render() для обновления.
     */
    // @ts-ignore
    render(login: any) {
        this.view.render();
        const articleEventBus : ArticleComponentEventBus = {
            goToAuthorFeed: Events.goToAuthorFeed,
            goToCategoryFeed: Events.goToCategoryFeed,
            openArticle: PageLoaders.articlePage,
        }

        Requests.userHeaderInfo(login).then((userData) => {
            const header = new UserFeedHeader();
            header.render(userData);
            header.subscribe();
            this.view.center.insertBefore(header.root, this.view.center.children[0]);
        });

        Requests.getUserArticles(login).then((articles) => {
            if (articles && Array.isArray(articles)) {
                this.view.mainContentElement.innerHTML = '';
                articles.forEach((article) => {
                    const articleView = new Article();
                    articleView.render(article).then(()=>{
                        articleView.subscribe(articleEventBus);
                        this.view.mainContentElement.appendChild(articleView.root);
                    });
                })
            }
        });

        Events.updateAuth();
    }

    /**
     * Подписка на связанные события
     */
    // @ts-ignore
    subscribe() {
        this.view.children.get('navbar').subscribe();
    }
}