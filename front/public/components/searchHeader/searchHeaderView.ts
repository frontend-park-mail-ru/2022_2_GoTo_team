import BasicComponentView from "../_basicComponent/basicComponentView.js";
import "../tmpl/searchHeader.tmpl.js";
import {SearchData} from "../../common/types";

/**
 * @class SearchHeaderView
 */
export default class SearchHeaderView extends BasicComponentView {

    render(searchData: SearchData): HTMLElement {
        const wrapper = document.createElement('div');
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates['searchHeader.html']({
            request: searchData.request,
        });
        return wrapper.querySelector('div')!;
    }
}
