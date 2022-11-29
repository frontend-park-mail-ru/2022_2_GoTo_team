import UserFeedHeaderView from "./userFeedHeaderView.js";
import BasicComponent from "../_basicComponent/basic_component.js";
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

    /**
     * Перерисовка подконтрольного элемента
     */
    async render(userData: UserHeaderData): Promise<HTMLElement> {
        await super.render();
        this.root = await this.view.render(userData);
        return this.root;
    }

    async subscribe(eventBus: UserFeedHeaderEventBus) {
    }
};