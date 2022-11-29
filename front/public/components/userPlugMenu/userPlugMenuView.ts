import BasicComponentView from "../_basicComponent/basicComponentView.js";
import "../tmpl/profileMenu.tmpl.js";

/**
 * @class UserPlugMenuView
 */
export default class UserPlugMenuView extends BasicComponentView {

    render(): HTMLElement {
        const wrapper = document.createElement('div');
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates["profileMenu.html"]({});
        return wrapper.querySelector('div')!;
    }
}