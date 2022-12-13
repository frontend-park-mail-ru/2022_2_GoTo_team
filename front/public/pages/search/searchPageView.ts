import PageView from "../_basic/pageView.js";
import Navbar from "../../components/navbar/navbar.js";
import {SearchHeaderData} from "../../common/types";
import SearchHeader from "../../components/searchHeader/searchHeader.js";

/**
 * Страница содержит главный компонент - ленту новостей, хедер, сайдбар.
 * @class SearchPageView
 */
export default class SearchPageView extends PageView {
    center: HTMLElement | undefined;
    mainContentElement: HTMLElement | undefined;

    constructor(root: HTMLElement) {
        super(root);
    }

    /**
     * Перерисовать главную страницу
     */
    async render(data: SearchHeaderData) {
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

        const content = document.createElement('div');
        content.classList.add('center_with_bigger_sidebar');
        center.appendChild(content);

        const mainContentElement = document.createElement('div');
        mainContentElement.classList.add('feed');
        this.mainContentElement = mainContentElement;
        content.appendChild(this.mainContentElement);

        const header = new SearchHeader();
        await header.render(data)
        center.insertBefore(header.root, center.children[0]);
        this.children.set('header', header);
    }
}