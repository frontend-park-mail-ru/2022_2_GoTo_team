import BasicComponentView from "../_basic_component/basic_component_view.js";
import "../tmpl/user_page_header.tmpl.js";

/**
 * @class UserFeedHeaderView
 */
export default class UserFeedHeaderView extends BasicComponentView {
    /**
     * @param {Object} userData
     * @return {HTMLElement}
     */
    render(userData) {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = Handlebars.templates['user_page_header.html']({
            username: userData.username,
            rating: userData.rating,
            subscribers: userData.subscribers,
            registration_date: userData.registration_date,
        });
        return wrapper.firstChild;
    }
}