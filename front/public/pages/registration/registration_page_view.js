import Page_view from "../_basic/page_view.js";
import Navbar from "../../components/navbar/navbar.js";
import Registration_form from "../../components/registration_form/registration_form.js";

/**
 * Страница содержит главный компонент - ленту новостей, хедер, сайдбар.
 * @class Registration_page_view
 */
export default class Registration_page_view extends Page_view {
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
        root_el.id = "root";
        this.root.appendChild(root_el);
        this.root = root_el;

        const main_content_element = document.createElement('div');
        main_content_element.classList.add('feed');
        this.main_content_element = main_content_element;
        this.root.appendChild(this.main_content_element);
        const registration_form = new Registration_form()
        registration_form.render();
        this.main_content_element.appendChild(registration_form.root);
        this.children.set('form', registration_form);
    }
}