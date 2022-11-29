import BasicComponentView from "../_basicComponent/basicComponentView";
import "../tmpl/opened_article.tmpl.js";
import {FullArticleData} from "../../common/types";
/**
 * @class OpenedArticleView
 */

const covers = [
    "static/img/article_cover_1.jpg",
    "static/img/article_cover_2.jpg",
    "static/img/article_cover_3.jpg",
]
export default class OpenedArticleView extends BasicComponentView {
    category: string | undefined;
    publisher: string | undefined;

    /**
     * Перерисовка подконтрольного элемента
     * @param {FullArticleData} article
     * @return {HTMLElement}
     */
    render(article: FullArticleData): HTMLElement {
        const wrapper = document.createElement('div');
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates['opened_article.html']({
            title: article.title,
            description: article.description,
            tags: article.tags,
            category: article.category,
            rating: article.rating,
            comments: article.comments,
            publisher: article.publisher.username !== "" ? article.publisher.username : article.publisher.login,
            content: article.content,
            picture: article.coverImgPath !== '' && typeof article.coverImgPath !== 'undefined' ? article.coverImgPath : covers[Math.floor(Math.random() * covers.length)],
        });
        this.publisher = article.publisher.login;
        this.category = article.category;
        return wrapper.querySelector('div')!;
    }
}