import BasicComponent from "../_basic_component/basic_component.js";
import {AdvSearchData, RequestAnswer} from "../../common/types";
import AdvancedSearchSidebarView, {AdvSearchFormData} from "./advanced_search_sidebar_view.js";
import {Requests} from "../../modules/requests.js";

export type AdvancedSearchSidebarEventBus = {
    addTag: (form: AdvancedSearchSidebar) => void,
}

/**
 * View_model-компонент соответсвующего View
 * @class AdvancedSearchSidebar
 */
export default class AdvancedSearchSidebar extends BasicComponent {
    view: AdvancedSearchSidebarView;
    tags: string[];

    /**
     * Универсальный компонент заголовка
     */
    constructor() {
        super();
        this.tags = [];
        this.view = new AdvancedSearchSidebarView();
    }

    /**
     * Перерисовка подконтрольного элемента
     * @param {AdvSearchData} data
     * @return {HTMLElement}
     */
    async render(data?: AdvSearchData): Promise<HTMLElement> {
        await super.render();
        const tagsRequest: RequestAnswer = await Requests.getCategories();
        let tags: string[] = [];

        if (tagsRequest.status == 200){
            tags = tagsRequest.response.tags;
        }

        const formData: AdvSearchFormData = {
            tagList: tags,
            advSearchData: data,
        }

        this.root = await this.view.render(formData);
        if (data !== undefined && data.tags !== undefined) {
            this.tags = data.tags;
        }
        return this.root;
    }

    async subscribe(eventBus: AdvancedSearchSidebarEventBus): Promise<void> {
        await super.subscribe();

        this.root.querySelectorAll('.div_textarea').forEach((form: Element) => {
            form.addEventListener('focusout', () => {
                if (!form.textContent!.replace(' ', '').length) {
                    form.innerHTML = '';
                }
            });
        });

        const addButton = this.root.querySelector('.advanced_search__sidebar__add_tag')!;
        addButton.addEventListener('click', () => {
            eventBus.addTag(this);
        })
    }
};