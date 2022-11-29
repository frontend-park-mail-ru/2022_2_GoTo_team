import BasicComponent from "../_basicComponent/basicComponent.js";
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

   render(searchData: SearchData): HTMLElement {
        super.render();
        this.root = this.view.render(searchData);
        return this.root;
    }

    async subscribe(eventBus: SearchHeaderEventBus) {
    }
};
