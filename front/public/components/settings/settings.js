import SettingsView from "./settings_view.js";
import BasicComponent from "../_basic_component/basic_component.js";
import {Events} from "../../modules/events.js";

/**
 * View_model-компонент соответсвующего View
 * @class Settings
 */
export default class Settings extends BasicComponent {
    /**
     * Универсальный компонент заголовка
     */
    constructor() {
        super();
        this.view = new SettingsView();
    }
    /**
     * Перерисовка подконтрольного элемента
     * @return {HTMLElement}
     */
    render(userData) {
        super.render();
        this.root = this.view.render(userData);
        return this.root;
    }

    /**
     * Подписка на связанные события
     */
    subscribe() {
        const saveButton = document.getElementById('save');
        saveButton.addEventListener('click', Events.saveProfileListener);
    }
};