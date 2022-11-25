import BasicComponent from "../_basic_component/basic_component.js";
import {AdvSearchData} from "../../common/types";
import AdvancedSearchSidebarView from "./advanced_search_sidebar_view.js";

export type AdvancedSearchSidebarEventBus = {
}

/**
 * View_model-компонент соответсвующего View
 * @class AdvancedSearchSidebar
 */
export default class AdvancedSearchSidebar extends BasicComponent {
    view:AdvancedSearchSidebarView;

    /**
     * Универсальный компонент заголовка
     */
    constructor() {
        super();
        this.view = new AdvancedSearchSidebarView();
    }

    /**
     * Перерисовка подконтрольного элемента
     * @param {AdvSearchData} data
     * @return {HTMLElement}
     */
    async render(data?: AdvSearchData): Promise<HTMLElement> {
        await super.render();
        this.root = await this.view.render(data);
        return this.root;
    }

    async subscribe(eventBus: AdvancedSearchSidebarEventBus): Promise<void> {
        await super.subscribe();

        this.root.querySelectorAll(".div_textarea").forEach((form: Element) => {
            form.addEventListener('focusout', () => {
                if (form.textContent!.replace(' ', '').length) {
                    form.innerHTML = '';
                }
            });
        });
    }
};