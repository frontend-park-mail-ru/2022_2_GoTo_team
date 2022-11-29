import CategoryFeedHeaderView from "./categoryFeedHeaderView.js";
import BasicComponent from "../_basicComponent/basic_component.js";
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

    async render(categoryData: CategoryData): Promise<HTMLElement> {
        await super.render();
        this.root = await this.view.render(categoryData);
        return this.root;
    }

    async subscribe(eventBus:CategoryFeedHeaderEventBus) {
    }
};