import Basic_component_view from "../_basic_component/basic_component_view.js";
import "../tmpl/settings.tmpl.js";

/**
 * @class Settings_view
 */
export default class Settings_view extends Basic_component_view {
    /**
     * @param {Object} user_data
     * @return {HTMLElement}
     */
    render(user_data) {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = Handlebars.templates['settings.html']({
            email: user_data.email,
            login: user_data.login,
            username: user_data.username,
            avatar_link: user_data.avatar_link,
        });
        return wrapper.firstChild;
    }
}