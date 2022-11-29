import BasicComponentView from "../_basicComponent/basicComponentView.js";
import "../tmpl/registrationForm.tmpl.js";

/**
 * @class RegistrationFormView
 */
export default class RegistrationFormView extends BasicComponentView {

    render(): HTMLElement {
        const wrapper = document.createElement('div');
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates["registrationForm.html"]({});
        return wrapper.querySelector('div')!;
    }
}