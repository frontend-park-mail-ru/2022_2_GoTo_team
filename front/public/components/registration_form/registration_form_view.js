import BasicComponentView from "../_basic_component/basic_component_view.js";
import "../tmpl/registration_form.tmpl.js";

/**
 * @class RegistrationFormView
 */
export default class RegistrationFormView extends BasicComponentView {
    /**
     * @return {HTMLElement}
     */
    render() {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = Handlebars.templates["registration_form.html"]({});
        return wrapper.firstChild;
    }
}