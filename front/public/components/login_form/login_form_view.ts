import BasicComponentView from "../_basic_component/basic_component_view.js";
import "../tmpl/login_form.tmpl.js";

/**
 * @class LoginFormView
 */
export default class LoginFormView extends BasicComponentView {
    /**
     * @return {HTMLElement}
     */
    // @ts-expect-error TS(2416): Property 'render' in type 'LoginFormView' is not a... Remove this comment to see the full error message
    render() {
        const wrapper = document.createElement('div');
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates["login_form.html"]({});
        return wrapper.firstChild;
    }
}