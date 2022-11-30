import BasicComponentView from "../_basicComponent/basicComponentView.js";
import "../tmpl/searchForm.tmpl.js";

/**
 * @class SearchFormView
 */
export default class SearchFormView extends BasicComponentView {

    render(): HTMLElement {
        const wrapper = document.createElement('div');

        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates['searchForm.html']({});

        return wrapper.querySelector('div')!;
    }
}
