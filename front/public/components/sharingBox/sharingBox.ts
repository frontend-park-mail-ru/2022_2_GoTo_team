import BasicComponent from "../_basicComponent/basicComponent.js";
import {Listener, SharingData, Subscription} from "../../common/types";
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

    render(data: SharingData): HTMLElement {
        this.root = this.view.render(data);
        return this.root;
    }

    subscribe(eventBus: SharingBoxEventBus): void {
        let subscription: Subscription;

        const copyButton = this.root.querySelector('.share_alert__copy_button')!;
        subscription = {
            element: copyButton,
            event: 'click',
            listener: () => {
                const copyInput = this.root.querySelector('.share_alert__form')! as HTMLInputElement;
                navigator.clipboard.writeText(copyInput.value).then(() => {
                    const copiedMessage = this.root.querySelector('.share_alert__copied')! as HTMLElement;
                    copiedMessage.style.display = 'block';
                });
            },
        }
        this._subscribeEvent(subscription);

        const closeButton = this.root.querySelector('.share_alert__close_button')!;
        subscription = {
            element: closeButton,
            event: 'click',
            listener: eventBus.close,
        }
        this._subscribeEvent(subscription);
    }
}
