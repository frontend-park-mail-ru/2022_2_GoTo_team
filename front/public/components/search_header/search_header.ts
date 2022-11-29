
import BasicComponent from "../_basicComponent/basicComponent";
import {SearchData} from "../../common/types";
import SearchHeaderView from "./search_header_view.js";

export type SearchHeaderEventBus = {

}

/**
 * View_model-компонент соответсвующего View
 * @class SearchHeader
 */
export default class SearchHeader extends BasicComponent {
    view: SearchHeaderView;
    /**
     * Универсальный компонент заголовка
     */
    constructor() {
        super();
        this.view = new SearchHeaderView();
    }

    /**
     * Перерисовка подконтрольного элемента
     * @return {HTMLElement}
     */
    async render(searchData: SearchData): Promise<HTMLElement> {
        await super.render();
        this.root = await this.view.render(searchData);
        return this.root;
    }

    /**
     * Подписка на связанные события
     */
    async subscribe(eventBus: SearchHeaderEventBus) {
    }
};