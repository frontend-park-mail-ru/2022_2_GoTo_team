import BasicComponentView from "../_basicComponent/basic_component_view.js";
import "../tmpl/otherMenu.tmpl.js";

/**
 * @class OtherMenuView
 */
export default class OtherMenuView extends BasicComponentView {

    async render(): Promise<HTMLElement> {
        await super.render();
        const wrapper = document.createElement('div');
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates["otherMenu.html"]({});
        return wrapper.querySelector('div')!;
    }
}