import BasicComponent from "../_basic_component/basic_component.js";
import {RulesData} from "../../common/types";
import CategoryRulesSidebarView from "./category_rules_sidebar_view.js";

export type CategoryRulesSidebarEventBus = {
}

/**
 * View_model-компонент соответсвующего View
 * @class CategoryRulesSidebar
 */
export default class CategoryRulesSidebar extends BasicComponent {
    view: CategoryRulesSidebarView;

    /**
     * Универсальный компонент заголовка
     */
    constructor() {
        super();
        this.view = new CategoryRulesSidebarView();
    }

    /**
     * Перерисовка подконтрольного элемента
     * @param {RulesData} rulesData
     * @return {HTMLElement}
     */
    async render(rulesData: RulesData): Promise<HTMLElement> {
        await super.render();
        this.root = await this.view.render(rulesData);
        return this.root;
    }

    async subscribe(eventBus: CategoryRulesSidebarEventBus): Promise<void> {
        await super.subscribe();
    }
};