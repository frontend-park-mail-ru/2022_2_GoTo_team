import BasicComponent from "../_basicComponent/basicComponent.js";
import {RulesData} from "../../common/types";
import CategoryRulesSidebarView from "./categoryRulesSidebarView.js";

export type CategoryRulesSidebarEventBus = {
}

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

    async render(rulesData: RulesData): Promise<HTMLElement> {
        await super.render();
        this.root = await this.view.render(rulesData);
        return this.root;
    }

    async subscribe(eventBus: CategoryRulesSidebarEventBus): Promise<void> {
        await super.subscribe();
    }
};
