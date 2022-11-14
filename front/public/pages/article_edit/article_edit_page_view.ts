import PageView from "../_basic/page_view.js";
import Navbar from "../../components/navbar/navbar.js";
import ArticleEdit from "../../components/article_edit/article_edit.js";

/**
 * Страница содержит главный компонент - ленту новостей, хедер, сайдбар.
 * @class ArticleEditPageView
 */
export default class ArticleEditPageView extends PageView {
    /**
     * @param {HTMLElement} root
     */
    constructor(root) {
        super(root);
    }

    /**
     * Перерисовать главную страницу
     */
    async render(articleData) {
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
        this.main_content_element = mainContentElement;
        this.root.appendChild(this.main_content_element);

        const editView = new ArticleEdit();
        await editView.render(articleData);
        this.children.set('edit', editView);
        mainContentElement.appendChild(editView.root);

        this.root.appendChild(document.createElement('div'));
    }
}