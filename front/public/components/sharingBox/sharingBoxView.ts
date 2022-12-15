import "../tmpl/sharingBox.tmpl.js";
import BasicComponentView from "../_basicComponent/basicComponentView.js";

/**
 * @class SharingBoxView
 */
export default class SharingBoxView extends BasicComponentView {

    render(data: ShareData): HTMLElement {
        const wrapper = document.createElement('div');
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates['sharingBox.html']({
            url: data.url,
        });

        return wrapper.querySelector('div')!;
    }
}
