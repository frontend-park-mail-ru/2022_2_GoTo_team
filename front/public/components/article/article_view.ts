import "../tmpl/article.tmpl.js";
import BasicComponentView from "../_basic_component/basic_component_view.js";
import {IncompleteArticleData} from "../../common/types";

const covers = [
    "static/img/article_cover_1.jpg",
    "static/img/article_cover_2.jpg",
    "static/img/article_cover_3.jpg",
]

/**
 * @class ArticleView
 */
export default class ArticleView extends BasicComponentView {
    category: string | undefined;
    id: number | undefined;
    publisher: string | undefined;

    /**
     * Перерисовка подконтрольного элемента
     * @param {ArticleData} article
     * @return {HTMLElement}
     */
    async render(article: IncompleteArticleData): Promise<HTMLElement> {
        const wrapper = document.createElement('div');
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates['article.html']({
            title: article.title,
            description: article.description,
            tags: article.tags,
            category: article.category,
            rating: article.rating,
            comments: article.comments,
            publisher: article.publisher.username !== "" ? article.publisher.username : article.publisher.login,
            picture: article.coverImgPath !== '' && typeof article.coverImgPath !== 'undefined' ? article.coverImgPath : covers[Math.floor(Math.random() * covers.length)],
        });

        this.publisher = article.publisher.login;
        this.category = article.category;
        this.id = article.id;
        return wrapper.querySelector('div')!;
    }
}