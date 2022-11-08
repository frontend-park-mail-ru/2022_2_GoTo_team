import {Events} from "../../modules/events.js";
import Page from "../_basic/page.js";
import User_feed_view from "./user_feed_view.js";
import {Page_loaders} from "../../modules/page_loaders.js";
/**
 * ModalView-контроллер для соответсвующих страниц
 * @class  User_feed
 */
export default class User_feed extends Page{
    /**
     * Страница содержит главный компонент
     * @param {HTMLElement} root
     */
    constructor(root) {
        super(root);
        this.view = new User_feed_view(root);
    }
    /**
     * Отобразить подконтрольную страницу.
     * Должен быть вызван render() для обновления.
     */
    render() {
        this.view.render();
        Events.update_auth();
    }

    /**
     * Подписка на связанные события
     */
    subscribe() {
        const registration_event_bus = {
            submit: Events.submit_registration,
            email_validation: Events.email_validate_listener_registration,
            login_validation: Events.login_validate_listener_registration,
            username_validation: Events.username_validate_listener_registration,
            password_validation: Events.password_validate_listener_registration,
            repeat_password_validation: Events.password_repeat_validate_listener_registration,
        }
        this.view.children.get('form').subscribe(registration_event_bus);
        const profile_button = document.getElementById('navbar__auth_button').lastChild;
        profile_button.removeEventListener('click', Events.make_login_overlay_listener);
        profile_button.addEventListener('click', Page_loaders.login_page);
    }
}