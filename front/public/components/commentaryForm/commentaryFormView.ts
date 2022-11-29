import BasicComponentView from "../_basicComponent/basicComponentView.js";
import "../tmpl/commentaryForm.tmpl.js";
import {CommentaryData} from "../../common/types";

/**
 * @class CommentaryFormView
 */
export default class CommentaryFormView extends BasicComponentView {
    id: number | undefined;
    update: boolean | undefined;

    render(editData: CommentaryData): HTMLElement {
        const wrapper = document.createElement('div');
        if (editData !== undefined) {
            // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
            wrapper.innerHTML = Handlebars.templates['commentaryForm.html']({
                content: editData.content,
                update: true,
            });
            this.id = editData.id;
            this.update = true;
        }else{
            // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
            wrapper.innerHTML = Handlebars.templates['commentaryForm.html']({});
            this.update = false;
        }
        return wrapper.querySelector('div')!;
    }
}