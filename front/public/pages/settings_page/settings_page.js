import {Events} from "../../modules/events.js";
import Settings_page_view from "./settings_page_view.js";
import Page from "../_basic/page.js";
import Settings from "../../components/settings/settings.js";
import {Requests} from "../../modules/requests.js";

/**
 * ModalView-контроллер для соответсвующих страниц
 * @class  Settings_page
 */
export default class Settings_page extends Page{
    /**
     * Страница содержит главный компонент
     * @param {HTMLElement} root
     */
    constructor(root) {
        super(root);
        this.view = new Settings_page_view(root);
    }
    /**
     * Отобразить подконтрольную страницу.
     * Должен быть вызван render() для обновления.
     */
    render() {
        this.view.render();
        Requests.get_profile().then((user_data) => {
            const settings_form = new Settings();
            settings_form.render(user_data);
            this.view.main_content_element.appendChild(settings_form.root);
            this.view.children.set('form', settings_form);
        });

        Events.update_auth();
    }

    /**
     * Подписка на связанные события
     */
    subscribe() {
        this.view.children.get('navbar').subscribe();
    }
}