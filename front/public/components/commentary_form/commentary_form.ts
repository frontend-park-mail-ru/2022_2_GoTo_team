import BasicComponent from "../_basic_component/basic_component.js";
import {Requests} from "../../modules/requests.js";
import {CommentaryData} from "../../common/types";
import CommentaryFormView from "./commentary_form_view";

export type CommentaryFormEventBus = {
    commentaryUpdate: (commentary: CommentaryData) => void,
    commentaryCreate: (commentary: CommentaryData) => void,
}

/**
 * View_model-компонент соответсвующего View
 * @class CommentaryForm
 */
export default class CommentaryForm extends BasicComponent {
    view: CommentaryFormView;

    /**
     * Универсальный компонент заголовка
     */
    constructor() {
        super();
        this.view = new CommentaryFormView();
    }

    /**
     * Перерисовка подконтрольного элемента
     * @param {CommentaryData} commentaryData
     * @return {HTMLElement}
     */
    async render(commentaryData?: CommentaryData): Promise<HTMLElement> {
        await super.render();
        this.root = await this.view.render(commentaryData);
        return this.root;
    }

    async subscribe(eventBus: CommentaryFormEventBus) {
        await super.subscribe();
        const submitButton = this.root.querySelector('.article_edit__save_button')!;

        const titleForm = this.root.querySelector('.article_edit__title')!;
        titleForm.addEventListener('focusout', () => {
            if (!titleForm.textContent!.replace(' ', '').length) {
                titleForm.innerHTML = '';
            }
        });


        /*
        if (this.view.update) {
            submitButton.addEventListener('click', () => {
                eventBus.commentaryUpdate(this.view.id!);
            });
        } else {
            submitButton.addEventListener('click', eventBus.commentaryCreate);
        }
        */
    }
};