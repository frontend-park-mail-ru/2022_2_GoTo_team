import UserPlugView from "./userPlugView.js";
import BasicComponent from "../_basicComponent/basic_component.js";
import {Listener, UserPlugData} from "../../common/types";

export type UserPlugEventBus = {
    authedListener: Listener,
    unauthedListener: Listener,
}

/**
 * ViewModel-компонент соответсвующего View
 * @class UserPlug
 */
export default class UserPlug extends BasicComponent {
    view: UserPlugView;

    constructor() {
        super();
        this.view = new UserPlugView();
    }

    async render(userData?: UserPlugData) {
        await super.render();
        this.root = await this.view.render(userData);
        return this.root;
    }

    async subscribe(eventBus: UserPlugEventBus) {
        await super.subscribe();
        if (this.view.authed){
            this.root.addEventListener('click', eventBus.authedListener);
        }else{
            this.root.addEventListener('click', eventBus.unauthedListener);
        }
    }
};