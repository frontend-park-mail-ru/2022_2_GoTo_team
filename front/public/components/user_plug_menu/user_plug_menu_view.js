import Basic_component_view from "../_basic_component/basic_component_view.js";
import "../tmpl/profile_menu.tmpl";

/**
 * @class User_plug_menu_view
 */
export default class User_plug_menu_view extends Basic_component_view {
    /**
     * @return {HTMLElement}
     */
    render() {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = Handlebars.templates["profile_menu.html"]({});
        return wrapper.firstChild;
    }
}