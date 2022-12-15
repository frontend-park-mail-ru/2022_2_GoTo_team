import BasicComponent from "../_basicComponent/basicComponent.js";
import {Listener, Subscription} from "../../common/types";
import SharingBoxView from "./sharingBoxView.js";

export type SharingBoxEventBus = {
    close: Listener,
}

/**
 * ViewModel-компонент соответсвующего View
 * @class SharingBox
 */
export default class SharingBox extends BasicComponent {
    view: SharingBoxView;

    constructor() {
        super();
        this.view = new SharingBoxView();
    }

    render(data: ShareData): HTMLElement {
        this.root = this.view.render(data);
        return this.root;
    }

    subscribe(eventBus: SharingBoxEventBus): void {
        let subscription: Subscription;

        const closeButton = this.root.querySelector('.share_alert__close_button')!;
        subscription = {
            element: closeButton,
            event: 'click',
            listener: eventBus.close,
        }
        this._subscribeEvent(subscription);
    }
}
