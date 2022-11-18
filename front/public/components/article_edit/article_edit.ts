import ArticleEditView from "./article_edit_view.js";
import BasicComponent from "../_basic_component/basic_component.js";
import {Requests} from "../../modules/requests.js";
import {EditArticleData, FullArticleData, Listener, RequestAnswer} from "../../common/types";

export type ArticleEditEventBus = {
    articleUpdate: (id: number) => void,
    articleCreate: Listener,
    articleRemove: (id: number) => Promise<boolean>,
}

/**
 * View_model-компонент соответсвующего View
 * @class ArticleEdit
 */
export default class ArticleEdit extends BasicComponent {
    view: ArticleEditView;

    /**
     * Универсальный компонент заголовка
     */
    constructor() {
        super();
        this.view = new ArticleEditView();
    }

    /**
     * Перерисовка подконтрольного элемента
     * @param {FullArticleData} articleData
     * @return {HTMLElement}
     */
    async render(articleData?: FullArticleData): Promise<HTMLElement> {
        await super.render();
        const categoriesPromise: RequestAnswer = (await Requests.getCategories())!;

        const categories: object = categoriesPromise.status == 200 ? categoriesPromise.response.categories : {};
        const editData: EditArticleData = {
            article: articleData,
            categories: categories,
        }
        this.root = await this.view.render(editData);
        return this.root;
    }

    async subscribe(eventBus: ArticleEditEventBus) {
        await super.subscribe();
        const submitButton = this.root.querySelector('.article_edit__save_button')!;

        const titleForm = this.root.querySelector('.article_edit__title')!;
        titleForm.addEventListener('focusout', () => {
            if (!titleForm.textContent!.replace(' ', '').length) {
                titleForm.innerHTML = '';
            }
        });

        const descriptionForm = this.root.querySelector('.article_edit__description')!;
        descriptionForm.addEventListener('focusout', () => {
            if (!descriptionForm.textContent!.replace(' ', '').length) {
                descriptionForm.innerHTML = '';
            }
        });

        const contentForm = this.root.querySelector('.article_edit__content')!;
        contentForm.addEventListener('focusout', () => {
            if (!contentForm.textContent!.replace(' ', '').length) {
                contentForm.innerHTML = '';
            }
        });

        if (this.view.update) {
            submitButton.addEventListener('click', () => {
                eventBus.articleUpdate(this.view.id!);
            });

            const deleteButton = this.root.getElementsByClassName('article_edit__delete_button')[0];
            deleteButton.addEventListener('click', () => {
                eventBus.articleRemove(this.view.id!);
            });
        } else {
            submitButton.addEventListener('click', eventBus.articleCreate);
        }
    }
};