import BasicComponentView from "./basicComponentView.js";
import {Subscription} from "../../common/types";

/**
 * [Интерфейс] ViewModel для View
 * @class BasicComponent
 */
export default class BasicComponent {
    root: HTMLElement;
    view: BasicComponentView;
    subscriptions: Subscription[];

    /**
     * Конструктор
     */
    constructor() {
        this.root = document.createElement('div');
        this.view = new BasicComponentView();
        this.subscriptions = [];
    }

    /**
     * Перерисовка подконтрольного элемента
     */
    render(parameters?: object): HTMLElement | Promise<HTMLElement> {
        return document.createElement('div');
    }

    /**
     * Подписка на связанные события
     */
    subscribe(eventBus?: object): void {
    }

    /**
     * Подписка на событие
     */
    _subscribeEvent(subscription: Subscription){
        subscription.element.addEventListener(subscription.event, subscription.listener);
        this.subscriptions.push(subscription);
    }

    /**
     * Отписка от события
     */
    #unsubscribeEvent(subscription: Subscription){
        subscription.element.removeEventListener(subscription.event, subscription.listener);
    }

    /**
     * Отписка от событий
     */
    destroy(){
        this.subscriptions.forEach((subscription) => {
            this.#unsubscribeEvent(subscription);
        })
    }
}
