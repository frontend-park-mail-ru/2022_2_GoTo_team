import BasicComponentView from "../_basicComponent/basicComponentView.js";
import "../tmpl/articleEdit.tmpl.js";
import {EditArticleData} from "../../common/types";

/**
 * @class ArticleEditView
 */
export default class ArticleEditView extends BasicComponentView {
    id: number | undefined;
    update: boolean | undefined;

    render(editData: EditArticleData): HTMLElement {
        const wrapper = document.createElement('div');
        if (editData.article !== undefined) {
            // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
            wrapper.innerHTML = Handlebars.templates['articleEdit.html']({
                title: editData.article.title,
                description: editData.article.description,
                allTags: editData.tags,
                tags: editData.article.tags,
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
            wrapper.innerHTML = Handlebars.templates['articleEdit.html']({
                update: false,
                categories: editData.categories,
                allTags: editData.tags,
            });
            this.update = false;
        }
        return wrapper.querySelector('div')!;
    }
}
