import Settings_view from "./settings_view.js";
import Basic_component from "../_basic_component/basic_component.js";

/**
 * View_model-компонент соответсвующего View
 * @class Settings
 */
export default class Settings extends Basic_component {
    /**
     * Универсальный компонент заголовка
     */
    constructor() {
        super();
        this.view = new Settings_view();
    }
    /**
     * Перерисовка подконтрольного элемента
     * @return {HTMLElement}
     */
    render(user_data) {
        super.render();
        this.root = this.view.render(user_data);
        return this.root;
    }

    /**
     * Подписка на связанные события
     */
    subscribe() {

    }
    //TODO:subscribe()
};