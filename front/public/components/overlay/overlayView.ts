import BasicComponentView from "../_basicComponent/basic_component_view.js";

/**
 * @class OverlayView
 */
export default class OverlayView extends BasicComponentView {
    /**
     * @return {HTMLElement}
     */
    async render() {
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        overlay.id = 'overlay';

        overlay.appendChild(document.createElement('div'));

        const centerDiv = document.createElement('div');
        centerDiv.classList.add('overlay__center');
        centerDiv.id = 'overlay__center';
        overlay.appendChild(centerDiv);

        overlay.appendChild(document.createElement('div'));

        return overlay;
    }
}