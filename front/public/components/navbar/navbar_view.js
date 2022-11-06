import Basic_component_view from "../_basic_component/basic_component_view.js";
import "../tmpl/navbar.tmpl.js";

/**
 * @class Navbar_view
 */
export default class Navbar_view extends Basic_component_view {
    /**
     * @return {HTMLElement}
     */
    render() {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = Handlebars.templates['navbar.html']({});
        return wrapper.firstChild;
    }
}