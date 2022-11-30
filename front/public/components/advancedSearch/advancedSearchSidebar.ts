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

    constructor() {
        super();
        this.tags = [];
        this.view = new AdvancedSearchSidebarView();
    }

    async render(data?: AdvSearchData): Promise<HTMLElement> {
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

    subscribe(eventBus: AdvancedSearchSidebarEventBus): void {
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
        });

        const addButton = this.root.querySelector('.advanced_search__sidebar__add_tag')!;
        subscription = {
            element: addButton,
            event: 'click',
            listener: () => {
                eventBus.addTag(this);
            },
        }
        this._subscribeEvent(subscription);

        const submit = this.root.querySelector('.advanced_search__sidebar__apply')!;
        subscription = {
            element: submit,
            event: 'click',
            listener: () => {
                eventBus.submit(this);
            },
        }
        this._subscribeEvent(subscription);

        this.root.querySelectorAll('.article__tag').forEach((tagDiv) => {
            subscription = {
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
            this._subscribeEvent(subscription);
        });
    }
}
