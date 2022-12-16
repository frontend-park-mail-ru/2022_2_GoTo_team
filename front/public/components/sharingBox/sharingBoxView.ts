import "../tmpl/sharingBox.tmpl.js";
import BasicComponentView from "../_basicComponent/basicComponentView.js";
import {SharingData} from "../../common/types";
import {FrontUrl} from "../../common/consts";

/**
 * @class SharingBoxView
 */
export default class SharingBoxView extends BasicComponentView {

    render(data: SharingData): HTMLElement {
        const wrapper = document.createElement('div');
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates['sharingBox.html']({
            url: FrontUrl + data.url!.replace(/\?(.*)$/, ''),
        });

        return wrapper.querySelector('div')!;
    }
}
