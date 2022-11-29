import ArticleView from "./articleView";
import BasicComponent from "../_basicComponent/basicComponent.js";
import {IncompleteArticleData, Subscription} from "../../common/types";

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
        this.root = this.view.render(article);
        return this.root;
    }

    async subscribe(eventBus: ArticleComponentEventBus): Promise<void> {
        await super.subscribe();
        const avatar: HTMLElement = this.root.querySelector('.article__profile_picture')!;
        let newSubscription: Subscription;
        if (this.view.category !== "") {
            const categoryLink: HTMLElement = this.root.querySelector('.article__category')!;

            newSubscription = {
                element: categoryLink,
                event: 'click',
                listener: () => {
                    eventBus.goToCategoryFeed(this.view.category!);
                },
            }
            this._subscribeElement(newSubscription);

            newSubscription = {
                element: avatar,
                event: 'click',
                listener: () => {
                    eventBus.goToCategoryFeed(this.view.category!);
                },
            }
            this._subscribeElement(newSubscription);
        } else {
            newSubscription = {
                element: avatar,
                event: 'click',
                listener: () => {
                    eventBus.goToAuthorFeed(this.view.publisher!);
                },
            }
            this._subscribeElement(newSubscription);
        }

        const author_link: HTMLElement = this.root.querySelector('.article__author')!;
        newSubscription = {
            element: author_link,
            event: 'click',
            listener: () => {
                eventBus.goToAuthorFeed(this.view.publisher!);
            },
        }
        this._subscribeElement(newSubscription);

        const titleLink: HTMLElement = this.root.querySelector('.article__title')!;
        newSubscription = {
            element: titleLink,
            event: 'click',
            listener: () => {
                eventBus.openArticle(this.view.id!);
            },
        }
        this._subscribeElement(newSubscription);

        this.root.querySelectorAll('.article__tag').forEach((tagDiv) => {
            newSubscription = {
                element: tagDiv,
                event: 'click',
                listener: () => {
                    eventBus.openTagPage(tagDiv.innerHTML);
                },
            }
            this._subscribeElement(newSubscription);
        })
    }
};