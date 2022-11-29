import BasicComponentView from "../_basicComponent/basic_component_view.js";
import "../tmpl/profileMenu.tmpl.js";

/**
 * @class UserPlugMenuView
 */
export default class UserPlugMenuView extends BasicComponentView {

    async render(): Promise<HTMLElement> {
        await super.render();
        const wrapper = document.createElement('div');
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates["profileMenu.html"]({});
        return wrapper.querySelector('div')!;
    }
}