import ArticleView from "./articleView.js";
import BasicComponent from "../_basicComponent/basicComponent.js";
import {IncompleteArticleData, Subscription} from "../../common/types";

export type ArticleComponentEventBus = {
    goToCategoryFeed: (category: string) => void,
    goToAuthorFeed: (login: string) => void,
    openArticle: (id: number) => void,
    openTagPage: (tag: string) => void,
}

/**
 * ViewModel-компонент соответсвующего View
 * @class Article
 */
export default class Article extends BasicComponent {
    view: ArticleView;

    constructor() {
        super();
        this.view = new ArticleView();
    }

    render(article: IncompleteArticleData): HTMLElement {
        this.root =this.view.render(article);
        return this.root;
    }

    async subscribe(eventBus: ArticleComponentEventBus): Promise<void> {
        let subscription: Subscription;
        await super.subscribe();
        const avatar: HTMLElement = this.root.querySelector('.article__profile_picture')!;

        if (this.view.category !== "") {
            const categoryLink: HTMLElement = this.root.querySelector('.article__category')!;

            subscription = {
                element: categoryLink,
                event: 'click',
                listener: () => {
                    eventBus.goToCategoryFeed(this.view.category!);
                },
            }
            this._subscribeEvent(subscription);

            subscription = {
                element: avatar,
                event: 'click',
                listener: () => {
                    eventBus.goToCategoryFeed(this.view.category!);
                },
            }
            this._subscribeEvent(subscription);
        } else {
            subscription = {
                element: avatar,
                event: 'click',
                listener: () => {
                    eventBus.goToAuthorFeed(this.view.publisher!);
                },
            }
            this._subscribeEvent(subscription);
        }

        const authorLink: HTMLElement = this.root.querySelector('.article__author')!;
        subscription = {
            element: authorLink,
            event: 'click',
            listener: () => {
                eventBus.goToAuthorFeed(this.view.publisher!);
            },
        }
        this._subscribeEvent(subscription);

        const titleLink: HTMLElement = this.root.querySelector('.article__title')!;
        subscription = {
            element: titleLink,
            event: 'click',
            listener: () => {
                eventBus.openArticle(this.view.id!);
            },
        }
        this._subscribeEvent(subscription);

        this.root.querySelectorAll('.article__tag').forEach((tagDiv) => {
            subscription = {
                element: tagDiv,
                event: 'click',
                listener: () => {
                    eventBus.openTagPage(tagDiv.innerHTML);
                },
            }
            this._subscribeEvent(subscription);
        })
    }
};
