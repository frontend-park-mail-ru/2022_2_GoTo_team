import BasicComponent from "../_basicComponent/basicComponent.js";
import UserPlugMenuView from "./userPlugMenuView.js";
import {Listener, Subscription} from "../../common/types";

export type UserPlugMenuEventBus = {
    goToSettings: Listener,
    unauthorize: Listener,
    authorPage: (login: string) => void,
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
        let subscription: Subscription;

        const profileButton = this.root.querySelector('#profile_menu__profile_button')!;
        subscription = {
            element: profileButton,
            event: 'click',
            listener: eventBus.goToSettings,
        }
        this._subscribeEvent(subscription);

        const authorPageButton = this.root.querySelector('#profile_menu__author_page')!;
        subscription = {
            element: authorPageButton,
            event: 'click',
            listener: () => {
                eventBus.authorPage(window.sessionStorage.getItem('login')!);
            },
        }
        this._subscribeEvent(subscription);

        const exitButton = this.root.querySelector('#profile_menu__unauthorize_button')!;
        subscription = {
            element: exitButton,
            event: 'click',
            listener: eventBus.unauthorize,
        }
        this._subscribeEvent(subscription);
    }
}
