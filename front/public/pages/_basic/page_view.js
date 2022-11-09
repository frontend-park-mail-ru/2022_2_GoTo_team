/**
 * View для соответсвующих страниц
 * @class PageView
 */
export default class PageView {
    /**
     * @param {HTMLElement} root
     */
    constructor(root) {
        this.root = root;
        this.children = new Map();
    }

    /**
     * Нарисовать страницу
     */
    render() {
        this.root.innerHTML = '';
    }
}