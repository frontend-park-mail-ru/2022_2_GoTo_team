import OpenedArticleView from "./openedArticleView.js";
import BasicComponent from "../_basicComponent/basicComponent.js";
import {FullArticleData, LikeData, LikeResponse, Subscription} from "../../common/types";
import {APIStrings} from "../../common/consts";

export type OpenedArticleEventBus = {
    goToCategoryFeed: (category: string) => void,
    goToAuthorFeed: (author: string) => void,
    openTagPage: (tag: string) => void,
    scrollToComments: () => void,
    editArticle: (id: number) => void,
    shareListener: (url: string) => void,
    likeListener: (data: LikeData) => Promise<LikeResponse>,
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
        let subscription: Subscription;
        const avatar = this.root.querySelector('.article__profile_picture')!;

        if (this.view.category !== "") {
            const categoryLink = this.root.querySelector('.article__category')!;
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

            const authorLink = this.root.querySelector('.article__author')!;
            subscription = {
                element: authorLink,
                event: 'click',
                listener: () => {
                    eventBus.goToAuthorFeed(this.view.publisher!);
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

            const authorLink = this.root.querySelector('.article__category')!;
            subscription = {
                element: authorLink,
                event: 'click',
                listener: () => {
                    eventBus.goToAuthorFeed(this.view.publisher!);
                },
            }
            this._subscribeEvent(subscription);
        }

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

        this.root.querySelectorAll('.article__comments_count').forEach((comments) => {
            subscription = {
                element: comments,
                event: 'click',
                listener: eventBus.scrollToComments,
            }
            this._subscribeEvent(subscription);
        });

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

        this.root.querySelectorAll('.article__share_button').forEach((shareButton) => {
            subscription = {
                element: shareButton,
                event: 'click',
                listener: () => {
                    eventBus.shareListener(APIStrings.articlePage(this.view.id!, false));
                },
            }
            this._subscribeEvent(subscription);
        });

        this.root.querySelectorAll('.rating').forEach((rating) => {
            subscription = {
                element: rating,
                event: 'DOMSubtreeModified',
                listener: () => {
                    const value = parseInt(rating.innerHTML);
                    rating.setAttribute('data-sign', value > 0 ? '1' : (value < 0 ? '-1' : '0'));
                }
            }
            this._subscribeEvent(subscription);
        });

        this.root.querySelectorAll('.dislike').forEach((button) => {
            subscription = {
                element: button,
                event: 'click',
                listener: () => {
                    const rating = this.root.querySelectorAll('.rating')!;
                    let likeData: LikeData;
                    if (rating[0].getAttribute('data-sign') === '-1'){
                        likeData = {
                            id: this.view.id!,
                            sign: 0,
                        }
                    }else{
                        likeData= {
                            id: this.view.id!,
                            sign: -1,
                        }
                    }
                    eventBus.likeListener(likeData).then((response) => {
                        if (response.success){
                            rating.forEach((element) => {
                                element.innerHTML = response.rating.toString();
                            })
                        }
                    })
                }
            }
            this._subscribeEvent(subscription);
        });

        this.root.querySelectorAll('.like').forEach((button) => {
            subscription = {
                element: button,
                event: 'click',
                listener: () => {
                    const rating = this.root.querySelectorAll('.rating')!;
                    let likeData: LikeData;
                    if (rating[0].getAttribute('data-sign') === '-1'){
                        likeData = {
                            id: this.view.id!,
                            sign: 0,
                        }
                    }else{
                        likeData= {
                            id: this.view.id!,
                            sign: 1,
                        }
                    }
                    eventBus.likeListener(likeData).then((response) => {
                        if (response.success){
                            rating.forEach((element) => {
                                element.innerHTML = response.rating.toString();
                            })
                        }
                    })
                }
            }
            this._subscribeEvent(subscription);
        });
    }
};
