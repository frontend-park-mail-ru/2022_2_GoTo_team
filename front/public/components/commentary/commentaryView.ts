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
            publisher: commentary.publisher!.username !== "" ? commentary.publisher!.username : commentary.publisher!.login,
            publisher_avatar_url: commentary.publisher!.avatar,
            content: commentary.content,
            time: "",
        });

        this.publisher = commentary.publisher!.login;
        return wrapper.querySelector('div')!;
    }
}
