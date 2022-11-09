import Page_view from "../_basic/page_view.js";
import Navbar from "../../components/navbar/navbar.js";
import Opened_article from "../../components/opened_article/opened_article.js";

/**
 * Страница содержит главный компонент - ленту новостей, хедер, сайдбар.
 * @class Article_page_view
 */
export default class Article_page_view extends Page_view {
    /**
     * @param {HTMLElement} root
     */
    constructor(root) {
        super(root);
    }

    /**
     * Перерисовать главную страницу
     */
    render(article_data) {
        super.render();
        const navbar = new Navbar();
        navbar.render();
        this.children.set('navbar', navbar);
        this.root.appendChild(navbar.root);

        const root_el = document.createElement('div');
        root_el.id = 'root';
        root_el.classList.add('root');
        this.root.appendChild(root_el);
        this.root = root_el;

        this.root.appendChild(document.createElement('div'));

        const main_content_element = document.createElement('div');
        main_content_element.classList.add('feed');
        this.main_content_element = main_content_element;
        this.root.appendChild(this.main_content_element);

        const article_view = new Opened_article();
        article_view.render(article_data);
        this.children.set('article', article_view);
        main_content_element.appendChild(article_view.root);

        this.root.appendChild(document.createElement('div'));
    }
}