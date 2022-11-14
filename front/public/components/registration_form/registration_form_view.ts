import BasicComponentView from "../_basic_component/basic_component_view.js";
import "../tmpl/registration_form.tmpl.js";

/**
 * @class RegistrationFormView
 */
export default class RegistrationFormView extends BasicComponentView {
    /**
     * @return {HTMLElement}
     */
    // @ts-expect-error TS(2416): Property 'render' in type 'RegistrationFormView' i... Remove this comment to see the full error message
    render() {
        const wrapper = document.createElement('div');
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates["registration_form.html"]({});
        return wrapper.firstChild;
    }
}