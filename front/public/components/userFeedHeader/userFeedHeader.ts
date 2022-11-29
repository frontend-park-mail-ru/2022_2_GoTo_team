import UserFeedHeaderView from "./userFeedHeaderView.js";
import BasicComponent from "../_basicComponent/basicComponent.js";
import {UserHeaderData} from "../../common/types";

export type UserFeedHeaderEventBus = {

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
    }
};
