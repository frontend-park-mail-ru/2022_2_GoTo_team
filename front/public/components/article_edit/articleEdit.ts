import ArticleEditView from "./articleEditView.js";
import BasicComponent from "../_basicComponent/basicComponent.js";
import {Requests} from "../../modules/requests.js";
import {EditArticleData, FullArticleData, Listener, RequestAnswer, Subscription} from "../../common/types";

export type ArticleEditEventBus = {
    articleUpdate: (id: number) => void,
    articleCreate: Listener,
    articleRemove: (id: number) => Promise<boolean>,
    tagAdd: () => void,
}

/**
 * ViewModel-компонент соответсвующего View
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
     */
    async render(articleData?: FullArticleData): Promise<HTMLElement> {
        const categoriesPromise: Promise<RequestAnswer> = Requests.getCategories();
        const tagsPromise: Promise<RequestAnswer> = Requests.getTags();

        const categories: object = (await categoriesPromise).status == 200 ? (await categoriesPromise).response.categories : {};
        const tags: string[] = (await tagsPromise).status == 200 ? (await tagsPromise).response.tags : [];

        const editData: EditArticleData = {
            article: articleData,
            tags: tags,
            categories: categories,
        }
        this.root = await this.view.render(editData);
        return this.root;
    }

    async subscribe(eventBus: ArticleEditEventBus) {
        let newSubscription: Subscription;
        const submitButton = this.root.querySelector('.article_edit__save_button')!;

        this.root.querySelectorAll('.div_textarea').forEach((form: Element) => {
            newSubscription = {
                element: form,
                event: 'click',
                listener: () => {
                    if (!form.textContent!.replace(' ', '').length) {
                        form.innerHTML = '';
                    }
                },
            }
            this._subscribeElement(newSubscription);
            form.addEventListener('focusout', () => {
                if (!form.textContent!.replace(' ', '').length) {
                    form.innerHTML = '';
                }
            });
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

        const addTagButton = this.root.querySelector('.article_edit__add_tag')!;
        addTagButton.addEventListener('click', eventBus.tagAdd);
    }
};