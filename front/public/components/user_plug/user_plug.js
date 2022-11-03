import User_plug_view from "./user_plug_view.js";
import Basic_component from "../_basic_component/basic_component.js";

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
        this.view = new User_plug_view();
    }

    /**
     * @param {Object?} user
     * @property {string} username
     * @property {string?} avatarUrl
     * @return {HTMLElement}
     */
    render(user) {
        super.render();
        this.root = this.view.render(user);
        return this.root;
    }
    //TODO:subscribe()
    //TODO:destroy()
};