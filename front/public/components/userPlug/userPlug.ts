import UserPlugView from "./userPlugView.js";
import BasicComponent from "../_basicComponent/basicComponent.js";
import {Listener, Subscription, UserPlugData} from "../../common/types";

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

    render(userData?: UserPlugData): HTMLElement {
        this.root = this.view.render(userData);
        return this.root;
    }

    subscribe(eventBus: UserPlugEventBus) {
        let subscription: Subscription;
        if (this.view.authed){
            subscription = {
                element: this.root,
                event: 'click',
                listener: eventBus.authedListener,
            }
            this._subscribeEvent(subscription);
        }else{
            subscription = {
                element: this.root,
                event: 'click',
                listener: eventBus.unauthedListener,
            }
            this._subscribeEvent(subscription);
        }
    }
}
