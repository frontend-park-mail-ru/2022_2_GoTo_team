import OpenedArticleView from "./openedArticleView.js";
import BasicComponent from "../_basicComponent/basicComponent.js";
import {FullArticleData} from "../../common/types";

export type OpenedArticleEventBus = {
    goToCategoryFeed: (category: string) => void,
    goToAuthorFeed: (author: string) => void,
    openTagPage: (tag: string) => void,
}

/**
 * ViewModel-компонент соответсвующего View
 * @class OpenedArticle
 */
export default class OpenedArticle extends BasicComponent {
    view: OpenedArticleView;

    constructor() {
        super();
        this.view = new OpenedArticleView();
    }

    render(article: FullArticleData): HTMLElement {
        super.render();
        this.root = this.view.render(article);
        return this.root;
    }

    subscribe(eventBus: OpenedArticleEventBus) {
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