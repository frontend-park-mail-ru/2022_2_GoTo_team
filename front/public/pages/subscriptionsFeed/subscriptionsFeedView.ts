import PageView from "../_basic/pageView.js";
import Navbar from "../../components/navbar/navbar.js";

/**
 * Страница содержит главный компонент - ленту новостей, хедер, сайдбар.
 * @class SubscriptionsFeedView
 */
export default class SubscriptionsFeedView extends PageView {
    mainContentElement: HTMLElement | undefined;

    constructor(root: HTMLElement) {
        super(root);
    }

    async render() {
        await super.render();
        const navbar = new Navbar();
        await navbar.render();
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
        this.children.set('navbar', navbar);
    }
}