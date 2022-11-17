import PageView from "../_basic/page_view.js";
import Navbar from "../../components/navbar/navbar.js";
import LoginForm from "../../components/login_form/login_form.js";

/**
 * Страница содержит главный компонент - ленту новостей, хедер, сайдбар.
 * @class LoginPageView
 */
export default class LoginPageView extends PageView {
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
    // @ts-ignore
    render() {
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

        this.root.appendChild(document.createElement('div'));

        const login_form = new LoginForm();
        login_form.render();
        this.mainContentElement.appendChild(login_form.root);
        this.children.set('form', login_form);
    }
}