import BasicComponent from "../_basicComponent/basicComponent.js";
import {CommentaryData, Subscription} from "../../common/types";
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

    subscribe(eventBus: CommentaryFormEventBus) {
        let subscription: Subscription;

        this.root.querySelectorAll('.div_textarea').forEach((form: Element) => {
            subscription = {
                element: form,
                event: 'focusout',
                listener: () => {
                    if (!form.textContent!.replace(' ', '').length) {
                        form.innerHTML = '';
                    }
                },
            }
            this._subscribeEvent(subscription);
            subscription = {
                element: form,
                event: 'keyup',
                listener: (e: Event) => {
                    const evt = e as KeyboardEvent;
                    if (evt.key === 'Enter' || evt.keyCode === 13 && !evt.shiftKey) {
                        eventBus.commentaryCreate(this);
                    }
                },
            }
            this._subscribeEvent(subscription);

        });

        const submitButton = this.root.querySelector('.commentary_form__save_button')!;
        subscription = {
            element: submitButton,
            event: 'click',
            listener: () => {
                eventBus.commentaryCreate(this);
            },
        }
        this._subscribeEvent(subscription);
    }
}
