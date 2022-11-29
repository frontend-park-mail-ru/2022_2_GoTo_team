import BaseComponentView from './basicComponentView';
import BasicComponentView from "./basicComponentView";
import {Subscription} from "../../common/types";

/**
 * [Интерфейс] ViewModel для View
 * @class BasicComponent
 */
export default class BasicComponent {
    root: HTMLElement;
    view: BasicComponentView;
    _subscriptions: Subscription[];

    /**
     * Конструктор
     */
    constructor() {
        this.root = document.createElement('div');
        this.view = new BaseComponentView();
        this._subscriptions = [];
    }

    /**
     * Перерисовка подконтрольного элемента
     */
    async render(parameters?: object): Promise<HTMLElement> {
        return this.view.render(parameters);
    }

    /**
     * Подписка на связанное событие элемента
     */
    _subscribeElement(subscription: Subscription) {
        subscription.element.removeEventListener(subscription.event, subscription.listener);
        this._subscriptions.push(subscription);
    }

    /**
     * Подписка на связанные события
     */
    subscribe(eventBus?: object){
    }

    /**
     * Отписка от события
     */
    #unsubscribe(subscription: Subscription) {
        subscription.element.removeEventListener(subscription.event, subscription.listener);
    }

    /**
     * Подписка на связанные события
     */
    destroy(){
        for (const subscription of this._subscriptions){
            this.#unsubscribe(subscription);
        }
        this._subscriptions = [];
    }
}
