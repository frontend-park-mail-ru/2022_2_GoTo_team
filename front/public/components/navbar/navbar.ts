import NavbarView from "./navbarView.js";
import BasicComponent from "../_basicComponent/basicComponent.js";
import {Listener, Subscription} from "../../common/types";

export type NavbarEventBus = {
    goToHotFeed: Listener,
    //goToNewFeed: Listener,
    //goToSubscribeFeed: Listener,
    goToNewArticle: Listener,
    //openOtherMenu: Listener,
    search: (request: string) => void,
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
        let subscription: Subscription;
        const logo = this.root.querySelector('.navbar__logo')!;
        logo.addEventListener('click', eventBus.goToHotFeed);

        const popular = this.root.querySelectorAll('.navbar__button')[0];
        subscription = {
            element: popular,
            event: 'click',
            listener: eventBus.goToHotFeed,
        }
        this._subscribeEvent(subscription);
        ///const newFeed = this.root.querySelectorAll('.navbar__button')[1];
        //const subscribeFeed = this.root.querySelectorAll('.navbar__button')[2];
        //popular.addEventListener('click', eventBus.goToHotFeed);
        //newFeed.addEventListener('click', eventBus.goToNewFeed);
        //subscribeFeed.addEventListener('click', eventBus.goToSubscribeFeed);

        /*
        const newArticle = this.root.querySelectorAll('.navbar__button')[3];
        newArticle.addEventListener('click', () => {
            eventBus.goToNewArticle();
        });
        */

        const otherMenuButton = this.root.querySelectorAll('.navbar__button')[1];
        subscription = {
            element: otherMenuButton,
            event: 'click',
            listener: eventBus.goToNewArticle,
        }
        this._subscribeEvent(subscription);

        const input = this.root.querySelector('.navbar__search_form')! as HTMLFormElement;
        subscription = {
            element: input,
            event: 'keyup',
            // @ts-ignore
            listener: (e: KeyboardEvent) => {
                if (e.key === 'Enter' || e.keyCode === 13) {
                    eventBus.search(input.value);
                }
            },
        }
        this._subscribeEvent(subscription);
    }
}
