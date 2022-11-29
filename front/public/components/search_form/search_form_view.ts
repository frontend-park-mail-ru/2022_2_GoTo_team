import BasicComponentView from "../_basicComponent/basicComponentView";
import "../tmpl/search_form.tmpl.js";

/**
 * @class SearchFormView
 */
export default class SearchFormView extends BasicComponentView {

    /**
     * Перерисовка подконтрольного элемента
     * @return {HTMLElement}
     */
    render(): HTMLElement {
        const wrapper = document.createElement('div');

        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates['search_form.html']({});

        return wrapper.querySelector('div')!;
    }
}