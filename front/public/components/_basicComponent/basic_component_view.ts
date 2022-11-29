/**
 * @class BasicComponentView
 */
export default class BasicComponentView {
    /**
     * @return {HTMLElement}
     */
    async render(parameters?: object): Promise<HTMLElement> {
        return document.createElement('div');
    }
}