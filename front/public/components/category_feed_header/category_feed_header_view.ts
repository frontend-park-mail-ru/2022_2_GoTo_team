import BasicComponentView from "../_basicComponent/basicComponentView";
import "../tmpl/category_page_header.tmpl.js";
import {CategoryData} from "../../common/types";

/**
 * @class CategoryFeedHeaderView
 */
export default class CategoryFeedHeaderView extends BasicComponentView {

    /**
     * @param {Object} categoryData
     * @return {HTMLElement}
     */
    render(categoryData: CategoryData): HTMLElement {
        const wrapper = document.createElement('div');
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates['category_page_header.html']({
            name: categoryData.name,
            description: categoryData.description,
            subscribers: categoryData.subscribers,
        });
        return wrapper.querySelector('div')!;
    }
}