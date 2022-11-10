import BasicComponentView from "../_basic_component/basic_component_view.js";
import "../tmpl/opened_article.tmpl.js";
/**
 * @class OpenedArticleView
 */
export default class OpenedArticleView extends BasicComponentView {
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
     * @property {string} article.content
     * @return {HTMLElement}
     */
    render(article) {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = Handlebars.templates['opened_article.html']({
            title: article.title,
            description: article.description,
            tags: article.tags,
            category: article.category,
            rating: article.rating,
            comments: article.comments,
            publisher: article.publisher.username !== "" ? article.publisher.username : article.publisher.login,
            content: article.content,
        });
        this.publisher = article.publisher.login;
        this.category = article.category;
        return wrapper.firstChild;
    }
}