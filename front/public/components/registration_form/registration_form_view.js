import Basic_component_view from "../_basic_component/basic_component_view";
import "../tmpl/registration_form.tmpl";

/**
 * @class Registration_form_view
 */
export default class Registration_form_view extends Basic_component_view {
    /**
     * @return {HTMLElement}
     */
    render() {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = Handlebars.templates["registration_form.html"]({});
        return wrapper.firstChild;
    }
}