import Article_view from "./article_view.js";
import Basic_component from "../_basic_component/basic_component.js";

/**
 * View_model-компонент соответсвующего View
 * @class Article
 */
export default class Article extends Basic_component {
    /**
     * Универсальный компонент заголовка
     */
    constructor() {
        super();
        this.view = new Article_view();
    }

    /**
     * Перерисовка подконтрольного элемента
     * @param {Object} article
     * @property {string} article.title
     * @property {string} article.description
     * @property {string[]} article.tags
     * @property {string} article.category
     * @property {int} article.rating
     * @property {int} article.comments
     * @property {string} article.cover_img_path
     * @property {Object} article.publisher
     * @property {string} article.publisher.username
     * @property {string} article.publisher.login
     * @property {Object} article.co_author
     * @property {string} article.co_author.username
     * @property {string} article.co_author.login
     * @return {HTMLElement}
     */
    render(article) {
        super.render();
        this.root = this.view.render(article);
        return this.root;
    }
    //TODO:destroy()
};