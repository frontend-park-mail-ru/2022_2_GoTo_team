import BasicComponentView from "../_basicComponent/basic_component_view.js";
import "../tmpl/unauthorizedUser.tmpl.js"
import "../tmpl/authorizedUser.tmpl.js";
import {UserPlugData} from "../../common/types";
/**
 * @class UserPlugView
 */
export default class UserPlugView extends BasicComponentView {
    authed: boolean | undefined;

    async render(userData?: UserPlugData) {
        const wrapper = document.createElement('div');
        if (userData){
            // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
            wrapper.innerHTML = Handlebars.templates["authorizedUser.html"]({
                nickname: userData.username,
                picture: userData.avatarUrl !== '' && userData.avatarUrl !== undefined ? userData.avatarUrl : "static/img/user_icon.jpg",
            });
            this.authed = true;
        }else{
            // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
            wrapper.innerHTML = Handlebars.templates["unauthorizedUser.html"]({});
            this.authed = false;
        }

        return wrapper;
    }
}