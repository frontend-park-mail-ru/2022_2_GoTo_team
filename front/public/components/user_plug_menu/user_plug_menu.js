import BasicComponent from "../_basic_component/basic_component.js";
import UserPlugMenuView from "./user_plug_menu_view.js";
import {Events} from "../../modules/events.js";

/**
 * View_model-компонент соответсвующего View
 * @class UserPlugMenu
 */
export default class UserPlugMenu extends BasicComponent {
    /**
     * Универсальный компонент заголовка
     */
    constructor() {
        super();
        this.view = new UserPlugMenuView();
    }
    /**
     * @return {HTMLElement}
     */
    render() {
        super.render();
        this.root = this.view.render();
        return this.root;
    }

    /**
     * Подписка на связанные события
     */
    subscribe() {
        super.subscribe();
        const profileButton = document.getElementById('profile_menu__profile_button');
        profileButton.addEventListener('click', Events.goToSettingsPage);
        const exitButton = document.getElementById('profile_menu__unauthorize_button');
        exitButton.addEventListener('click', Events.profileMenuUnauthorizeListener);
    }
};