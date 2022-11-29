import BasicComponent from "../_basicComponent/basicComponent.js";
import {AdvSearchData, RequestAnswer, Subscription} from "../../common/types";
import AdvancedSearchSidebarView, {AdvSearchFormData} from "./advancedSearchSidebarView.js";
import {Requests} from "../../modules/requests.js";

export type AdvancedSearchSidebarEventBus = {
    addTag: (form: AdvancedSearchSidebar) => void,
    submit: (form: AdvancedSearchSidebar) => void,
}

/**
 * ViewModel-компонент соответсвующего View
 * @class AdvancedSearchSidebar
 */
export default class AdvancedSearchSidebar extends BasicComponent {
    view: AdvancedSearchSidebarView;
    tags: string[];

    /**
     * Универсальный компонент заголовка
     */
    constructor() {
        super();
        this.tags = [];
        this.view = new AdvancedSearchSidebarView();
    }

    /**
     * Перерисовка подконтрольного элемента
     */
    async render(data?: AdvSearchData): Promise<HTMLElement> {
        await super.render();
        const tagsRequest: RequestAnswer = await Requests.getTags();
        let tags: string[] = [];

        if (tagsRequest.status == 200) {
            tags = tagsRequest.response.tags;
        }

        const formData: AdvSearchFormData = {
            tagList: tags,
            advSearchData: data,
        }

        this.root = await this.view.render(formData);
        if (data !== undefined && data.tags !== undefined) {
            this.tags = data.tags;
        }
        return this.root;
    }

    async subscribe(eventBus: AdvancedSearchSidebarEventBus): Promise<void> {
        await super.subscribe();

        this.root.querySelectorAll('.div_textarea').forEach((form: Element) => {
            const newSubscription: Subscription = {
                element: form,
                event: 'focusout',
                listener: () => {
                    if (!form.textContent!.replace(' ', '').length) {
                        form.innerHTML = '';
                    }
                }
            }
            this._subscribeElement(newSubscription);
        });

        const addButton = this.root.querySelector('.advanced_search__sidebar__add_tag')!;
        let newSubscription: Subscription = {
            element: addButton,
            event: 'click',
            listener: () => {
                eventBus.addTag(this);
            },
        }
        this._subscribeElement(newSubscription);

        const submit = this.root.querySelector('.advanced_search__sidebar__apply')!;
        newSubscription = {
            element: submit,
            event: 'click',
            listener: () => {
                eventBus.submit(this);
            },
        }
        this._subscribeElement(newSubscription);

        this.root.querySelectorAll('.article__tag').forEach((tagDiv) => {
            newSubscription = {
                element: tagDiv,
                event: 'click',
                listener: () => {
                    /*
                    const index = this.tags.indexOf(tagDiv.innerHTML);
                    if (index > -1) {
                        this.tags.splice(index, 1);
                    }
                    if (this.tags.length == 0) {
                        tagDiv.parentElement!.innerHTML = '<div class="advanced_search__sidebar__tags__message">Теги не выбраны</div>';
                    }else{
                        tagDiv.parentNode!.removeChild(tagDiv);
                    }
                     */
                    this.tags = [];
                    tagDiv.parentElement!.innerHTML = '<div class="advanced_search__sidebar__tags__message">Теги не выбраны</div>';
                },
            }
            this._subscribeElement(newSubscription);
        });
    }
}