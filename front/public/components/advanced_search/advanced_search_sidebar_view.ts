import "../tmpl/advanced_search_sidebar.tmpl.js";
import BasicComponentView from "../_basic_component/basic_component_view.js";
import {AdvSearchData} from "../../common/types";

/**
 * @class ArticleView
 */
export default class CategoryRulesSidebarView extends BasicComponentView {

    /**
     * Перерисовка подконтрольного элемента
     * @param {AdvSearchData?} data
     * @return {HTMLElement}
     */
    async render(data?: AdvSearchData): Promise<HTMLElement> {
        const wrapper = document.createElement('div');
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates['advanced_search_sidebar.html']({
            author: data?.author,
            tags: data?.tags,
        });

        return wrapper.querySelector('div')!;
    }
}