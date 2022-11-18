import CategoryFeedHeaderView from "./category_feed_header_view.js";
import BasicComponent from "../_basic_component/basic_component.js";
import {CategoryData} from "../../common/types";

export type CategoryFeedHeaderEventBus = {

}

/**
 * View_model-компонент соответсвующего View
 * @class Category_feed_header
 */
export default class CategoryFeedHeader extends BasicComponent {
    view: CategoryFeedHeaderView;
    /**
     * Универсальный компонент заголовка
     */
    constructor() {
        super();
        this.view = new CategoryFeedHeaderView();
    }

    /**
     * Перерисовка подконтрольного элемента
     * @return {HTMLElement}
     */
    async render(categoryData: CategoryData): Promise<HTMLElement> {
        await super.render();
        this.root = await this.view.render(categoryData);
        return this.root;
    }

    /**
     * Подписка на связанные события
     */
    async subscribe(eventBus:CategoryFeedHeaderEventBus) {
    }
};