import "../tmpl/article.tmpl.js";
import BasicComponentView from "../_basicComponent/basicComponentView.js";
import {IncompleteArticleData} from "../../common/types";

const covers = [
    "/static/img/article_cover_1.webp",
    "/static/img/article_cover_2.webp",
    "/static/img/article_cover_3.webp",
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
            rating_sign: article.rating > 0 ? 1 : (article.rating < 0 ? -1 : 0),
            comments: article.comments,
            publisher: article.publisher.username !== '' ? article.publisher.username : article.publisher.login,
            picture: article.coverImgPath !== '' && article.coverImgPath !== undefined ? article.coverImgPath : covers[Math.floor(Math.random() * covers.length)],
            author: article.publisher.login === window.sessionStorage.getItem('login'),
            avatar: article.avatarImgPath !== '' && article.avatarImgPath !== undefined ? article.avatarImgPath : "/static/img/user_icon.webp",
        });

        const like = wrapper.querySelector('.like')!;
        const dislike = wrapper.querySelector('.dislike')!;
        switch (article.likeStatus){
            case 1:
                like.setAttribute('data-pressed', 'true');
                break;
            case -1:
                dislike.setAttribute('data-pressed', 'true');
                break;
        }

        this.publisher = article.publisher.login;
        this.category = article.category;
        this.id = article.id;
        return wrapper.querySelector('div')!;
    }
}
