import {Events} from "../../modules/events.js";
import Page from "../_basic/page.js";
import CategoryFeedView from "./category_feed_view.js";
import {Requests} from "../../modules/requests.js";
import Article, {ArticleComponentEventBus} from "../../components/article/article.js";
import CategoryFeedHeader, {
    CategoryFeedHeaderEventBus
} from "../../components/category_feed_header/category_feed_header.js";
import {PageLoaders} from "../../modules/page_loaders.js";

/**
 * ModalView-контроллер для соответсвующих страниц
 * @class  CategoryFeed
 */
export default class CategoryFeed extends Page {
    view: CategoryFeedView;

    /**
     * Страница содержит главный компонент
     * @param {HTMLElement} root
     */
    constructor(root: any) {
        super(root);
        this.view = new CategoryFeedView(root);
    }

    /**
     * Отобразить подконтрольную страницу.
     * Должен быть вызван render() для обновления.
     */
    async render(category: string): Promise<void> {
        await this.view.render();

        Requests.categoryHeaderInfo(category).then((categoryData) => {
            const eventBus: CategoryFeedHeaderEventBus = {

            };

            const header = new CategoryFeedHeader();
            header.render(categoryData).then(() => {
                header.subscribe(eventBus);
                this.view.center.insertBefore(header.root, this.view.center.children[0]);
            });
        });

        Requests.getCategoryArticles(category).then((articles) => {
            const articleEventBus : ArticleComponentEventBus = {
                goToAuthorFeed: Events.goToAuthorFeed,
                goToCategoryFeed: Events.goToCategoryFeed,
                openArticle: PageLoaders.articlePage,
            }

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
    async subscribe(): Promise<void> {
        this.view.children.get('navbar').subscribe();
    }
}