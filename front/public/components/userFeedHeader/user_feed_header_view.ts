import BasicComponentView from "../_basicComponent/basic_component_view.js";
import "../tmpl/user_page_header.tmpl.js";
import {UserHeaderData} from "../../common/types";

/**
 * @class UserFeedHeaderView
 */
export default class UserFeedHeaderView extends BasicComponentView {
    /**
     * @param {Object} userData
     * @return {HTMLElement}
     */
    async render(userData: UserHeaderData): Promise<HTMLElement> {
        const wrapper = document.createElement('div');
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates['user_page_header.html']({
            username: userData.username,
            login: userData.login,
            rating: userData.rating,
            subscribers: userData.subscribers,
            registration_date: userData.registration_date,
        });
        return wrapper.querySelector('div')!;
    }
}