import BasicComponentView from "../_basic_component/basic_component_view.js";
import "../tmpl/profile_menu.tmpl.js";

/**
 * @class UserPlugMenuView
 */
export default class UserPlugMenuView extends BasicComponentView {
    /**
     * @return {HTMLElement}
     */
    // @ts-expect-error TS(2416): Property 'render' in type 'UserPlugMenuView' is no... Remove this comment to see the full error message
    render() {
        const wrapper = document.createElement('div');
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates["profile_menu.html"]({});
        return wrapper.firstChild;
    }
}