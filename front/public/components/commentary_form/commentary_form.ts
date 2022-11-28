import BasicComponent from "../_basic_component/basic_component.js";
import {CommentaryData} from "../../common/types";
import CommentaryFormView from "./commentary_form_view.js";
import {CommentaryParent} from "../../common/consts.js";

export type CommentaryFormEventBus = {
    commentaryCreate: (form: CommentaryForm) => void,
}

/**
 * View_model-компонент соответсвующего View
 * @class CommentaryForm
 */
export default class CommentaryForm extends BasicComponent {
    view: CommentaryFormView;
    parentType: string;
    parent: number;
    article: number;

    /**
     * Универсальный компонент заголовка
     */
    constructor() {
        super();
        this.view = new CommentaryFormView();
        this.parent = 0;
        this.article = 0;
        this.parentType = CommentaryParent.article;
    }

    /**
     * Перерисовка подконтрольного элемента
     * @param {CommentaryData} commentaryData
     * @return {HTMLElement}
     */
    async render(commentaryData: CommentaryData): Promise<HTMLElement> {
        await super.render();
        this.root = await this.view.render(commentaryData);
        this.parent = commentaryData.parentId;
        this.article = commentaryData.article;
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