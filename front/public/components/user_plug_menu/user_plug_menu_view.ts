import BasicComponentView from "../_basicComponent/basicComponentView";
import "../tmpl/profile_menu.tmpl.js";

/**
 * @class UserPlugMenuView
 */
export default class UserPlugMenuView extends BasicComponentView {
    /**
     * @return {HTMLElement}
     */
    render(): HTMLElement {
        super.render();
        const wrapper = document.createElement('div');
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates["profile_menu.html"]({});
        return wrapper.querySelector('div')!;
    }
}