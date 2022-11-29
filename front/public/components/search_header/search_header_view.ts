import BasicComponentView from "../_basicComponent/basicComponentView";
import "../tmpl/search_header.tmpl.js";
import {SearchData} from "../../common/types";

/**
 * @class SearchHeaderView
 */
export default class SearchHeaderView extends BasicComponentView {

    /**
     * @param {SearchData} searchData
     * @return {HTMLElement}
     */
    render(searchData: SearchData): HTMLElement {
        const wrapper = document.createElement('div');
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates['search_header.html']({
            request: searchData.request,
        });
        return wrapper.querySelector('div')!;
    }
}