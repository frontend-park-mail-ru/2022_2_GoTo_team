import UserFeedHeaderView from "./userFeedHeaderView.js";
import BasicComponent from "../_basicComponent/basicComponent.js";
import {Subscription, UserHeaderData} from "../../common/types";

export type UserFeedHeaderEventBus = {
    subscribe: (login: string) => Promise<boolean>,
    unsubscribe: (login: string) => Promise<boolean>,
}

/**
 * ViewModel-компонент соответсвующего View
 * @class UserFeedHeader
 */
export default class UserFeedHeader extends BasicComponent {
    view: UserFeedHeaderView;

    constructor() {
        super();
        this.view = new UserFeedHeaderView();
    }

    render(userData: UserHeaderData): HTMLElement {
        this.root = this.view.render(userData);
        return this.root;
    }

    subscribe(eventBus: UserFeedHeaderEventBus) {
        let subscription: Subscription;
        const subButton = this.root.querySelector('.feed_page__header__subscribe_button')!;
        const subscribedHoverSubscription = {
            element: subButton,
            event: 'mouseenter',
            listener: () => {
                // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
                subButton.innerHTML = Handlebars.templates['unsubscribeButton.html']({});
            },
        }


        const subscribedUnhoverSubscription = {
            element: subButton,
            event: 'mouseleave',
            listener: () => {
                // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
                subButton.innerHTML = Handlebars.templates['subscribedButton.html']({});
            },
        }
        const subscribeSubscription = {
            element: subButton,
            event: 'click',
            listener: () => {
                eventBus.subscribe(this.view.login!).then((result) => {
                    if (result){
                        this._unsubscribeEvent(subscribeSubscription);
                        this._subscribeEvent(unsubscribeSubscription);
                    }
                });
            },
        }

        const unsubscribeSubscription = {
            element: subButton,
            event: 'click',
            listener: () => {
                eventBus.unsubscribe(this.view.login!).then((result) => {
                    if (result){
                        this._unsubscribeEvent(unsubscribeSubscription);
                        this._subscribeEvent(subscribeSubscription);
                    }
                });
            },
        }

        if (this.view.subscribed){
            this._subscribeEvent(subscribedHoverSubscription);
            this._subscribeEvent(subscribedUnhoverSubscription);
            this._subscribeEvent(unsubscribeSubscription);
        }else{
            this._subscribeEvent(subscribeSubscription);
        }
    }
};
