/**
 * View для соответсвующих страниц
 * @class PageView
 */
export default class PageView {
    children: any;
    root: HTMLElement;

    /**
     * @param {HTMLElement} root
     */
    constructor(root: HTMLElement) {
        this.root = root;
        this.children = new Map();
    }

    /**
     * Нарисовать страницу
     */
    async render(parameters?: object) {
        this.root.innerHTML = '';
    }
}