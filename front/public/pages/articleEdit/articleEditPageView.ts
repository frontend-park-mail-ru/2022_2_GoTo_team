import PageView from "../_basic/pageView.js";
import Navbar from "../../components/navbar/navbar.js";
import ArticleEdit from "../../components/articleEdit/articleEdit.js";
import {FullArticleData} from "../../common/types";

/**
 * Страница содержит главный компонент - ленту новостей, хедер, сайдбар.
 * @class ArticleEditPageView
 */
export default class ArticleEditPageView extends PageView {
    main_content_element: HTMLElement | undefined;

    /**
     * @param {HTMLElement} root
     */
    constructor(root: HTMLElement) {
        super(root);
    }

    /**
     * Перерисовать главную страницу
     */
    async render(articleData: FullArticleData) {
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
        this.main_content_element = mainContentElement;
        this.root.appendChild(this.main_content_element);

        const editView = new ArticleEdit();
        await editView.render(articleData);
        mainContentElement.appendChild(editView.root);
        this.root.appendChild(document.createElement('div'));


        this.children.set('edit', editView);
        this.children.set('navbar', navbar);
    }
}