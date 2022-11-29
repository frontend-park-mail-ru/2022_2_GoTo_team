import "../tmpl/categoryRulesSidebar.tmpl.js";
import BasicComponentView from "../_basicComponent/basicComponentView.js";
import {RulesData} from "../../common/types";

/**
 * @class ArticleView
 */
export default class CategoryRulesSidebarView extends BasicComponentView {

    render(rules: RulesData): HTMLElement {
        const wrapper = document.createElement('div');
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates['categoryRulesSidebar.html']({});

        return wrapper.querySelector('div')!;
    }
}