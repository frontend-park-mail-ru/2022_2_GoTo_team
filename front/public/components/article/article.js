import ArticleView from "./article_view.js";
import BasicComponent from "../_basic_component/basic_component.js";
import {Events} from "../../modules/events.js";
import {PageLoaders} from "../../modules/page_loaders.js";

/**
 * View_model-компонент соответсвующего View
 * @class Article
 */
export default class Article extends BasicComponent {
    /**
     * Универсальный компонент заголовка
     */
    constructor() {
        super();
        this.view = new ArticleView();
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

    subscribe() {
        super.subscribe();


        const avatar = this.root.querySelector('.article__profile_picture');

        if (this.view.category !== ""){
            const categoryLink = this.root.querySelector('.article__category');

            categoryLink.addEventListener('click', () => {
                Events.goToCategoryFeed(this.view.category);
            });
            avatar.addEventListener('click', () => {
                Events.goToCategoryFeed(this.view.category);
            });
        }else{
            avatar.addEventListener('click', () => {
                Events.goToAuthorFeed(this.view.publisher);
            });
        }

        const author_link = this.root.getElementsByClassName('article__author')[0];
        author_link.addEventListener('click', () => {
            Events.goToAuthorFeed(this.view.publisher);
        });

        const titleLink = this.root.getElementsByClassName('article__title')[0];
        titleLink.addEventListener('click', () => {
            Events.openArticle(this.view.id);
        });
        /*
        const deleteArticle = this.root.getElementsByClassName('login_form__cross')[0];
        deleteArticle.addEventListener('click', () => {
            Events.articleRemove(this.view.id);
            PageLoaders.feedPage();
        });
         */
    }
};