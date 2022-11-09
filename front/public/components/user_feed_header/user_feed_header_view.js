import Basic_component_view from "../_basic_component/basic_component_view.js";
import "../tmpl/user_page_header.tmpl.js";

/**
 * @class User_feed_header_view
 */
export default class User_feed_header_view extends Basic_component_view {
    /**
     * @param {Object} user_data
     * @return {HTMLElement}
     */
    render(user_data) {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = Handlebars.templates['user_page_header.html']({
            username: user_data.username,
            rating: user_data.rating,
            subscribers: user_data.subscribers,
            registration_date: user_data.registration_date,
        });
        return wrapper.firstChild;
    }
}