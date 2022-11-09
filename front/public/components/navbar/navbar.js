import Navbar_view from "./navbar_view.js";
import Basic_component from "../_basic_component/basic_component.js";
import {Events} from "../../modules/events.js";

/**
 * View_model-компонент соответсвующего View
 * @class Navbar
 */
export default class Navbar extends Basic_component {
    /**
     * Универсальный компонент заголовка
     */
    constructor() {
        super();
        this.view = new Navbar_view();
    }
    /**
     * Перерисовка подконтрольного элемента
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
        const logo = this.root.getElementsByClassName('navbar__logo')[0];
        logo.addEventListener('click', Events.go_to_feed_page);

        const popular = this.root.getElementsByClassName('navbar__button')[0];
        const new_feed = this.root.getElementsByClassName('navbar__button')[1];
        const subscribe_feed = this.root.getElementsByClassName('navbar__button')[2];
        popular.addEventListener('click', Events.go_to_feed_page);
        new_feed.addEventListener('click', Events.go_to_feed_page);
        subscribe_feed.addEventListener('click', Events.go_to_feed_page);
    }
};