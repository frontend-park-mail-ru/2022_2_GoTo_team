import BasicComponent from "../_basicComponent/basic_component.js";
import {Listener} from "../../common/types";
import OtherMenuView from "./otherMenuView.js";

export type OtherMenuEventBus = {
    newArticle: Listener,
}

/**
 * ViewModel-компонент соответсвующего View
 * @class OtherMMenu
 */
export default class OtherMenu extends BasicComponent {
    view: OtherMenuView;

    constructor() {
        super();
        this.view = new OtherMenuView();
    }

    async render() {
        await super.render();
        this.root = await this.view.render();
        return this.root;
    }

    async subscribe(eventBus: OtherMenuEventBus) {
        await super.subscribe();

        const newArticleButton = document.getElementById('other_menu__new_article_button')!;
        newArticleButton.addEventListener('click', () => {
            eventBus.newArticle();
        });
    }
}