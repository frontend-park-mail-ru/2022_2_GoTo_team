import BasicComponent from "../_basicComponent/basicComponent.js";
import {CommentaryData, LikeData, LikeResponse, Subscription} from "../../common/types";
import CommentaryView from "./commentaryView.js";

export type CommentaryComponentEventBus = {
    goToAuthorFeed: (login: string) => void,
    showAnswerForm: (comment: Commentary) => void,
    likeListener: (data: LikeData) => Promise<LikeResponse>,
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

        const rating = this.root.querySelector('.rating')!;
        subscription = {
            element: rating,
            event: 'DOMSubtreeModified',
            listener: () => {
                const value = parseInt(rating.innerHTML);
                rating.setAttribute('data-sign', value > 0 ? '1' : (value < 0 ? '-1' : '0'));
            }
        }
        this._subscribeEvent(subscription);


        const dislikeButton = this.root.querySelector('.dislike')!;
        const likeButton = this.root.querySelector('.like')!;
        subscription = {
            element: dislikeButton,
            event: 'click',
            listener: async () => {
                const rating = this.root.querySelector('.rating')!;
                let likeData: LikeData;
                if (dislikeButton.getAttribute('data-pressed') === 'true') {
                    likeData = {
                        id: this.data!.id!,
                        sign: 0,
                    }
                } else {
                    likeData = {
                        id: this.data!.id!,
                        sign: -1,
                    }
                    const preLikeData: LikeData = {
                        id: this.data!.id!,
                        sign: 0,
                    }
                    await eventBus.likeListener(preLikeData);
                }
                eventBus.likeListener(likeData).then((response) => {
                    if (response.success) {
                        rating.innerHTML = response.rating.toString();

                        if (likeData.sign === -1) {
                            dislikeButton.setAttribute('data-pressed', 'true');
                        } else {
                            dislikeButton.setAttribute('data-pressed', 'false');
                        }

                        likeButton.setAttribute('data-pressed', 'false');
                    }
                })
            }
        }
        this._subscribeEvent(subscription);

        subscription = {
            element: likeButton,
            event: 'click',
            listener: async () => {
                const rating = this.root.querySelector('.rating')!;
                let likeData: LikeData;
                if (likeButton.getAttribute('data-pressed') === 'true') {
                    likeData = {
                        id: this.data!.id!,
                        sign: 0,
                    }
                } else {
                    likeData = {
                        id: this.data!.id!,
                        sign: 1,
                    }
                    const preLikeData: LikeData = {
                        id: this.data!.id!,
                        sign: 0,
                    }
                    await eventBus.likeListener(preLikeData);
                }
                eventBus.likeListener(likeData).then((response) => {
                    if (response.success) {
                        rating.innerHTML = response.rating.toString();

                        if (likeData.sign === 1) {
                            likeButton.setAttribute('data-pressed', 'true');
                        } else {
                            likeButton.setAttribute('data-pressed', 'false');
                        }

                        dislikeButton.setAttribute('data-pressed', 'false');
                    }
                })
            }
        }
        this._subscribeEvent(subscription);
    }
};
