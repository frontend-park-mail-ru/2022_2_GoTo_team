import Page_view from "../_basic/page_view.js";
import Navbar from "../../components/navbar/navbar.js";

/**
 * Страница содержит главный компонент - ленту новостей, хедер, сайдбар.
 * @class User_feed_view
 */
export default class User_feed_view extends Page_view {
    /**
     * @param {HTMLElement} root
     */
    constructor(root) {
        super(root);
    }

    /**
     * Перерисовать главную страницу
     */
    render() {
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

        const center = document.createElement('div');
        center.classList.add('column');
        this.center = center;
        this.root.appendChild(center);

        const content = document.createElement('div');
        content.classList.add('center_with_sidebar');
        center.appendChild(content);

        const main_content_element = document.createElement('div');
        main_content_element.classList.add('feed');
        this.main_content_element = main_content_element;
        content.appendChild(this.main_content_element);

        this.root.appendChild(document.createElement('div'));
    }
}