import BasicComponentView from "../_basic_component/basic_component_view.js";
import "../tmpl/login_form.tmpl.js";

/**
 * @class LoginFormView
 */
export default class LoginFormView extends BasicComponentView {
    /**
     * @return {HTMLElement}
     */
    render() {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = Handlebars.templates["login_form.html"]({});
        return wrapper.firstChild;
    }
}