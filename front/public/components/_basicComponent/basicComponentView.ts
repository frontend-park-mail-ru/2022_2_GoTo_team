import {Url} from "../../common/consts";

/**
 * @class BasicComponentView
 */
export default class BasicComponentView {
    baseUrl: string;

    /**
     * Конструктор
     */
    constructor() {
        this.baseUrl = Url;
    }
    /**
     * Отрисовка компонента
     */
    render(parameters?: object): HTMLElement {
        return document.createElement('div');
    }
}
