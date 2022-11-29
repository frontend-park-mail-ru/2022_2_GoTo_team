import BasicComponent from "../_basicComponent/basicComponent";
import UserPlugMenuView from "./user_plug_menu_view.js";
import {Listener} from "../../common/types";

export type UserPlugMenuEventBus = {
    goToSettings: Listener,
    unauthorize: Listener,
}

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
    async subscribe(eventBus: UserPlugMenuEventBus) {
        await super.subscribe();

        const profileButton = document.getElementById('profile_menu__profile_button')!;
        profileButton.addEventListener('click', eventBus.goToSettings);

        const exitButton = document.getElementById('profile_menu__unauthorize_button')!;
        exitButton.addEventListener('click', eventBus.unauthorize);
    }
}