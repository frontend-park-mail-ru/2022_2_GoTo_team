import ArticleEditView from "./article_edit_view.js";
import BasicComponent from "../_basic_component/basic_component.js";
import {Events} from "../../modules/events.js";
import {Requests} from "../../modules/requests.js";

/**
 * View_model-компонент соответсвующего View
 * @class ArticleEdit
 */
export default class ArticleEdit extends BasicComponent {
    /**
     * Универсальный компонент заголовка
     */
    constructor() {
        super();
        this.view = new ArticleEditView();
    }

    /**
     * Перерисовка подконтрольного элемента
     * @param {Object?} article
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
     * @return {HTMLElement}
     */
    async render(article) {
        super.render();
        const categories = await Requests.getCategories();
        this.root = this.view.render(article, categories);
        return this.root;
    }

    subscribe() {
        super.subscribe();
        const submitButton = this.root.getElementsByClassName('article_edit__save_button')[0];

        if (this.view.update) {
            submitButton.addEventListener('click', () => {
                Events.articleUpdateListener(this.view.id);
            });

            const deleteButton = this.root.getElementsByClassName('article_edit__delete_button')[0];
            deleteButton.addEventListener('click', () => {
                Events.articleRemove(this.view.id);
            });
        } else {
            submitButton.addEventListener('click', Events.articleCreateListener);
        }
    }
};