import {Events} from "../../modules/events.js";
import Login_page_view from "./login_page_view.js";
import Page from "../_basic/page.js";
import Registration_page from "../registration/registration_page.js";
import {Page_loaders} from "../../modules/page_loaders.js";

/**
 * ModalView-контроллер для соответсвующих страниц
 * @class  Login_page
 */
export default class Login_page extends Page{
    /**
     * Страница содержит главный компонент
     * @param {HTMLElement} root
     */
    constructor(root) {
        super(root);
        this.view = new Login_page_view(root);
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
       this.view.children.get('navbar').subscribe();
       const login_event_bus = {
            submit: Events.submit_login,
            go_to_registration: Page_loaders.registration_page,
            email_validation: Events.email_validate_listener_login,
            password_validation: Events.password_validate_listener_login,
       }
       this.view.children.get('form').subscribe(login_event_bus);

       const profile_button = document.getElementById('navbar__auth_button').lastChild;
       profile_button.removeEventListener('click', Events.make_login_overlay_listener);
       profile_button.addEventListener('click', Page_loaders.login_page);
    }
}