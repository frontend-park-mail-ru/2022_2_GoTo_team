import BasicComponentView from "../_basicComponent/basicComponentView.js";
import "../tmpl/otherMenu.tmpl.js";

/**
 * @class OtherMenuView
 */
export default class OtherMenuView extends BasicComponentView {

    render(): HTMLElement {
        const wrapper = document.createElement('div');
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates["otherMenu.html"]({});
        return wrapper.querySelector('div')!;
    }
}