import UserFeedHeaderView from "./user_feed_header_view.js";
import BasicComponent from "../_basic_component/basic_component.js";
import {UserHeaderData} from "../../common/types";

/**
 * View_model-компонент соответсвующего View
 * @class UserFeedHeader
 */
export default class UserFeedHeader extends BasicComponent {
    view: UserFeedHeaderView;
    /**
     * Универсальный компонент заголовка
     */
    constructor() {
        super();
        this.view = new UserFeedHeaderView();
    }

    /**
     * Перерисовка подконтрольного элемента
     * @return {HTMLElement}
     */
    async render(userData: UserHeaderData): Promise<HTMLElement> {
        await super.render();
        this.root = await this.view.render(userData);
        return this.root;
    }

    /**
     * Подписка на связанные события
     */
    async subscribe() {
    }
};