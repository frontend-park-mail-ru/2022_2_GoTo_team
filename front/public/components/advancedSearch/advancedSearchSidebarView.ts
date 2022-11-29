import "../tmpl/advancedSearchSidebar.tmpl.js";
import BasicComponentView from "../_basicComponent/basicComponentView.js";
import {AdvSearchData} from "../../common/types";

export type AdvSearchFormData = {
    tagList: string[],
    advSearchData?: AdvSearchData,
}

/**
 * @class ArticleView
 */
export default class AdvancedSearchSidebarView extends BasicComponentView {

    /**
     * Перерисовка подконтрольного элемента
     */
    render(data: AdvSearchFormData): HTMLElement {
        const wrapper = document.createElement('div');
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates['advancedSearchSidebar.html']({
            author: data.advSearchData?.author,
            allTags: data.tagList,
            tags: data.advSearchData?.tags === undefined ? null : data.advSearchData.tags,
        });

        return wrapper.querySelector('div')!;
    }
}
