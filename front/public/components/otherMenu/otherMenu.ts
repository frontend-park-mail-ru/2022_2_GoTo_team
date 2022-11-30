import BasicComponent from "../_basicComponent/basicComponent.js";
import {Listener, Subscription} from "../../common/types";
import OtherMenuView from "./otherMenuView.js";

export type OtherMenuEventBus = {
    newArticle: Listener,
}

/**
 * ViewModel-компонент соответсвующего View
 * @class OtherMMenu
 */
export default class OtherMenu extends BasicComponent {
    view: OtherMenuView;

    constructor() {
        super();
        this.view = new OtherMenuView();
    }

    render(): HTMLElement {
        super.render();
        this.root = this.view.render();
        return this.root;
    }

    subscribe(eventBus: OtherMenuEventBus) {
        let subscription: Subscription;
        const newArticleButton = document.getElementById('other_menu__new_article_button')!;
        subscription = {
            element: newArticleButton,
            event: 'click',
            listener: () => {
                eventBus.newArticle();
            },
        }
        this._subscribeEvent(subscription);
    }
}
