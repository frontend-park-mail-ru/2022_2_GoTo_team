import CategoryFeedHeaderView from "./categoryFeedHeaderView.js";
import BasicComponent from "../_basicComponent/basicComponent.js";
import {CategoryData, Subscription} from "../../common/types";
import "../tmpl/unsubscribeButton.tmpl.js";
export type CategoryFeedHeaderEventBus = {
    subscribe: (category: string) => Promise<boolean>,
    unsubscribe: (category: string) => Promise<boolean>,
}

/**
 * ViewModel-компонент соответсвующего View
 * @class Category_feed_header
 */
export default class CategoryFeedHeader extends BasicComponent {
    view: CategoryFeedHeaderView;

    constructor() {
        super();
        this.view = new CategoryFeedHeaderView();
    }

    render(categoryData: CategoryData): HTMLElement {
        this.root = this.view.render(categoryData);
        return this.root;
    }

    subscribe(eventBus:CategoryFeedHeaderEventBus) {
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
                eventBus.subscribe(this.view.category!).then((result) => {
                    if (result){
                        this._unsubscribeEvent(subscribeSubscription);
                        this._subscribeEvent(unsubscribeSubscription);
                        this._subscribeEvent(subscribedHoverSubscription);
                        this._subscribeEvent(subscribedUnhoverSubscription);
                        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
                        subButton.innerHTML = Handlebars.templates['unsubscribeButton.html']({});
                    }
                });
            },
        }

        const unsubscribeSubscription = {
            element: subButton,
            event: 'click',
            listener: () => {
                eventBus.unsubscribe(this.view.category!).then((result) => {
                    if (result){
                        this._unsubscribeEvent(unsubscribeSubscription);
                        this._unsubscribeEvent(subscribedHoverSubscription);
                        this._unsubscribeEvent(subscribedUnhoverSubscription)
                        this._subscribeEvent(subscribeSubscription);
                        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
                        subButton.innerHTML = Handlebars.templates['subscribeButton.html']({});
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
