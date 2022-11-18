import OpenedArticleView from "./opened_article_view.js";
import BasicComponent from "../_basic_component/basic_component.js";
import {Events} from "../../modules/events.js";
import {FullArticleData} from "../../common/types";

/**
 * View_model-компонент соответсвующего View
 * @class OpenedArticle
 */
export default class OpenedArticle extends BasicComponent {
    view: OpenedArticleView;
    /**
     * Универсальный компонент заголовка
     */
    constructor() {
        super();
        this.view = new OpenedArticleView();
    }

    /**
     * Перерисовка подконтрольного элемента
     * @param {FullArticleData} article
     * @return {HTMLElement}
     */
    async render(article: FullArticleData) {
        await super.render();
        this.root = await this.view.render(article);
        return this.root;
    }

    // @ts-ignore
    subscribe() {
        super.subscribe();
        const avatar = this.root.querySelector('.article__profile_picture')!;

        if (this.view.category !== ""){
            const categoryLink = this.root.querySelector('.article__category')!;

            categoryLink.addEventListener('click', () => {
                Events.goToCategoryFeed(this.view.category!);
            });
            avatar.addEventListener('click', () => {
                Events.goToCategoryFeed(this.view.category!);
            });
        }else{
            avatar.addEventListener('click', () => {
                Events.goToCategoryFeed(this.view.category!);
            });
        }

        const authorLink = this.root.querySelector('.article__author')!;
        authorLink.addEventListener('click', () => {
            Events.goToAuthorFeed(this.view.publisher!);
        })
    }
};