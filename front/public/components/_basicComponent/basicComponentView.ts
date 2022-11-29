/**
 * @class BasicComponentView
 */
export default class BasicComponentView {
    /**
     * Отрисовка компонента
     */
    render(parameters?: object): HTMLElement {
        return document.createElement('div');
    }
}