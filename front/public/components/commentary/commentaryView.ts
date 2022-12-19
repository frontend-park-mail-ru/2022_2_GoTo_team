import "../tmpl/commentary.tmpl.js";
import BasicComponentView from "../_basicComponent/basicComponentView.js";
import {CommentaryData} from "../../common/types";

/**
 * @class ArticleView
 */
export default class CommentaryView extends BasicComponentView {
    publisher: string | undefined;

    render(commentary: CommentaryData): HTMLElement {
        const wrapper = document.createElement('div');
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates['commentary.html']({
            rating: commentary.rating,
            rating_sign: commentary.rating > 0 ? 1 : (commentary.rating < 0 ? -1 : 0),
            publisher: commentary.publisher!.username !== "" ? commentary.publisher!.username : commentary.publisher!.login,
            publisher_avatar_url: commentary.publisher!.avatar,
            content: commentary.content,
            time: "",
        });

        switch (commentary.likeStatus){
            case 1:
                const like = wrapper.querySelector('.like')!;
                like.setAttribute('data-pressed', 'true');
                break;
            case -1:
                const dislike = wrapper.querySelector('.dislike')!;
                dislike.setAttribute('data-pressed', 'true');
                break;
        }

        this.publisher = commentary.publisher!.login;
        return wrapper.querySelector('div')!;
    }
}
