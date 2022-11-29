import UserPlugView from "./user_plug_view.js";
import BasicComponent from "../_basicComponent/basic_component.js";
import {Listener, UserPlugData} from "../../common/types";

export type UserPlugEventBus = {
    authedListener: Listener,
    unauthedListener: Listener,
}

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
    async subscribe(eventBus: UserPlugEventBus) {
        await super.subscribe();
        if (this.view.authed){
            this.root.addEventListener('click', eventBus.authedListener);
        }else{
            this.root.addEventListener('click', eventBus.unauthedListener);
        }
    }
};