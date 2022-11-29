import BasicComponentView from "../_basicComponent/basic_component_view.js";
import "../tmpl/searchForm.tmpl.js";

/**
 * @class SearchFormView
 */
export default class SearchFormView extends BasicComponentView {

    async render(): Promise<HTMLElement> {
        const wrapper = document.createElement('div');

        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates['searchForm.html']({});

        return wrapper.querySelector('div')!;
    }
}