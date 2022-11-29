import BasicComponentView from "../_basicComponent/basic_component_view.js";
import "../tmpl/categoryFeedHeader.tmpl.js";
import {CategoryData} from "../../common/types";

/**
 * @class CategoryFeedHeaderView
 */
export default class CategoryFeedHeaderView extends BasicComponentView {

    async render(categoryData: CategoryData): Promise<HTMLElement> {
        const wrapper = document.createElement('div');
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates['categoryFeedHeader.html']({
            name: categoryData.name,
            description: categoryData.description,
            subscribers: categoryData.subscribers,
        });
        return wrapper.querySelector('div')!;
    }
}