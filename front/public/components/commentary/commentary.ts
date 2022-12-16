import BasicComponent from "../_basicComponent/basicComponent.js";
import {CommentaryData, Subscription} from "../../common/types";
import CommentaryView from "./commentaryView.js";

export type CommentaryComponentEventBus = {
    goToAuthorFeed: (login: string) => void,
    showAnswerForm: (comment: Commentary) => void,
}

/**
 * ViewModel-компонент соответсвующего View
 * @class Commentary
 */
export default class Commentary extends BasicComponent {
    view: CommentaryView;
    data: CommentaryData | undefined;
    level: number;

    constructor() {
        super();
        this.view = new CommentaryView();
        this.level = 0;
    }

    render(commentary: CommentaryData): HTMLElement {
        this.data = commentary;
        this.root = this.view.render(commentary);
        return this.root;
    }

    subscribe(eventBus: CommentaryComponentEventBus) {
        let subscription: Subscription;
        const avatar: HTMLElement = this.root.querySelector('.commentary__profile_picture')!;

        subscription = {
            element: avatar,
            event: 'click',
            listener: () => {
                eventBus.goToAuthorFeed(this.view.publisher!);
            },
        }
        this._subscribeEvent(subscription);

        const authorLink: HTMLElement = this.root.querySelector('.commentary__author')!;
        subscription = {
            element: authorLink,
            event: 'click',
            listener: () => {
                eventBus.goToAuthorFeed(this.view.publisher!);
            },
        }
        this._subscribeEvent(subscription);

        const answerButton: HTMLElement = this.root.querySelector('.commentary__answer_button')!;
        subscription = {
            element: answerButton,
            event: 'click',
            listener: () => {
                eventBus.showAnswerForm(this);
            },
        }
        this._subscribeEvent(subscription);

        this.root.querySelectorAll('.rating').forEach((rating) => {
            subscription = {
                element: rating,
                event: 'DOMSubtreeModified',
                listener: () => {
                    const value = parseInt(rating.innerHTML);
                    rating.setAttribute('data-sign', value > 0 ? '1' :(value < 0 ? '-1' : '0'));
                }
            }
            this._subscribeEvent(subscription);
        });
    }
};
