import BasicComponentView from "../_basicComponent/basic_component_view.js";
import "../tmpl/openedArticle.tmpl.js";
import {FullArticleData} from "../../common/types";

const covers = [
    "static/img/article_cover_1.jpg",
    "static/img/article_cover_2.jpg",
    "static/img/article_cover_3.jpg",
]

/**
 * @class OpenedArticleView
 */
export default class OpenedArticleView extends BasicComponentView {
    category: string | undefined;
    publisher: string | undefined;

    async render(article: FullArticleData): Promise<HTMLElement> {
        const wrapper = document.createElement('div');
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates['openedArticle.html']({
            title: article.title,
            description: article.description.split('\n'),
            tags: article.tags,
            category: article.category,
            rating: article.rating,
            comments: article.comments,
            publisher: article.publisher.username !== "" ? article.publisher.username : article.publisher.login,
            content: article.content.split('\n'),
            picture: article.coverImgPath !== '' && article.coverImgPath !== undefined ? article.coverImgPath : covers[Math.floor(Math.random() * covers.length)],
        });
        this.publisher = article.publisher.login;
        this.category = article.category;
        return wrapper.querySelector('div')!;
    }
}