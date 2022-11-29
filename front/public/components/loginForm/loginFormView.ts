import BasicComponentView from "../_basicComponent/basicComponentView.js";
import "../tmpl/loginForm.tmpl.js";

/**
 * @class LoginFormView
 */
export default class LoginFormView extends BasicComponentView {

    /**
     * @return {HTMLElement}
     */
    render(): HTMLElement {
        const wrapper = document.createElement('div');
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates["loginForm.html"]({});
        return wrapper.querySelector('div')!;
    }
}