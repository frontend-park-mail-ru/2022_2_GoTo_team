import NavbarView from "./navbar_view.js";
import BasicComponent from "../_basic_component/basic_component.js";
import {Events} from "../../modules/events.js";
import {PageLoaders} from "../../modules/page_loaders.js";

/**
 * View_model-компонент соответсвующего View
 * @class Navbar
 */
export default class Navbar extends BasicComponent {
    view: NavbarView;
    /**
     * Универсальный компонент заголовка
     */
    constructor() {
        super();
        this.view = new NavbarView();
    }
    /**
     * Перерисовка подконтрольного элемента
     * @return {HTMLElement}
     */
    async render() {
        await super.render();
        this.root = await this.view.render();
        return this.root;
    }

    /**
     * Подписка на связанные события
     */
    async subscribe() {
        const logo = this.root.getElementsByClassName('navbar__logo')[0];
        logo.addEventListener('click', Events.goToFeedPage);

        const popular = this.root.getElementsByClassName('navbar__button')[0];
        const newFeed = this.root.getElementsByClassName('navbar__button')[1];
        const subscribeFeed = this.root.getElementsByClassName('navbar__button')[2];
        popular.addEventListener('click', Events.goToFeedPage);
        newFeed.addEventListener('click', Events.goToFeedPage);
        subscribeFeed.addEventListener('click', Events.goToFeedPage);

        const newArticle = this.root.getElementsByClassName('navbar__button')[3];
        newArticle.addEventListener('click', () =>{
            // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
            PageLoaders.editArticle();
        });
    }
}