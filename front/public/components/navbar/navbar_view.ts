import BasicComponentView from "../_basicComponent/basicComponentView";
import "../tmpl/navbar.tmpl.js";

/**
 * @class NavbarView
 */
export default class NavbarView extends BasicComponentView {
    /**
     * @return {HTMLElement}
     */
    render(eventBus?: object): HTMLElement {
        const wrapper = document.createElement('div');
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates['navbar.html']({});
        return wrapper.querySelector('div')!;
    }
}