import BasicComponent from "../_basic_component/basic_component.js";
import UserPlugMenuView from "./user_plug_menu_view.js";
import {Events} from "../../modules/events.js";

/**
 * View_model-компонент соответсвующего View
 * @class UserPlugMenu
 */
export default class UserPlugMenu extends BasicComponent {
    view: UserPlugMenuView;
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
    async render() {
        await super.render();
        this.root = await this.view.render();
        return this.root;
    }

    /**
     * Подписка на связанные события
     */
    async subscribe() {
        await super.subscribe();
        const profileButton = document.getElementById('profile_menu__profile_button');
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        profileButton.addEventListener('click', Events.goToSettingsPage);
        const exitButton = document.getElementById('profile_menu__unauthorize_button');
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        exitButton.addEventListener('click', Events.profileMenuUnauthorizeListener);
    }
}