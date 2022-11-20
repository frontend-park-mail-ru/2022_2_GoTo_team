import BasicComponent from "../_basic_component/basic_component.js";
import {Listener} from "../../common/types";
import OtherMenuView from "./other_menu_view.js";

export type OtherMenuEventBus = {
    newArticle: Listener,
}

/**
 * View_model-компонент соответсвующего View
 * @class OtherMMenu
 */
export default class OtherMenu extends BasicComponent {
    view: OtherMenuView;
    /**
     * Универсальный компонент заголовка
     */
    constructor() {
        super();
        this.view = new OtherMenuView();
    }

    /**
     * @return {HTMLElement}
     */
    async render() {
        await super.render();
        this.root = await this.view.render();
        return this.root;
    }

    /**
     * Подписка на связанные события
     */
    async subscribe(eventBus: OtherMenuEventBus) {
        await super.subscribe();

        const newArticleButton = document.getElementById('other_menu__new_article_button')!;
        newArticleButton.addEventListener('click', () => {
            eventBus.newArticle();
        });
    }
}