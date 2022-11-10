import BasicComponentView from "../_basic_component/basic_component_view.js";
import "../tmpl/category_page_header.tmpl.js";

/**
 * @class CategoryFeedHeaderView
 */
export default class CategoryFeedHeaderView extends BasicComponentView {
    /**
     * @param {Object} categoryData
     * @return {HTMLElement}
     */
    render(categoryData) {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = Handlebars.templates['category_page_header.html'](categoryData);
        return wrapper.firstChild;
    }
}