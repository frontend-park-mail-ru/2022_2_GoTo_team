import BasicComponentView from "../_basic_component/basic_component_view.js";
import "../tmpl/commentary_form.tmpl.js";
import {CommentaryData} from "../../common/types";

/**
 * @class CommentaryFormView
 */
export default class CommentaryFormView extends BasicComponentView {
    id: number | undefined;
    update: boolean | undefined;

    /**
     * Перерисовка подконтрольного элемента
     * @param {CommentaryData?} editData
     * @return {HTMLElement}
     */
    async render(editData?: CommentaryData): Promise<HTMLElement> {
        const wrapper = document.createElement('div');
        if (typeof editData !== 'undefined') {
            // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
            wrapper.innerHTML = Handlebars.templates['commentary_form.html']({
                content: editData.content,
                update: true,
            });
            this.id = editData.id;
            this.update = true;
        }else{
            // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
            wrapper.innerHTML = Handlebars.templates['commentary_form.html']({});
            this.update = false;
        }
        return wrapper.querySelector('div')!;
    }
}