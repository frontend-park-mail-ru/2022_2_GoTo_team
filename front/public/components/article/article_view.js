import Basic_component_view from "../_basic_component/basic_component_view.js";
import "../tmpl/article.tmpl.js";
/**
 * @class Article_view
 */
export default class Article_view extends Basic_component_view {
    /**
     * Перерисовка подконтрольного элемента
     * @param {Object} article
     * @property {int} article.id
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
        const wrapper = document.createElement('div');
        wrapper.innerHTML = Handlebars.templates['article.html']({
            title: article.title,
            description: article.description,
            tags: article.tags,
            category: article.category,
            rating: article.rating,
            comments: article.comments,
            publisher: article.publisher.username !== "" ? article.publisher.username : article.publisher.login
        });
        this.publisher = article.publisher.login;
        this.category = article.category;
        this.id = article.id;
        return wrapper.firstChild;
    }
}