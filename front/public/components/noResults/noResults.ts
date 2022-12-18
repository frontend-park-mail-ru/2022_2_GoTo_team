import BasicComponent from "../_basicComponent/basicComponent.js";
import NoResultsView from "./noResultsView";

/**
 * ViewModel-компонент соответсвующего View
 * @class NoResults
 */
export default class NoResults extends BasicComponent {
    view: NoResultsView;

    constructor() {
        super();
        this.view = new NoResultsView();
    }

    render(): HTMLElement {
        this.root = this.view.render();
        return this.root;
    }

    subscribe(): void {
    }
}
