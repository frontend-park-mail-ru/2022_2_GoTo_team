import BasicComponentView from "../_basicComponent/basicComponentView.js";
import "../tmpl/userFeedHeader.tmpl.js";
import {UserHeaderData} from "../../common/types";
import {Helpers} from "../../modules/helpers.js";

/**
 * @class UserFeedHeaderView
 */
export default class UserFeedHeaderView extends BasicComponentView {

    render(userData: UserHeaderData): HTMLElement {
        const wrapper = document.createElement('div');
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates['userFeedHeader.html']({
            username: userData.username,
            login: userData.login,
            subscribers: userData.subscribers + " " + Helpers.numWord(userData.subscribers, ["подписался", "подписалось", "подписалось"]),
            registration_date: userData.registration_date,
        });
        return wrapper.querySelector('div')!;
    }
}
