import Page_view from "../_basic/page_view.js";
import Navbar from "../../components/navbar/navbar.js";
import User_plug from "../../components/user_plug/user_plug.js";

/**
 * Страница содержит главный компонент - ленту новостей, хедер, сайдбар.
 * @class Feed_view
 */
export default class Feed_view extends Page_view {
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
        this.root.appendChild(navbar.root);
        const root_el = document.createElement('div');
        root_el.id = "root";
        this.root.appendChild(root_el);
        this.root = root_el;
        const main_content_element = document.createElement('div');
        main_content_element.classList.add('feed');
        this.main_content_element = main_content_element;
        this.root.appendChild(this.main_content_element);
        const profile_button = document.getElementById("navbar__auth_button");
        const profile_button_view = new User_plug();
        profile_button_view.render();
        profile_button.appendChild(profile_button_view.root);
    }

    /**
     * Подписка на связанные события
     */
    subscribe() {
    }

}