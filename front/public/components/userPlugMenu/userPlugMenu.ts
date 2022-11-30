import BasicComponent from "../_basicComponent/basicComponent.js";
import UserPlugMenuView from "./userPlugMenuView.js";
import {Listener} from "../../common/types";

export type UserPlugMenuEventBus = {
    goToSettings: Listener,
    unauthorize: Listener,
}

/**
 * ViewModel-компонент соответсвующего View
 * @class UserPlugMenu
 */
export default class UserPlugMenu extends BasicComponent {
    view: UserPlugMenuView;

    constructor() {
        super();
        this.view = new UserPlugMenuView();
    }

    render() {
        this.root = this.view.render();
        return this.root;
    }

    subscribe(eventBus: UserPlugMenuEventBus) {

        const profileButton = document.getElementById('profile_menu__profile_button')!;
        profileButton.addEventListener('click', eventBus.goToSettings);

        const exitButton = document.getElementById('profile_menu__unauthorize_button')!;
        exitButton.addEventListener('click', eventBus.unauthorize);
    }
}
