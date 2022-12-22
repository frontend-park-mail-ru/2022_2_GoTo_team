import BasicComponent from "../_basicComponent/basicComponent.js";
import {RulesData} from "../../common/types";
import CategoryRulesSidebarView from "./categoryRulesSidebarView.js";

export type CategoryRulesSidebarEventBus = Record<string, never>

/**
 * ViewModel-компонент соответсвующего View
 * @class CategoryRulesSidebar
 */
export default class CategoryRulesSidebar extends BasicComponent {
    view: CategoryRulesSidebarView;

    constructor() {
        super();
        this.view = new CategoryRulesSidebarView();
    }

    render(rulesData: RulesData): HTMLElement {
        super.render();
        this.root = this.view.render(rulesData);
        return this.root;
    }

    subscribe(eventBus: CategoryRulesSidebarEventBus): void {
        return;
    }
}
