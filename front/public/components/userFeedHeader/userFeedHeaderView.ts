import BasicComponentView from "../_basicComponent/basicComponentView.js";
import "../tmpl/userFeedHeader.tmpl.js";
import {UserHeaderData} from "../../common/types";
import {Helpers} from "../../modules/helpers.js";

/**
 * @class UserFeedHeaderView
 */
export default class UserFeedHeaderView extends BasicComponentView {
    subscribed: boolean | undefined;
    login: string | undefined;
    render(userData: UserHeaderData): HTMLElement {
        const wrapper = document.createElement('div');
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates['userFeedHeader.html']({
            username: userData.username,
            login: userData.login,
            subscribers: userData.subscribers + " " + Helpers.numWord(userData.subscribers, ["подписался", "подписалось", "подписалось"]),
            registration_date: userData.registration_date,
            avatarUrl: userData.avatarUrl !== '' ? userData.avatarUrl : '/static/img/user_icon.webp',
        });

        this.login = userData.login;

        const subButton = wrapper.querySelector('.feed_page__header__subscribe_button')!;
        this.subscribed = userData.subscribed;
        if (userData.login !== window.sessionStorage.getItem('login')){
            if (this.subscribed){
                // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
                subButton.innerHTML = Handlebars.templates['subscribedButton.html']({});
            }else{
                // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
                subButton.innerHTML = Handlebars.templates['subscribeButton.html']({});
            }
        }
        return wrapper.querySelector('div')!;
    }
}
