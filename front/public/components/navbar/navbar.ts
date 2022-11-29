import NavbarView from "./navbarView.js";
import BasicComponent from "../_basicComponent/basicComponent.js";
import {Listener} from "../../common/types";

export type NavbarEventBus = {
    goToHotFeed: Listener,
    //goToNewFeed: Listener,
    //goToSubscribeFeed: Listener,
    goToNewArticle: Listener,
    //openOtherMenu: Listener,
    openSearch: Listener,
}

/**
 * ViewModel-компонент соответсвующего View
 * @class Navbar
 */
export default class Navbar extends BasicComponent {
    view: NavbarView;

    constructor() {
        super();
        this.view = new NavbarView();
    }

    render(): HTMLElement {
        this.root = this.view.render();
        return this.root;
    }

    async subscribe(eventBus: NavbarEventBus) {
        const logo = this.root.querySelector('.navbar__logo')!;
        logo.addEventListener('click', eventBus.goToHotFeed);

        const popular = this.root.querySelectorAll('.navbar__button')[0];
        ///const newFeed = this.root.querySelectorAll('.navbar__button')[1];
        //const subscribeFeed = this.root.querySelectorAll('.navbar__button')[2];
        popular.addEventListener('click', eventBus.goToHotFeed);
        //newFeed.addEventListener('click', eventBus.goToNewFeed);
        //subscribeFeed.addEventListener('click', eventBus.goToSubscribeFeed);

        /*
        const newArticle = this.root.querySelectorAll('.navbar__button')[3];
        newArticle.addEventListener('click', () => {
            eventBus.goToNewArticle();
        });
        */

        const otherMenuButton = this.root.querySelectorAll('.navbar__button')[1];
        otherMenuButton.addEventListener('click', eventBus.goToNewArticle);

        const searchButton = this.root.querySelectorAll('.navbar__button')[3];
        searchButton.addEventListener('click', eventBus.openSearch);
    }
}
