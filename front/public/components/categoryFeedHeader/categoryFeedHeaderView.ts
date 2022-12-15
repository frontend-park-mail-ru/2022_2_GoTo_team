import BasicComponentView from "../_basicComponent/basicComponentView.js";
import "../tmpl/categoryFeedHeader.tmpl.js";
import "../tmpl/subscribeButton.tmpl.js";
import "../tmpl/subscribedButton.tmpl.js";
import {CategoryData} from "../../common/types";

/**
 * @class CategoryFeedHeaderView
 */
export default class CategoryFeedHeaderView extends BasicComponentView {
    subscribed: boolean | undefined;
    category: string | undefined;

    render(categoryData: CategoryData): HTMLElement {
        const wrapper = document.createElement('div');
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates['categoryFeedHeader.html']({
            name: categoryData.name,
            description: categoryData.description,
            subscribers: categoryData.subscribers,
            avatar: categoryData.avatarImgPath,
        });

        this.category = categoryData.name;

        const subButton = wrapper.querySelector('.feed_page__header__subscribe_button')!;
        this.subscribed = categoryData.subscribed;
        if (this.subscribed){
            // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
            subButton.innerHTML = Handlebars.templates['subscribedButton.html']({});
        }else{
            // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
            subButton.innerHTML = Handlebars.templates['subscribeButton.html']({});
        }
        return wrapper.querySelector('div')!;
    }
}
