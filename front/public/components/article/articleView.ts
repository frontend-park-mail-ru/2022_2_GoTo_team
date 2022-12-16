import "../tmpl/article.tmpl.js";
import BasicComponentView from "../_basicComponent/basicComponentView.js";
import {IncompleteArticleData} from "../../common/types";

const covers = [
    "/static/img/article_cover_1.jpg",
    "/static/img/article_cover_2.jpg",
    "/static/img/article_cover_3.jpg",
]

/**
 * @class ArticleView
 */
export default class ArticleView extends BasicComponentView {
    category: string | undefined;
    id: number | undefined;
    publisher: string | undefined;

    render(article: IncompleteArticleData): HTMLElement {
        const wrapper = document.createElement('div');
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates['article.html']({
            baseUrl: this.baseUrl,
            title: article.title,
            description: article.description,
            tags: article.tags,
            category: article.category,
            rating: article.rating,
            comments: article.comments,
            publisher: article.publisher.username !== '' ? article.publisher.username : article.publisher.login,
            picture: article.coverImgPath !== '' && article.coverImgPath !== undefined ? article.coverImgPath : covers[Math.floor(Math.random() * covers.length)],
            author: article.publisher.login === window.sessionStorage.getItem('login'),
            avatar: article.avatarImgPath,
        });

        this.publisher = article.publisher.login;
        this.category = article.category;
        this.id = article.id;
        return wrapper.querySelector('div')!;
    }
}
