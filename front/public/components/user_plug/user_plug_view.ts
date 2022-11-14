import BasicComponentView from "../_basic_component/basic_component_view.js";
import "../tmpl/unauthorized_user.tmpl.js"
import "../tmpl/authorized_user.tmpl.js";
/**
 * @class UserPlugView
 */
export default class UserPlugView extends BasicComponentView {
    authed: any;
    /**
     * @param {Object?} user
     * @property {string} username
     * @property {string?} avatarUrl
     * @return {HTMLElement}
     */
    // @ts-expect-error TS(2416): Property 'render' in type 'UserPlugView' is not as... Remove this comment to see the full error message
    render(user: any) {
        const wrapper = document.createElement('div');
        if (user){
            // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
            wrapper.innerHTML = Handlebars.templates["authorized_user.html"]({
                nickname: user.nickname,
                picture: user.avatarUrl !== '' && typeof user.avatarUrl !== 'undefined' ? user.avatarUrl : "static/img/user_icon.jpg",
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