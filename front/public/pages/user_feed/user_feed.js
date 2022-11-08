import {Events} from "../../modules/events.js";
import Page from "../_basic/page.js";
import User_feed_view from "./user_feed_view.js";
import {Page_loaders} from "../../modules/page_loaders.js";
import User_feed_header from "../../components/user_feed_header/user_feed_header.js";
import {Requests} from "../../modules/requests.js";

/**
 * ModalView-контроллер для соответсвующих страниц
 * @class  User_feed
 */
export default class User_feed extends Page {
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
    render(login) {
        this.view.render();
        Requests.user_header_info(login).then((user_data) => {
            const header = new User_feed_header();
            header.render(user_data);
            header.subscribe();
            this.view.center.insertBefore(header.root, this.view.center.children[0]);
        });
        
        Events.update_auth();
    }

    /**
     * Подписка на связанные события
     */
    subscribe() {
    }
}