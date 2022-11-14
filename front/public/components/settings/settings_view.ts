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
    render(userData) {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = Handlebars.templates['settings.html']({
            email: userData.email,
            login: userData.login,
            username: userData.username,
            avatar_link: userData.avatar_link !== '' && typeof userData.avatar_link !== 'undefined' ? userData.avatar_link : "static/img/user_icon.jpg",

        });
        return wrapper.firstChild;
    }
}