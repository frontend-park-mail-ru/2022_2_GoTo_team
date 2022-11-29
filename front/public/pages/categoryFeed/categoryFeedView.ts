import PageView from "../_basic/pageView.js";
import Navbar from "../../components/navbar/navbar.js";
import CategoryRulesSidebar from "../../components/categoryRulesSidebar/categoryRulesSidebar.js";
import {RulesData} from "../../common/types";

/**
 * Страница содержит главный компонент - ленту новостей, хедер, сайдбар.
 * @class CategoryFeedView
 */
export default class CategoryFeedView extends PageView {
    center: HTMLElement | undefined;
    mainContentElement: HTMLElement | undefined;

    constructor(root: HTMLElement) {
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

        const rules = new CategoryRulesSidebar();
        const rulesData: RulesData = {
            content: "",
        }
        await rules.render(rulesData);
        this.children.set('rules', rules);
        content.appendChild(rules.root);
    }
}