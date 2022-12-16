import BasicComponentView from "../_basicComponent/basicComponentView.js";
import "../tmpl/settings.tmpl.js";
import {UserData} from "../../common/types";

/**
 * @class SettingsView
 */
export default class SettingsView extends BasicComponentView {

    render(userData: UserData): HTMLElement {
        const wrapper = document.createElement('div');
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates['settings.html']({
            email: userData.email,
            login: userData.login,
            username: userData.username,
            avatarUrl: userData.avatarUrl !== '' && userData.avatarUrl !== undefined ? userData.avatarUrl : "/static/img/user_icon.jpg",
        });
        return wrapper.querySelector('div')!;
    }
}
