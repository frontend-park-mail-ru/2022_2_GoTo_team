import BasicComponentView from "../_basicComponent/basic_component_view.js";
import "../tmpl/search_form.tmpl.js";

/**
 * @class SearchFormView
 */
export default class SearchFormView extends BasicComponentView {

    /**
     * Перерисовка подконтрольного элемента
     * @return {HTMLElement}
     */
    async render(): Promise<HTMLElement> {
        const wrapper = document.createElement('div');

        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates['search_form.html']({});

        return wrapper.querySelector('div')!;
    }
}