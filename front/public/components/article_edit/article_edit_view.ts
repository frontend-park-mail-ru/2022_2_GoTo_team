import BasicComponentView from "../_basic_component/basic_component_view.js";
import "../tmpl/article_edit.tmpl.js";
import {EditArticleData} from "../../common/types";

/**
 * @class ArticleEditView
 */
export default class ArticleEditView extends BasicComponentView {
    id: number | undefined;
    update: boolean | undefined;

    /**
     * Перерисовка подконтрольного элемента
     * @param {EditArticleData} editData
     * @return {HTMLElement}
     */
    async render(editData: EditArticleData): Promise<HTMLElement> {
        const wrapper = document.createElement('div');
        if (typeof editData.article !== 'undefined') {
            // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
            wrapper.innerHTML = Handlebars.templates['article_edit.html']({
                title: editData.article.title,
                description: editData.article.description,
                //tags: editData.article.tags,
                category: editData.article.category,
                // publisher: editData.article.publisher.username !== "" ? editData.article.publisher.username : editData.article.publisher.login,
                content: editData.article.content,
                update: true,
                categories: editData.categories,
            });
            this.id = editData.article.id;
            this.update = true;
        }else{
            // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
            wrapper.innerHTML = Handlebars.templates['article_edit.html']({
                update: false,
                categories: editData.categories,
            });
            this.update = false;
        }
        return wrapper.querySelector('div')!;
    }
}