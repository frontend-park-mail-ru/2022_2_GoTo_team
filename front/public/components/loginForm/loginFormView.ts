import BasicComponentView from "../_basicComponent/basic_component_view.js";
import "../tmpl/loginForm.tmpl.js";

/**
 * @class LoginFormView
 */
export default class LoginFormView extends BasicComponentView {

    /**
     * @return {HTMLElement}
     */
    async render(): Promise<HTMLElement> {
        const wrapper = document.createElement('div');
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates["loginForm.html"]({});
        return wrapper.querySelector('div')!;
    }
}