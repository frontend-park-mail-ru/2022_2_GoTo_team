import Basic_component_view from "../_basic_component/basic_component_view.js";

/**
 * @class Overlay_view
 */
export default class Overlay_view extends Basic_component_view {
    /**
     * @return {HTMLElement}
     */
    render() {
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        overlay.id = 'overlay';
        return overlay;
    }
}