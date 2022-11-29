import BasicComponentView from "../_basicComponent/basicComponentView";
import "../tmpl/registration_form.tmpl.js";

/**
 * @class RegistrationFormView
 */
export default class RegistrationFormView extends BasicComponentView {
    /**
     * @return {HTMLElement}
     */
    render(): HTMLElement {
        const wrapper = document.createElement('div');
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates["registration_form.html"]({});
        return wrapper.querySelector('div')!;
    }
}