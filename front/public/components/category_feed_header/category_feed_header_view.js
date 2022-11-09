import Basic_component_view from "../_basic_component/basic_component_view.js";
import "../tmpl/category_page_header.tmpl.js";

/**
 * @class Category_feed_header_view
 */
export default class Category_feed_header_view extends Basic_component_view {
    /**
     * @param {Object} category_data
     * @return {HTMLElement}
     */
    render(category_data) {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = Handlebars.templates['category_page_header.html'](category_data);
        return wrapper.firstChild;
    }
}