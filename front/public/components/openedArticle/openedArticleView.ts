import BasicComponentView from "../_basicComponent/basicComponentView.js";
import "../tmpl/openedArticle.tmpl.js";
import {FullArticleData} from "../../common/types";

const covers = [
    "/static/img/article_cover_1.webp",
    "/static/img/article_cover_2.webp",
    "/static/img/article_cover_3.webp",
]

/**
 * @class OpenedArticleView
 */
export default class OpenedArticleView extends BasicComponentView {
    category: string | undefined;
    publisher: string | undefined;
    id: number | undefined;
    data: FullArticleData | undefined;

    render(article: FullArticleData): HTMLElement {
        const wrapper = document.createElement('div');
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates['openedArticle.html']({
            title: article.title,
            description: article.description.split('\n'),
            tags: article.tags.length > 0 ? article.tags.length : undefined ,
            category: article.category,
            rating: article.rating,
            rating_sign: article.rating > 0 ? 1 :( article.rating < 0 ? -1 : 0),
            comments: article.comments,
            publisher: article.publisher.username !== "" ? article.publisher.username : article.publisher.login,
            content: article.content.split('\n'),
            picture: article.coverImgPath !== ''? article.coverImgPath : undefined,
            author: article.publisher.login === window.sessionStorage.getItem('login'),
            avatar: article.avatarImgPath !== '' && article.avatarImgPath !== undefined ? article.avatarImgPath : "/static/img/user_icon.webp",
        });

        const likes = wrapper.querySelectorAll('.like')!;
        const dislikes = wrapper.querySelectorAll('.dislike')!;
        switch (article.likeStatus){
            case 1:
                likes.forEach((like) => {
                    like.setAttribute('data-pressed', 'true');
                });
                break;
            case -1:
                dislikes.forEach((like) => {
                    like.setAttribute('data-pressed', 'true');
                });
                break;
        }

        this.publisher = article.publisher.login;
        this.category = article.category;
        this.id = article.id;
        return wrapper.querySelector('div')!;
    }
}
