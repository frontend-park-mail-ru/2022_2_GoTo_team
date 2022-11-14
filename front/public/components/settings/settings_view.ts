import BasicComponentView from "../_basic_component/basic_component_view.js";
import "../tmpl/settings.tmpl.js";

/**
 * @class SettingsView
 */
export default class SettingsView extends BasicComponentView {
    /**
     * @param {Object} userData
     * @return {HTMLElement}
     */
    // @ts-expect-error TS(2416): Property 'render' in type 'SettingsView' is not as... Remove this comment to see the full error message
    render(userData: any) {
        const wrapper = document.createElement('div');
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates['settings.html']({
            email: userData.email,
            login: userData.login,
            username: userData.username,
            avatar_link: userData.avatar_link !== '' && typeof userData.avatar_link !== 'undefined' ? userData.avatar_link : "static/img/user_icon.jpg",

        });
        return wrapper.firstChild;
    }
}