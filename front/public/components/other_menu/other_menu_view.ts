import BasicComponentView from "../_basicComponent/basicComponentView";
import "../tmpl/other_menu.tmpl.js";

/**
 * @class OtherMenuView
 */
export default class OtherMenuView extends BasicComponentView {
    /**
     * @return {HTMLElement}
     */
    render(): HTMLElement {
        super.render();
        const wrapper = document.createElement('div');
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates["other_menu.html"]({});
        return wrapper.querySelector('div')!;
    }
}