import PageView from "../_basic/page_view.js";
import Navbar from "../../components/navbar/navbar.js";
import OpenedArticle from "../../components/opened_article/opened_article.js";

/**
 * Страница содержит главный компонент - ленту новостей, хедер, сайдбар.
 * @class ArticlePageView
 */
export default class ArticlePageView extends PageView {
    /**
     * @param {HTMLElement} root
     */
    constructor(root) {
        super(root);
    }

    /**
     * Перерисовать главную страницу
     */
    render(articleData) {
        super.render();
        const navbar = new Navbar();
        navbar.render();
        this.children.set('navbar', navbar);
        this.root.appendChild(navbar.root);

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
        articleView.render(articleData);
        this.children.set('article', articleView);
        mainContentElement.appendChild(articleView.root);

        this.root.appendChild(document.createElement('div'));
    }
}