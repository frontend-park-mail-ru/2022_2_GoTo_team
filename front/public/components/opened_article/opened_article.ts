import OpenedArticleView from "./opened_article_view.js";
import BasicComponent from "../_basic_component/basic_component.js";
import {FullArticleData} from "../../common/types";

export type OpenedArticleEventBus = {
    goToCategoryFeed: (category: string) => void,
    goToAuthorFeed: (author: string) => void,
    openTagPage: (tag: string) => void,
}
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

    async subscribe(eventBus: OpenedArticleEventBus) {
        await super.subscribe();
        const avatar = this.root.querySelector('.article__profile_picture')!;

        if (this.view.category !== ""){
            const categoryLink = this.root.querySelector('.article__category')!;

            categoryLink.addEventListener('click', () => {
                eventBus.goToCategoryFeed(this.view.category!);
            });
            avatar.addEventListener('click', () => {
                eventBus.goToCategoryFeed(this.view.category!);
            });
        }else{
            avatar.addEventListener('click', () => {
                eventBus.goToCategoryFeed(this.view.category!);
            });
        }

        const authorLink = this.root.querySelector('.article__author')!;
        authorLink.addEventListener('click', () => {
            eventBus.goToAuthorFeed(this.view.publisher!);
        })

        this.root.querySelectorAll('.article__tag').forEach((tagDiv) => {
            tagDiv.addEventListener('click', () => {
                eventBus.openTagPage(tagDiv.innerHTML);
            })
        })
    }
};