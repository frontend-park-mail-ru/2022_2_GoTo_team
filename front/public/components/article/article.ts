import ArticleView from "./article_view.js";
import BasicComponent from "../_basic_component/basic_component.js";
import {IncompleteArticleData} from "../../common/types";

export type ArticleComponentEventBus = {
    goToCategoryFeed: (category: string) => void,
    goToAuthorFeed: (login: string) => void,
    openArticle: (id: number) => void,
    openTagPage: (tag: string) => void,
}

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

    async subscribe(eventBus: ArticleComponentEventBus): Promise<void> {
        await super.subscribe();
        const avatar: HTMLElement = this.root.querySelector('.article__profile_picture')!;

        if (this.view.category !== "") {
            const categoryLink: HTMLElement = this.root.querySelector('.article__category')!;

            categoryLink.addEventListener('click', () => {
                eventBus.goToCategoryFeed(this.view.category!);
            });
            avatar.addEventListener('click', () => {
                eventBus.goToCategoryFeed(this.view.category!);
            });
        } else {
            avatar.addEventListener('click', () => {
                eventBus.goToAuthorFeed(this.view.publisher!);
            });
        }

        const author_link: HTMLElement = this.root.querySelector('.article__author')!;
        author_link.addEventListener('click', () => {
            eventBus.goToAuthorFeed(this.view.publisher!);
        });

        const titleLink: HTMLElement = this.root.querySelector('.article__title')!;
        titleLink.addEventListener('click', () => {
            eventBus.openArticle(this.view.id!);
        });

        this.root.querySelectorAll('.article__tag').forEach((tagDiv) => {
            tagDiv.addEventListener('click', () => {
                eventBus.openTagPage(tagDiv.innerHTML);
            })
        })
    }
};