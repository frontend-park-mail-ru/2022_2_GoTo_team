import OpenedArticleView from "./opened_article_view.js";
import BasicComponent from "../_basic_component/basic_component.js";
import {Events} from "../../modules/events.js";

/**
 * View_model-компонент соответсвующего View
 * @class OpenedArticle
 */
export default class OpenedArticle extends BasicComponent {
    /**
     * Универсальный компонент заголовка
     */
    constructor() {
        super();
        this.view = new OpenedArticleView();
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
     * @property {Object} article.coАuthor
     * @property {string} article.coАuthor.username
     * @property {string} article.coАuthor.login
     * @return {HTMLElement}
     */
    render(article) {
        super.render();
        this.root = this.view.render(article);
        return this.root;
    }

    subscribe() {
        super.subscribe();
        const authorLink = this.root.getElementsByClassName('article__author')[0];
        authorLink.addEventListener('click', () => {
            Events.goToAuthorFeed(this.view.publisher);
        })

        if (this.view.category !== ""){
            const categoryLink = this.root.getElementsByClassName('article__category')[0];
            categoryLink.addEventListener('click', () => {
                Events.goToCategoryFeed(this.view.category);
            })
        }
    }
};