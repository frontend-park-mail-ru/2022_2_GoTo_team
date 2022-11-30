import PageView from "../_basic/pageView.js";
import Navbar from "../../components/navbar/navbar.js";
import {SearchData} from "../../common/types";
import SearchHeader from "../../components/searchHeader/searchHeader.js";

/**
 * Страница содержит главный компонент - ленту новостей, хедер, сайдбар.
 * @class SearchTagPageView
 */
export default class SearchTagPageView extends PageView {
    center: HTMLElement | undefined;
    mainContentElement:  HTMLElement | undefined;

    constructor(root: HTMLElement) {
        super(root);
    }

    /**
     * Перерисовать главную страницу
     */
    async render(data: SearchData) {
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

        const center = document.createElement('div');
        center.classList.add('column');
        this.center = center;
        this.root.appendChild(center);

        const mainContentElement = document.createElement('div');
        mainContentElement.classList.add('feed');
        this.mainContentElement = mainContentElement;
        center.appendChild(this.mainContentElement);

        const header = new SearchHeader();
        await header.render(data)
        center.insertBefore(header.root, center.children[0]);
        this.children.set('header', header);
    }
}