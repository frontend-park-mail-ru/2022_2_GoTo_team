import NavbarView from "./navbarView.js";
import BasicComponent from "../_basicComponent/basicComponent.js";
import {Listener, Subscription} from "../../common/types";

export type NavbarEventBus = {
    goToRoot: Listener,
    goToHotFeed: Listener,
    //goToNewFeed: Listener,
    goToSubscribeFeed: Listener,
    goToNewArticle: Listener,
    openAdvSearch: Listener,
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
        subscription = {
            element: logo,
            event: 'click',
            listener: eventBus.goToRoot,
        }
        this._subscribeEvent(subscription);

        const popular = this.root.querySelector('#navbar__popular')!;
        subscription = {
            element: popular,
            event: 'click',
            listener: eventBus.goToHotFeed,
        }
        this._subscribeEvent(subscription);
        ///const newFeed = this.root.querySelectorAll('.navbar__button')[1];
        const subscribeFeed = this.root.querySelector('#navbar__subscribes')!;
        subscription = {
            element: subscribeFeed,
            event: 'click',
            listener: eventBus.goToSubscribeFeed,
        }
        this._subscribeEvent(subscription);
        //popular.addEventListener('click', eventBus.goToHotFeed);
        //newFeed.addEventListener('click', eventBus.goToNewFeed);
        //subscribeFeed.addEventListener('click', eventBus.goToSubscribeFeed);


        const newArticle = this.root.querySelectorAll('.navbar__button')[2];
        newArticle.addEventListener('click', () => {
            eventBus.goToNewArticle();
        });


        const searchButton = this.root.querySelector('.navbar__search_form__button')!;
        subscription = {
            element: searchButton,
            event: 'click',
            listener: eventBus.openAdvSearch,
        }
        this._subscribeEvent(subscription);

        const input = this.root.querySelector('.navbar__search_form')! as HTMLFormElement;
        subscription = {
            element: input,
            event: 'keyup',
            listener: (e: Event) => {
                const evt = e as KeyboardEvent;
                if (evt.key === 'Enter' || evt.keyCode === 13) {
                    eventBus.search(input.value);
                }
            },
        }
        this._subscribeEvent(subscription);
    }
}
