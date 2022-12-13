import ArticleView from "./articleView.js";
import BasicComponent from "../_basicComponent/basicComponent.js";
import {IncompleteArticleData, Subscription} from "../../common/types";

export type ArticleComponentEventBus = {
    goToCategoryFeed: (category: string) => void,
    goToAuthorFeed: (login: string) => void,
    openArticle: (id: number, comments: boolean) => void,
    openTagPage: (tag: string) => void,
    editArticle: (id: number) => void,
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

    subscribe(eventBus: ArticleComponentEventBus): void {
        let subscription: Subscription;
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
                eventBus.openArticle(this.view.id!, false);
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

        const comments: HTMLElement = this.root.querySelector('.article__comments_count')!;
        subscription = {
            element: comments,
            event: 'click',
            listener: () => {
                eventBus.openArticle(this.view.id!, true);
            },
        }
        this._subscribeEvent(subscription);

        this.root.querySelectorAll('.article__edit_button').forEach((edit) => {
            subscription = {
                element: edit,
                event: 'click',
                listener: () => {
                    eventBus.editArticle(this.view.id!);
                },
            }
            this._subscribeEvent(subscription);
        });
    }
};
