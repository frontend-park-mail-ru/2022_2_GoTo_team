import PageView from "../_basic/pageView.js";
import Navbar from "../../components/navbar/navbar.js";
import LoginForm from "../../components/loginForm/loginForm.js";

/**
 * Страница содержит главный компонент - ленту новостей, хедер, сайдбар.
 * @class LoginPageView
 */
export default class LoginPageView extends PageView {
    mainContentElement: HTMLElement | undefined;

    /**
     * @param {HTMLElement} root
     */
    constructor(root: any) {
        super(root);
    }

    /**
     * Перерисовать главную страницу
     */
    async render() {
        super.render();
        const navbar = new Navbar();
        await navbar.render();
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

        const loginForm = new LoginForm();
        loginForm.render();
        this.mainContentElement.appendChild(loginForm.root);
        this.children.set('form', loginForm);
    }
}