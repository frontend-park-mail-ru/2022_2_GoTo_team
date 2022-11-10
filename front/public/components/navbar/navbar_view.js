import BasicComponentView from "../_basic_component/basic_component_view.js";
import "../tmpl/navbar.tmpl.js";

/**
 * @class NavbarView
 */
export default class NavbarView extends BasicComponentView {
    /**
     * @return {HTMLElement}
     */
    render() {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = Handlebars.templates['navbar.html']({});
        return wrapper.firstChild;
    }
}