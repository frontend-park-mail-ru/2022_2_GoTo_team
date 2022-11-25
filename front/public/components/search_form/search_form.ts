import BasicComponent from "../_basic_component/basic_component.js";
import SearchFormView from "./search_form_view.js";

export type SearchFormEventBus = {
    search: (request: string) => void,
}

/**
 * View_model-компонент соответсвующего View
 * @class SearchForm
 */
export default class SearchForm extends BasicComponent {
    view: SearchFormView;

    /**
     * Универсальный компонент заголовка
     */
    constructor() {
        super();
        this.view = new SearchFormView();
    }

    /**
     * Перерисовка подконтрольного элемента
     * @return {HTMLElement}
     */
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