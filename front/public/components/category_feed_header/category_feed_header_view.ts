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
    // @ts-expect-error TS(2416): Property 'render' in type 'CategoryFeedHeaderView'... Remove this comment to see the full error message
    render(categoryData: any) {
        const wrapper = document.createElement('div');
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates['category_page_header.html'](categoryData);
        return wrapper.firstChild;
    }
}