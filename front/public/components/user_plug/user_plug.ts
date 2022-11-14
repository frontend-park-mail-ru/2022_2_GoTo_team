import UserPlugView from "./user_plug_view.js";
import BasicComponent from "../_basic_component/basic_component.js";
import {Events} from "../../modules/events.js";

/**
 * View_model-компонент соответсвующего View
 * @class UserPlug
 */
export default class UserPlug extends BasicComponent {
    /**
     * Универсальный компонент заголовка
     */
    constructor() {
        super();
        this.view = new UserPlugView();
    }

    /**
     * @param {Object?} user
     * @property {string} username
     * @property {string?} avatarUrl
     * @return {HTMLElement}
     */
    // @ts-expect-error TS(2416): Property 'render' in type 'UserPlug' is not assign... Remove this comment to see the full error message
    render(user: any) {
        super.render();
        this.root = this.view.render(user);
        return this.root;
    }

    /**
     * Подписка на связанные события
     */
    subscribe() {
        super.subscribe();
        if (this.view.authed){
            this.root.addEventListener('click', Events.showProfileMenuListener)
        }else{
            this.root.addEventListener('click', Events.makeLoginOverlayListener);
        }
    }
    //TODO:destroy()
};