import BasicComponentView from "../_basic_component/basic_component_view.js";
import "../tmpl/article_edit.tmpl.js";

/**
 * @class ArticleEditView
 */
export default class ArticleEditView extends BasicComponentView {
    id: any;
    update: any;
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
     * @property {string} article.coverImgPath
     * @property {Object} article.publisher
     * @property {string} article.publisher.username
     * @property {string} article.publisher.login
     * @property {Object} article.coAuthor
     * @property {string} article.coAuthor.username
     * @property {string} article.coAuthor.login
     * @property {string} article.content
     * @param {string[]} categories
     * @return {HTMLElement}
     */
    // @ts-expect-error TS(2416): Property 'render' in type 'ArticleEditView' is not... Remove this comment to see the full error message
    render(article: any, categories: any) {
        const wrapper = document.createElement('div');
        if (typeof article !== 'undefined') {
            // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
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
            // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
            wrapper.innerHTML = Handlebars.templates['article_edit.html']({
                update: false,
                categories: categories,
            });
            this.update = false;
        }
        return wrapper.firstChild;
    }
}