import BasicComponent from "../_basic_component/basic_component.js";
import {CommentaryData} from "../../common/types";
import CommentaryView from "./commentary_view.js";

export type CommentaryComponentEventBus = {
    goToAuthorFeed: (login: string) => void,
    showAnswerForm: () => void,
}

/**
 * View_model-компонент соответсвующего View
 * @class Commentary
 */
export default class Commentary extends BasicComponent {
    view: CommentaryView;

    /**
     * Универсальный компонент заголовка
     */
    constructor() {
        super();
        this.view = new CommentaryView();
    }

    /**
     * Перерисовка подконтрольного элемента
     * @param {CommentaryData} commentary
     * @return {HTMLElement}
     */
    async render(commentary: CommentaryData): Promise<HTMLElement> {
        await super.render();
        this.root = await this.view.render(commentary);
        return this.root;
    }

    async subscribe(eventBus: CommentaryComponentEventBus): Promise<void> {
        await super.subscribe();
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
            eventBus.showAnswerForm();
        });
    }
};