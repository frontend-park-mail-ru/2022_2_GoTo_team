import BasicComponent from "../_basicComponent/basicComponent.js";
import {CommentaryData} from "../../common/types";
import CommentaryView from "./commentaryView.js";

export type CommentaryComponentEventBus = {
    goToAuthorFeed: (login: string) => void,
    showAnswerForm: (comment: Commentary) => void,
}

/**
 * ViewModel-компонент соответсвующего View
 * @class Commentary
 */
export default class Commentary extends BasicComponent {
    view: CommentaryView;
    data: CommentaryData | undefined;

    constructor() {
        super();
        this.view = new CommentaryView();
    }

    render(commentary: CommentaryData): HTMLElement {
        this.data = commentary;
        this.root = this.view.render(commentary);
        return this.root;
    }

    subscribe(eventBus: CommentaryComponentEventBus) {
        const avatar: HTMLElement = this.root.querySelector('.commentary__profile_picture')!;

        avatar.addEventListener('click', () => {
            eventBus.goToAuthorFeed(this.view.publisher!);
        });

        const author_link: HTMLElement = this.root.querySelector('.commentary__author')!;
        author_link.addEventListener('click', () => {
            eventBus.goToAuthorFeed(this.view.publisher!);
        });

        const answer_button: HTMLElement = this.root.querySelector('.commentary__answer_button')!;
        answer_button.addEventListener('click', () => {
            eventBus.showAnswerForm(this);
        });
    }
};