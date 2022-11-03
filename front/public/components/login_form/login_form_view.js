import Basic_component_view from "../_basic_component/basic_component_view";
import "../tmpl/login_form.tmpl";

/**
 * @class Login_form_view
 */
export default class Login_form_view extends Basic_component_view {
    /**
     * @return {HTMLElement}
     */
    render() {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = Handlebars.templates["login_form.html"]({});
        return wrapper.firstChild;
    }
}