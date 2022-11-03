import Article_view from "./article_view";
import Basic_component from "../_basic_component/basic_component";

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
     * @property {string} title
     * @property {string} description
     * @property {string[]} tags
     * @property {string} category
     * @property {int} rating
     * @property {int} comments
     * @property {string[]} authors
     * @return {HTMLElement}
     */
    render(article) {
        super.render();
        this.root = this.view.render(article);
        return this.root;
    }
    //TODO:destroy()
};