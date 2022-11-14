import {Events} from "../../modules/events.js";
import Page from "../_basic/page.js";
import UserFeedView from "./user_feed_view.js";
import UserFeedHeader from "../../components/user_feed_header/user_feed_header.js";
import {Requests} from "../../modules/requests.js";
import Article from "../../components/article/article.js";

/**
 * ModalView-контроллер для соответсвующих страниц
 * @class  UserFeed
 */
export default class UserFeed extends Page {
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
    // @ts-expect-error TS(2416): Property 'render' in type 'UserFeed' is not assign... Remove this comment to see the full error message
    render(login: any) {
        this.view.render();
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
                    articleView.render(article);
                    articleView.subscribe();
                    this.view.mainContentElement.appendChild(articleView.root);
                })
            }
        });

        Events.updateAuth();
    }

    /**
     * Подписка на связанные события
     */
    subscribe() {
        this.view.children.get('navbar').subscribe();
    }
}