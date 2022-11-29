import BasicComponent from "../_basicComponent/basic_component.js";
import {SearchData} from "../../common/types";
import SearchHeaderView from "./searchHeaderView.js";

export type SearchHeaderEventBus = {

}

/**
 * ViewModel-компонент соответсвующего View
 * @class SearchHeader
 */
export default class SearchHeader extends BasicComponent {
    view: SearchHeaderView;

    constructor() {
        super();
        this.view = new SearchHeaderView();
    }

    async render(searchData: SearchData): Promise<HTMLElement> {
        await super.render();
        this.root = await this.view.render(searchData);
        return this.root;
    }

    async subscribe(eventBus: SearchHeaderEventBus) {
    }
};