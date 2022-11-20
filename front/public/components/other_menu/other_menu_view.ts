import BasicComponentView from "../_basic_component/basic_component_view.js";
import "../tmpl/other_menu.tmpl.js";

/**
 * @class OtherMenuView
 */
export default class OtherMenuView extends BasicComponentView {
    /**
     * @return {HTMLElement}
     */
    async render(): Promise<HTMLElement> {
        await super.render();
        const wrapper = document.createElement('div');
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates["other_menu.html"]({});
        return wrapper.querySelector('div')!;
    }
}