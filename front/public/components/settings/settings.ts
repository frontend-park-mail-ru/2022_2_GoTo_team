import SettingsView from "./settings_view.js";
import BasicComponent from "../_basic_component/basic_component.js";
import {Events} from "../../modules/events.js";
import {UserData} from "../../common/types";

/**
 * View_model-компонент соответсвующего View
 * @class Settings
 */
export default class Settings extends BasicComponent {
    view: SettingsView;
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
    async render(userData: UserData) {
        await super.render();
        this.root = await this.view.render(userData);
        return this.root;
    }

    /**
     * Подписка на связанные события
     */
    async subscribe() {
        const saveButton = document.getElementById('save');
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        saveButton.addEventListener('click', Events.saveProfileListener);
    }
};