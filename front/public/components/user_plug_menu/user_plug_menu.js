import Basic_component from "../_basic_component/basic_component.js";
import User_plug_menu_view from "./user_plug_menu_view.js";
import {Events} from "../../modules/events.js";

/**
 * View_model-компонент соответсвующего View
 * @class User_plug_menu
 */
export default class User_plug_menu extends Basic_component {
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

    /**
     * Подписка на связанные события
     */
    subscribe() {
        super.subscribe();
        const exit_button = document.getElementById('profile_menu__unauthorize_button');
        exit_button.addEventListener('click', Events.profile_menu_unauthorize_listener);
    }
};