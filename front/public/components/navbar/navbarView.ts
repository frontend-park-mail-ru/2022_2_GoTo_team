import BasicComponentView from "../_basicComponent/basic_component_view.js";
import "../tmpl/navbar.tmpl.js";

/**
 * @class NavbarView
 */
export default class NavbarView extends BasicComponentView {

    async render(eventBus?: object) {
        const wrapper = document.createElement('div');
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates['navbar.html']({});
        return wrapper.querySelector('div')!;
    }
}