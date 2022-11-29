import "../tmpl/categoryRulesSidebar.tmpl.js";
import BasicComponentView from "../_basicComponent/basic_component_view.js";
import {RulesData} from "../../common/types";

/**
 * @class ArticleView
 */
export default class CategoryRulesSidebarView extends BasicComponentView {

    async render(rules: RulesData): Promise<HTMLElement> {
        const wrapper = document.createElement('div');
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates['categoryRulesSidebar.html']({});

        return wrapper.querySelector('div')!;
    }
}