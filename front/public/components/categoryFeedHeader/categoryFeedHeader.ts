import CategoryFeedHeaderView from "./categoryFeedHeaderView.js";
import BasicComponent from "../_basicComponent/basicComponent.js";
import {CategoryData} from "../../common/types";

export type CategoryFeedHeaderEventBus = {

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

    async subscribe(eventBus:CategoryFeedHeaderEventBus) {
    }
};