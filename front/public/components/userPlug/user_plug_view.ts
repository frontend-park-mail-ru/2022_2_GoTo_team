import BasicComponentView from "../_basicComponent/basic_component_view.js";
import "../tmpl/unauthorized_user.tmpl.js"
import "../tmpl/authorized_user.tmpl.js";
import {UserPlugData} from "../../common/types";
/**
 * @class UserPlugView
 */
export default class UserPlugView extends BasicComponentView {
    authed: boolean | undefined;

    /**
     * @param {UserPlugData} userData
     * @return {HTMLElement}
     */
    async render(userData?: UserPlugData) {
        const wrapper = document.createElement('div');
        if (userData){
            // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
            wrapper.innerHTML = Handlebars.templates["authorized_user.html"]({
                nickname: userData.username,
                picture: userData.avatarUrl !== '' && typeof userData.avatarUrl !== 'undefined' ? userData.avatarUrl : "static/img/user_icon.jpg",
            });
            this.authed = true;
        }else{
            // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
            wrapper.innerHTML = Handlebars.templates["unauthorized_user.html"]({});
            this.authed = false;
        }

        return wrapper;
    }
}