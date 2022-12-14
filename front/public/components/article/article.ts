import ArticleView from "./articleView.js";
import BasicComponent from "../_basicComponent/basicComponent.js";
import {IncompleteArticleData, LikeData, LikeResponse, SharingData, Subscription} from "../../common/types";
import {APIStrings, categoryCoverFolder, Url} from "../../common/consts";
import {Requests} from "../../modules/requests";
import {response} from "express";

export type ArticleComponentEventBus = {
    goToCategoryFeed: (category: string) => void,
    goToAuthorFeed: (login: string) => void,
    openArticle: (id: number, comments: boolean) => void,
    openTagPage: (tag: string) => void,
    editArticle: (id: number) => void,
    shareListener: (data: SharingData) => void,
    likeListener: (data: LikeData) => Promise<LikeResponse>,
    openLogin: () => void;
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
        this.root = this.view.render(article);
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

            const authorLink: HTMLElement = this.root.querySelector('.article__author')!;
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
            const authorLink: HTMLElement = this.root.querySelector('.article__category')!;
            subscription = {
                element: authorLink,
                event: 'click',
                listener: () => {
                    eventBus.goToAuthorFeed(this.view.publisher!);
                },
            }
            this._subscribeEvent(subscription);
        }


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

        this.root.querySelectorAll('.article__share_button').forEach((shareButton) => {
            subscription = {
                element: shareButton,
                event: 'click',
                listener: () => {
                    const data: SharingData = {
                        url: APIStrings.articlePage(this.view.id!, false),
                        type: "article",
                        title: this.view.data?.title,
                        image: this.view.data?.avatarImgPath ? Url + this.view.data?.avatarImgPath : this.view.data?.avatarImgPath,
                    }
                    eventBus.shareListener(data);
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
                listener: async () => {
                    const rating = this.root.querySelectorAll('.rating')!;
                    if (button.getAttribute('data-pressed') === 'true') {
                        return
                    }
                    const likeData: LikeData = {
                        id: this.view.id!,
                        sign: -1,
                    }
                    const preLikeData: LikeData = {
                        id: this.view.id!,
                        sign: 0,
                    }
                    await eventBus.likeListener(preLikeData);

                    eventBus.likeListener(likeData).then((response) => {
                        if (response.status === 200) {
                            rating.forEach((element) => {
                                element.innerHTML = response.rating.toString();
                            });
                            this.root.querySelectorAll('.dislike').forEach((button) => {
                                if (likeData.sign === -1) {
                                    button.setAttribute('data-pressed', 'true');
                                } else {
                                    button.setAttribute('data-pressed', 'false');
                                }
                            });
                            this.root.querySelectorAll('.like').forEach((button) => {
                                button.setAttribute('data-pressed', 'false');
                            });
                        } else if (response.status === 401) {
                            eventBus.openLogin();
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
                listener: async () => {
                    const rating = this.root.querySelectorAll('.rating')!;
                    if (button.getAttribute('data-pressed') === 'true') {
                        return;
                    }
                    const likeData: LikeData = {
                        id: this.view.id!,
                        sign: 1,
                    }
                    const preLikeData: LikeData = {
                        id: this.view.id!,
                        sign: 0,
                    }
                    await eventBus.likeListener(preLikeData);

                    eventBus.likeListener(likeData).then((response) => {
                        if (response.status === 200) {
                            rating.forEach((element) => {
                                element.innerHTML = response.rating.toString();
                            });
                            this.root.querySelectorAll('.like').forEach((button) => {
                                if (likeData.sign === 1) {
                                    button.setAttribute('data-pressed', 'true');
                                } else {
                                    button.setAttribute('data-pressed', 'false');
                                }
                            });
                            this.root.querySelectorAll('.dislike').forEach((button) => {
                                button.setAttribute('data-pressed', 'false');
                            });
                        }else if (response.status === 401){
                            eventBus.openLogin();
                        }
                    })
                }
            }
            this._subscribeEvent(subscription);
        });
    }
}
