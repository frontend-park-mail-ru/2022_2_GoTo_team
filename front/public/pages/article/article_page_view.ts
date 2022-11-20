import PageView from "../_basic/page_view.js";
import Navbar, {NavbarEventBus} from "../../components/navbar/navbar.js";
import OpenedArticle from "../../components/opened_article/opened_article.js";
import {FullArticleData} from "../../common/types";
import {PageLoaders} from "../../modules/page_loaders.js";
import {Events} from "../../modules/events.js";

/**
 * Страница содержит главный компонент - ленту новостей, хедер, сайдбар.
 * @class ArticlePageView
 */
export default class ArticlePageView extends PageView {
    mainContentElement: any;

    /**
     * @param {HTMLElement} root
     */
    constructor(root: any) {
        super(root);
    }

    /**
     * Перерисовать главную страницу
     */
    async render(articleData: FullArticleData) {
        await super.render();
        const navbar = new Navbar();
        await navbar.render().then(() => {
            const navbarEventBus: NavbarEventBus = {
                goToHotFeed: PageLoaders.feedPage,
                goToNewFeed: PageLoaders.feedPage,
                goToSubscribeFeed: PageLoaders.feedPage,
                //goToNewArticle: PageLoaders.editArticle,
                openOtherMenu: Events.showOtherMenuListener,
            }
            this.root.appendChild(navbar.root);
            navbar.subscribe(navbarEventBus);

            const rootEl = document.createElement('div');
            rootEl.id = 'root';
            rootEl.classList.add('root');
            this.root.appendChild(rootEl);
            this.root = rootEl;

            this.root.appendChild(document.createElement('div'));

            const mainContentElement = document.createElement('div');
            mainContentElement.classList.add('feed');
            this.mainContentElement = mainContentElement;
            this.root.appendChild(this.mainContentElement);

            const articleView = new OpenedArticle();
            articleView.render(articleData).then(() => {
                mainContentElement.appendChild(articleView.root);
            });


            this.root.appendChild(document.createElement('div'));
            this.children.set('article', articleView);
        });

        this.children.set('navbar', navbar);
    }
}