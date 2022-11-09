import BasicComponentView from "../_basic_component/basic_component_view.js";
import "../tmpl/profile_menu.tmpl.js";

/**
 * @class UserPlugMenuView
 */
export default class UserPlugMenuView extends BasicComponentView {
    /**
     * @return {HTMLElement}
     */
    render() {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = Handlebars.templates["profile_menu.html"]({});
        return wrapper.firstChild;
    }
}