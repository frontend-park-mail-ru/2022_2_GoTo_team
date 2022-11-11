import BasicComponentView from "../_basic_component/basic_component_view.js";
import "../tmpl/unauthorized_user.tmpl.js"
import "../tmpl/authorized_user.tmpl.js";
/**
 * @class UserPlugView
 */
export default class UserPlugView extends BasicComponentView {
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
                nickname: user.nickname,
                picture: user.avatarUrl !== '' && typeof user.avatarUrl !== 'undefined' ? user.avatarUrl : "static/img/user_icon.jpg",
            });
            this.authed = true;
        }else{
            wrapper.innerHTML = Handlebars.templates["unauthorized_user.html"]({});
            this.authed = false;
        }

        return wrapper;
    }
}