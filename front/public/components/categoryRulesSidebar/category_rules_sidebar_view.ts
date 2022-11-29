import "../tmpl/rules_sidebar.tmpl.js";
import BasicComponentView from "../_basicComponent/basic_component_view.js";
import {RulesData} from "../../common/types";

/**
 * @class ArticleView
 */
export default class CategoryRulesSidebarView extends BasicComponentView {

    /**
     * Перерисовка подконтрольного элемента
     * @param {RulesData} rules
     * @return {HTMLElement}
     */
    async render(rules: RulesData): Promise<HTMLElement> {
        const wrapper = document.createElement('div');
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates['rules_sidebar.html']({});

        return wrapper.querySelector('div')!;
    }
}