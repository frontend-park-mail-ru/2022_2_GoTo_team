import BasicComponentView from "../_basic_component/basic_component_view.js";
import "../tmpl/opened_article.tmpl.js";
/**
 * @class OpenedArticleView
 */

const covers = [
    "static/img/article_cover_1.jpg",
    "static/img/article_cover_2.jpg",
    "static/img/article_cover_3.jpg",
]
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
     * @property {string} article.coverImgPath
     * @property {Object} article.publisher
     * @property {string} article.publisher.username
     * @property {string} article.publisher.login
     * @property {Object} article.coAuthor
     * @property {string} article.coAuthor.username
     * @property {string} article.coAuthor.login
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
            picture: article.coverImgPath !== '' && typeof article.coverImgPath !== 'undefined' ? article.coverImgPath : covers[Math.floor(Math.random() * covers.length)],
        });
        this.publisher = article.publisher.login;
        this.category = article.category;
        return wrapper.firstChild;
    }
}