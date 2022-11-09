import Basic_component_view from "../_basic_component/basic_component_view.js";
import "../tmpl/article_edit.tmpl.js";

/**
 * @class Article_edit_view
 */
export default class Article_edit_view extends Basic_component_view {
    /**
     * Перерисовка подконтрольного элемента
     * @param {Object?} article
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
     * @property {string} article.content
     * @param {string[]} categories
     * @return {HTMLElement}
     */
    render(article, categories) {
        const wrapper = document.createElement('div');
        if (typeof article !== 'undefined') {
            wrapper.innerHTML = Handlebars.templates['article_edit.html']({
                title: article.title,
                description: article.description,
                //tags: article.tags,
                category: article.category,
                // publisher: article.publisher.username !== "" ? article.publisher.username : article.publisher.login,
                content: article.content,
                update: true,
                categories: categories,
            });
            this.id = article.id;
            this.update = true;
        }else{
            wrapper.innerHTML = Handlebars.templates['article_edit.html']({
                update: false,
                categories: categories,
            });
            this.update = false;
        }
        return wrapper.firstChild;
    }
}