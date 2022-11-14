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
    // @ts-expect-error TS(2416): Property 'render' in type 'UserFeedHeaderView' is ... Remove this comment to see the full error message
    render(userData: any) {
        const wrapper = document.createElement('div');
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates['user_page_header.html']({
            username: userData.username,
            rating: userData.rating,
            subscribers: userData.subscribers,
            registration_date: userData.registration_date,
        });
        return wrapper.firstChild;
    }
}