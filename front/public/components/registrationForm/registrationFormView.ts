import BasicComponentView from "../_basicComponent/basic_component_view.js";
import "../tmpl/registrationForm.tmpl.js";

/**
 * @class RegistrationFormView
 */
export default class RegistrationFormView extends BasicComponentView {

    async render(): Promise<HTMLElement> {
        const wrapper = document.createElement('div');
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates["registrationForm.html"]({});
        return wrapper.querySelector('div')!;
    }
}