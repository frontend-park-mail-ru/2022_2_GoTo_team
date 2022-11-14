import BasicComponentView from "../_basic_component/basic_component_view.js";
import "../tmpl/navbar.tmpl.js";

/**
 * @class NavbarView
 */
export default class NavbarView extends BasicComponentView {
    /**
     * @return {HTMLElement}
     */
    // @ts-expect-error TS(2416): Property 'render' in type 'NavbarView' is not assi... Remove this comment to see the full error message
    render() {
        const wrapper = document.createElement('div');
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates['navbar.html']({});
        return wrapper.firstChild;
    }
}