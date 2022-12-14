import ArticleEditView from "./articleEditView.js";
import BasicComponent from "../_basicComponent/basicComponent.js";
import {Requests} from "../../modules/requests.js";
import {EditArticleData, FullArticleData, Listener, RequestAnswer, Subscription} from "../../common/types";

export type ArticleEditEventBus = {
    articleUpdate: (id: number) => void,
    articleCreate: Listener,
    articleRemove: (id: number) => void,
    tagAdd: () => void,
}

/**
 * ViewModel-компонент соответсвующего View
 * @class ArticleEdit
 */
export default class ArticleEdit extends BasicComponent {
    view: ArticleEditView;

    constructor() {
        super();
        this.view = new ArticleEditView();
    }

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

    subscribe(eventBus: ArticleEditEventBus) {
        let subscription: Subscription;
        const submitButton = this.root.querySelector('.article_edit__save_button')!;

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
                event: 'paste',
                listener: (e: Event) => {
                    e.preventDefault();
                    const evt = e as ClipboardEvent;
                    form.innerHTML += evt.clipboardData!.getData('text');
                },
            }
            this._subscribeEvent(subscription);
        });

        if (this.view.update) {
            subscription = {
                element: submitButton,
                event: 'click',
                listener: () => {
                    eventBus.articleUpdate(this.view.id!);
                },
            }
            this._subscribeEvent(subscription);

            const deleteButton = this.root.getElementsByClassName('article_edit__delete_button')[0];
            subscription = {
                element: deleteButton,
                event: 'click',
                listener: () => {
                    eventBus.articleRemove(this.view.id!);
                },
            }
            this._subscribeEvent(subscription);
        } else {
            subscription = {
                element: submitButton,
                event: 'click',
                listener: eventBus.articleCreate,
            }
            this._subscribeEvent(subscription);
        }

        this.root.querySelectorAll('.article__tag').forEach((tagDiv) => {
            subscription = {
                element: tagDiv,
                event: 'click',
                listener: () => {
                    const tags: string[] = [];
                    document.querySelectorAll('.article__tag').forEach((tagDiv) => {
                        tags.push(tagDiv.innerHTML);
                    });

                    const index = tags.indexOf(tagDiv.innerHTML);
                    if (index > -1) {
                        tags.splice(index, 1);
                    }

                    if (tags.length == 0) {
                        tagDiv.parentElement!.innerHTML = '<div class="advanced_search__sidebar__tags__message">Теги не выбраны</div>';
                    } else {
                        tagDiv.parentNode!.removeChild(tagDiv);
                    }
                },
            }
            this._subscribeEvent(subscription);
        });

        /*
        const addTagButton = this.root.querySelector('.article_edit__add_tag')!;
        subscription = {
            element: addTagButton,
            event: 'click',
            listener: eventBus.tagAdd,
        }
        this._subscribeEvent(subscription);
*/
        const tagSelect = this.root.querySelector('.tag_selector')! as HTMLSelectElement;
        subscription = {
            element: tagSelect,
            event: 'change',
            listener: eventBus.tagAdd,
        }

        this._subscribeEvent(subscription);
    }
}
