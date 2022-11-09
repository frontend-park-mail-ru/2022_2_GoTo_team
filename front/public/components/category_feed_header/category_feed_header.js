import CategoryFeedHeaderView from "./category_feed_header_view.js";
import BasicComponent from "../_basic_component/basic_component.js";

/**
 * View_model-компонент соответсвующего View
 * @class Category_feed_header
 */
export default class CategoryFeedHeader extends BasicComponent {
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
    render(categoryData) {
        super.render();
        this.root = this.view.render(categoryData);
        return this.root;
    }

    /**
     * Подписка на связанные события
     */
    subscribe() {

    }
    //TODO:subscribe()
};