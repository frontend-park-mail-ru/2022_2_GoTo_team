import "../tmpl/sharingBox.tmpl.js";
import BasicComponentView from "../_basicComponent/basicComponentView.js";
import {SharingData} from "../../common/types";
import {Url} from "../../common/consts";

/**
 * @class SharingBoxView
 */
export default class SharingBoxView extends BasicComponentView {

    render(data: SharingData): HTMLElement {
        const wrapper = document.createElement('div');
        const url = Url + data.url!.replace(/\?(.*)$/, '');
        let vkurl = url;
        let tlurl = url;
        if (data.title){
            vkurl += '&title=' + data.title;
            tlurl += '&text=' + data.title;
        }
        if (data.image){
            vkurl += '&image=' + data.image;
        }

        vkurl += '&noparse=true';
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates['sharingBox.html']({
            url: Url + data.url!.replace(/\?(.*)$/, ''),
            vkurl: vkurl,
            tlurl: tlurl,
        });

        return wrapper.querySelector('div')!;
    }
}
