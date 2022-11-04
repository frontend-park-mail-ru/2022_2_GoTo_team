import Basic_component_view from "../_basic_component/basic_component_view.js";
import "../tmpl/unauthorized_user.tmpl.js"
import "../tmpl/authorized_user.tmpl.js";
/**
 * @class User_plug_view
 */
export default class User_plug_view extends Basic_component_view {
    /**
     * @param {Object?} user
     * @property {string} username
     * @property {string?} avatarUrl
     * @return {HTMLElement}
     */
    render(user) {
        const wrapper = document.createElement('div');
        if (user){
            wrapper.innerHTML = Handlebars.templates["authorized_user.html"]({
                nickname: user.nickname
            });
            this.authed = true;
        }else{
            wrapper.innerHTML = Handlebars.templates["unauthorized_user.html"]({});
            this.authed = false;
        }

        return wrapper;
    }
}