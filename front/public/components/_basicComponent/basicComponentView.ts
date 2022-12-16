import {FrontUrl} from "../../common/consts";

/**
 * @class BasicComponentView
 */
export default class BasicComponentView {
    baseUrl: string;

    /**
     * Конструктор
     */
    constructor() {
        this.baseUrl = FrontUrl;
    }
    /**
     * Отрисовка компонента
     */
    render(parameters?: object): HTMLElement {
        return document.createElement('div');
    }
}
