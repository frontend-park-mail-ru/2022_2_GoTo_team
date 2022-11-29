import BasicComponentView from "../_basicComponent/basic_component_view.js";
import "../tmpl/profile_menu.tmpl.js";

/**
 * @class UserPlugMenuView
 */
export default class UserPlugMenuView extends BasicComponentView {
    /**
     * @return {HTMLElement}
     */
    async render(): Promise<HTMLElement> {
        await super.render();
        const wrapper = document.createElement('div');
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates["profile_menu.html"]({});
        return wrapper.querySelector('div')!;
    }
}