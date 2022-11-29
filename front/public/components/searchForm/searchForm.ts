import BasicComponent from "../_basicComponent/basic_component.js";
import SearchFormView from "./searchFormView.js";

export type SearchFormEventBus = {
    search: (request: string) => void,
}

/**
 * View_model-компонент соответсвующего View
 * @class SearchForm
 */
export default class SearchForm extends BasicComponent {
    view: SearchFormView;

    constructor() {
        super();
        this.view = new SearchFormView();
    }

    async render(): Promise<HTMLElement> {
        await super.render();
        this.root = await this.view.render();
        return this.root;
    }

    async subscribe(eventBus: SearchFormEventBus) {
        await super.subscribe();
        const input = this.root.querySelector('.navbar__search_form')! as HTMLFormElement;
        input.addEventListener('keyup', function (e) {
            if (e.key === 'Enter' || e.keyCode === 13) {
                eventBus.search(input.value);
            }
        });
    }
};