import Page_view from "../_basic/page_view.js";
import Navbar from "../../components/navbar/navbar.js";
import Article_edit from "../../components/article_edit/article_edit.js";

/**
 * Страница содержит главный компонент - ленту новостей, хедер, сайдбар.
 * @class Article_edit_page_view
 */
export default class Article_edit_page_view extends Page_view {
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

        const edit_view = new Article_edit();
        edit_view.render(article_data);
        this.children.set('edit', edit_view);
        main_content_element.appendChild(edit_view.root);

        this.root.appendChild(document.createElement('div'));
    }
}