import Article_edit_view from "./article_edit_view.js";
import Basic_component from "../_basic_component/basic_component.js";
import {Events} from "../../modules/events.js";

/**
 * View_model-компонент соответсвующего View
 * @class Article_edit
 */
export default class Article_edit extends Basic_component {
    /**
     * Универсальный компонент заголовка
     */
    constructor() {
        super();
        this.view = new Article_edit_view();
    }

    /**
     * Перерисовка подконтрольного элемента
     * @param {Object?} article
     * @property {string} article.title
     * @property {string} article.description
     * @property {string[]} article.tags
     * @property {string} article.category
     * @property {int} article.rating
     * @property {int} article.comments
     * @property {string} article.cover_img_path
     * @property {Object} article.publisher
     * @property {string} article.publisher.username
     * @property {string} article.publisher.login
     * @property {Object} article.co_author
     * @property {string} article.co_author.username
     * @property {string} article.co_author.login
     * @return {HTMLElement}
     */
    render(article) {
        super.render();
        this.root = this.view.render(article);
        return this.root;
    }

    subscribe() {
        super.subscribe();
        const submit_button = this.root.getElementsByClassName('article_edit__save_button')[0];
        const title_form =  this.root.getElementsByClassName('article_edit__title')[0];
        const category_form = this.root.getElementsByClassName('select_menu')[0];
        const description_form =  this.root.getElementsByClassName('article_edit__description')[0];
        const content_form =  this.root.getElementsByClassName('article_edit__content')[0];

        if (this.view.update){
            const article_data = {
                id: this.view.id,
                title: title_form.innerHTML,
                category: category_form.value,
                description: description_form.innerHTML,
                tags: [""],
                content: content_form.innerHTML,
            }

            submit_button.addEventListener('click', () => {
                Events.article_update(article_data);
            });

            const delete_button = this.root.getElementsByClassName('article_edit__delete_button')[0];
            delete_button.addEventListener('click', () => {
                Events.article_remove(this.view.id);
            });
        }else{
            const article_data = {
                title: title_form.innerHTML,
                category: category_form.value,
                description: description_form.innerHTML,
                tags: [''],
                co_author: '',
                content: content_form.innerHTML,
            }

            submit_button.addEventListener('click', () => {
                Events.article_create(article_data);
            });
        }
        submit_button.addEventListener('click', () => {
            Events.go_to_author_feed(this.view.publisher);
        })
    }
};