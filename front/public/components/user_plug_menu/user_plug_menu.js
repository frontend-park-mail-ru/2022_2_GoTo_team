import Basic_component from "../_basic_component/basic_component";
import User_plug_menu_view from "./user_plug_menu_view";

/**
 * View_model-компонент соответсвующего View
 * @class User_plug
 */
export default class User_plug extends Basic_component {
    /**
     * Универсальный компонент заголовка
     */
    constructor() {
        super();
        this.view = new User_plug_menu_view();
    }
    /**
     * @return {HTMLElement}
     */
    render() {
        super.render();
        this.root = this.view.render();
        return this.root;
    }
    //TODO:subscribe()
    //TODO:destroy()
};