import Category_feed_header_view from "./category_feed_header_view.js";
import Basic_component from "../_basic_component/basic_component.js";

/**
 * View_model-компонент соответсвующего View
 * @class Category_feed_header
 */
export default class Category_feed_header extends Basic_component {
    /**
     * Универсальный компонент заголовка
     */
    constructor() {
        super();
        this.view = new Category_feed_header_view();
    }
    /**
     * Перерисовка подконтрольного элемента
     * @return {HTMLElement}
     */
    render(category_data) {
        super.render();
        this.root = this.view.render(category_data);
        return this.root;
    }

    /**
     * Подписка на связанные события
     */
    subscribe() {

    }
    //TODO:subscribe()
};