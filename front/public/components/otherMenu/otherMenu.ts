import BasicComponent from "../_basicComponent/basicComponent.js";
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

    render(): HTMLElement {
        super.render();
        this.root = this.view.render();
        return this.root;
    }

   subscribe(eventBus: OtherMenuEventBus) {

        const newArticleButton = document.getElementById('other_menu__new_article_button')!;
        newArticleButton.addEventListener('click', () => {
            eventBus.newArticle();
        });
    }
}