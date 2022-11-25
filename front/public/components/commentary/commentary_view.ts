import "../tmpl/commentary.tmpl.js";
import BasicComponentView from "../_basic_component/basic_component_view.js";
import {CommentaryData} from "../../common/types";

/**
 * @class ArticleView
 */
export default class CommentaryView extends BasicComponentView {
    publisher: string | undefined;

    /**
     * Перерисовка подконтрольного элемента
     * @param {CommentaryData} commentary
     * @return {HTMLElement}
     */
    async render(commentary: CommentaryData): Promise<HTMLElement> {
        const wrapper = document.createElement('div');
        // @ts-expect-error TS(2304): Cannot find name 'Handlebars'.
        wrapper.innerHTML = Handlebars.templates['commentary.html']({
            rating: commentary.rating,
            publisher: commentary.publisher.username !== "" ? commentary.publisher.username : commentary.publisher.login,
            publisher_avatar_url: commentary.publisher.avatar,
            content: commentary.content,
            time: "",
        });

        this.publisher = commentary.publisher.login;
        return wrapper.querySelector('div')!;
    }
}