import BasicComponent from "../_basicComponent/basicComponent.js";
import SearchFormView from "./searchFormView.js";
import {Subscription} from "../../common/types";

export type SearchFormEventBus = {
    search: (request: string) => void,
}

/**
 * ViewModel-компонент соответсвующего View
 * @class SearchForm
 */
export default class SearchForm extends BasicComponent {
    view: SearchFormView;

    constructor() {
        super();
        this.view = new SearchFormView();
    }

    render(): HTMLElement {
        this.root = this.view.render();
        return this.root;
    }

    async subscribe(eventBus: SearchFormEventBus) {
        let subscription: Subscription;
        const input = this.root.querySelector('.navbar__search_form')! as HTMLFormElement;
        subscription = {
            element: input,
            event: 'keyup',
            // @ts-ignore
            listener: (e: KeyboardEvent) => {
            if (e.key === 'Enter' || e.keyCode === 13) {
                eventBus.search(input.value);
            }
        },
        }
        this._subscribeEvent(subscription);
    }
};
