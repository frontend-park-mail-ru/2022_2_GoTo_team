import ArticleView from "./article_view.js";
import BasicComponent from "../_basic_component/basic_component.js";
import {Events} from "../../modules/events.js";
import {IncompleteArticleData} from "../../common/types";

/**
 * View_model-компонент соответсвующего View
 * @class Article
 */
export default class Article extends BasicComponent {
    view: ArticleView;
    /**
     * Универсальный компонент заголовка
     */
    constructor() {
        super();
        this.view = new ArticleView();
    }

    /**
     * Перерисовка подконтрольного элемента
     * @param {IncompleteArticleData} article
     * @return {HTMLElement}
     */
    async render(article: IncompleteArticleData): Promise<HTMLElement> {
        await super.render();
        this.root = await this.view.render(article);
        return this.root;
    }

    async subscribe() {
        await super.subscribe();
        const avatar: HTMLElement = this.root.querySelector('.article__profile_picture')!;

        if (this.view.category !== "") {
            const categoryLink: HTMLElement = this.root.querySelector('.article__category')!;

            categoryLink.addEventListener('click', () => {
                Events.goToCategoryFeed(this.view.category);
            });
            avatar.addEventListener('click', () => {
                Events.goToCategoryFeed(this.view.category);
            });
        } else {
            avatar.addEventListener('click', () => {
                Events.goToAuthorFeed(this.view.publisher);
            });
        }

        const author_link: HTMLElement = this.root.querySelector('.article__author')!;
        author_link.addEventListener('click', () => {
            Events.goToAuthorFeed(this.view.publisher);
        });

        const titleLink: HTMLElement = this.root.querySelector('.article__title')!;
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