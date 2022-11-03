import Basic_component_view from "../_basic_component/basic_component_view";
import "../tmpl/article.tmpl";
/**
 * @class Article_view
 */
export default class Article_view extends Basic_component_view {
    /**
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
        const wrapper = document.createElement('div');
        wrapper.innerHTML = Handlebars.templates['article.html']({
            title: article.title,
            description: article.description,
            tags: article.tags,
            category: article.category,
            rating: article.rating,
            comments: article.comments,
            author: article.authors[0]
        });
        return wrapper.firstChild;
    }
}