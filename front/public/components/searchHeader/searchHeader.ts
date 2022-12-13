import BasicComponent from "../_basicComponent/basicComponent.js";
import {SearchHeaderData, Subscription} from "../../common/types";
import SearchHeaderView from "./searchHeaderView.js";

export type SearchHeaderEventBus = {
    addTag: (form: SearchHeader) => void,
    submit: (form: SearchHeader) => void,
}

/**
 * ViewModel-компонент соответсвующего View
 * @class SearchHeader
 */
export default class SearchHeader extends BasicComponent {
    view: SearchHeaderView;
    tags: string[];

    constructor() {
        super();
        this.view = new SearchHeaderView();
        this.tags = [];
    }

   render(searchData: SearchHeaderData): HTMLElement {
        super.render();
        this.root = this.view.render(searchData);
        if (searchData.searchData.tags !== undefined) {
            this.tags = searchData.searchData.tags;
        }
        return this.root;
    }

    subscribe(eventBus: SearchHeaderEventBus) {
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
};
