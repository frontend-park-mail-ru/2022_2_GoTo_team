import "../tmpl/noResults.tmpl.js";
import BasicComponentView from "../_basicComponent/basicComponentView.js";

/**
 * @class NoResultsView
 */
export default class NoResultsView extends BasicComponentView {

    render(): HTMLElement {
        const wrapper = document.createElement('div');
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates['noResults.html']({});

        return wrapper.querySelector('div')!;
    }
}
