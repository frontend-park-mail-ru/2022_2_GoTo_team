import BasicComponent from "../_basicComponent/basicComponent.js";
import {CommentaryData} from "../../common/types";
import CommentaryFormView from "./commentaryFormView.js";
import {CommentaryParent} from "../../common/consts.js";

export type CommentaryFormEventBus = {
    commentaryCreate: (form: CommentaryForm) => void,
}

/**
 * ViewModel-компонент соответсвующего View
 * @class CommentaryForm
 */
export default class CommentaryForm extends BasicComponent {
    view: CommentaryFormView;
    parentType: string;
    parent: number;
    article: number;

    constructor() {
        super();
        this.view = new CommentaryFormView();
        this.parent = 0;
        this.article = 0;
        this.parentType = CommentaryParent.article;
    }

    render(commentaryData: CommentaryData): HTMLElement {
        this.root = this.view.render(commentaryData);
        this.parent = commentaryData.parentId;
        this.article = commentaryData.article;
        this.parentType = commentaryData.parentType;
        return this.root;
    }

    async subscribe(eventBus: CommentaryFormEventBus) {
        await super.subscribe();
        this.root.querySelectorAll('.div_textarea').forEach((form: Element) => {
            form.addEventListener('focusout', () => {
                if (!form.textContent!.replace(' ', '').length) {
                    form.innerHTML = '';
                }
            });
        });

        const submitButton = this.root.querySelector('.commentary_form__save_button')!;
        submitButton.addEventListener('click', () => {
            eventBus.commentaryCreate(this);
        });
    }
};
