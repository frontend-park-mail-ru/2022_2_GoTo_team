import PageView from "../_basic/page_view.js";
import Navbar from "../../components/navbar/navbar.js";

/**
 * Страница содержит главный компонент - ленту новостей, хедер, сайдбар.
 * @class UserFeedView
 */
export default class UserFeedView extends PageView {
    center: HTMLElement | undefined;
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
        await super.render();

        const navbar = new Navbar();
        await navbar.render();
        this.root.appendChild(navbar.root);
        this.children.set('navbar', navbar);

        const rootEl = document.createElement('div');
        rootEl.id = 'root';
        rootEl.classList.add('root');
        this.root.appendChild(rootEl);
        this.root = rootEl;

        this.root.appendChild(document.createElement('div'));

        const center = document.createElement('div');
        center.classList.add('column');
        this.center = center;
        this.root.appendChild(center);

        const content = document.createElement('div');
        content.classList.add('center_with_sidebar');
        center.appendChild(content);

        const mainContentElement = document.createElement('div');
        mainContentElement.classList.add('feed');
        this.mainContentElement = mainContentElement;
        content.appendChild(this.mainContentElement);

        this.root.appendChild(document.createElement('div'));
    }
}