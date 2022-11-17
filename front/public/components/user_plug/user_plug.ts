import UserPlugView from "./user_plug_view.js";
import BasicComponent from "../_basic_component/basic_component.js";
import {Events} from "../../modules/events.js";
import {UserPlugData} from "../../common/types";

/**
 * View_model-компонент соответсвующего View
 * @class UserPlug
 */
export default class UserPlug extends BasicComponent {
    view: UserPlugView;
    /**
     * Универсальный компонент заголовка
     */
    constructor() {
        super();
        this.view = new UserPlugView();
    }

    /**
     * @param {UserPlugData?} userData
     * @return {HTMLElement}
     */
    async render(userData?: UserPlugData) {
        await super.render();
        this.root = await this.view.render(userData);
        return this.root;
    }

    /**
     * Подписка на связанные события
     */
    async subscribe() {
        await super.subscribe();
        if (this.view.authed){
            this.root.addEventListener('click', Events.showProfileMenuListener)
        }else{
            this.root.addEventListener('click', Events.makeLoginOverlayListener);
        }
    }
};