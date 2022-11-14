import UserFeedHeaderView from "./user_feed_header_view.js";
import BasicComponent from "../_basic_component/basic_component.js";

/**
 * View_model-компонент соответсвующего View
 * @class UserFeedHeader
 */
export default class UserFeedHeader extends BasicComponent {
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
    // @ts-expect-error TS(2416): Property 'render' in type 'UserFeedHeader' is not ... Remove this comment to see the full error message
    render(userData: any) {
        super.render();
        this.root = this.view.render(userData);
        return this.root;
    }

    /**
     * Подписка на связанные события
     */
    subscribe() {

    }
    //TODO:subscribe()
};