/**
 * View для соответсвующих страниц
 * @class Page_view
 */
export default class Page_view {
    /**
     * @param {HTMLElement} root
     */
    constructor(root) {
        this.root = root;
    }

    /**
     * Нарисовать страницу
     */
    render() {
        this.root.innerHTML = '';
    }
}