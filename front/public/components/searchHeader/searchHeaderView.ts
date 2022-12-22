import BasicComponentView from "../_basicComponent/basicComponentView.js";
import "../tmpl/searchHeader.tmpl.js";
import {SearchData, SearchHeaderData} from "../../common/types";

/**
 * @class SearchHeaderView
 */
export default class SearchHeaderView extends BasicComponentView {

    render(searchData: SearchHeaderData): HTMLElement {
        const wrapper = document.createElement('div');
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates['searchHeader.html']({
            request: searchData.searchData.request,
            author: searchData.searchData.author,
            allTags: searchData.tagList,
            tags: searchData.searchData.tags === undefined ? null : searchData.searchData.tags,
        });
        const tagSelect = wrapper.querySelector('.select_menu')! as HTMLSelectElement;
        if (searchData.searchData.tags !== undefined){
            tagSelect.value = searchData.searchData.tags[0];
        }
        return wrapper.querySelector('div')!;
    }
}
