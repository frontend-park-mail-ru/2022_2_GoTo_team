import PageView from "../_basic/page_view.js";
import Navbar from "../../components/navbar/navbar.js";
import OpenedArticle from "../../components/opened_article/opened_article.js";
import {CommentaryData, FullArticleData} from "../../common/types";
import CommentaryForm from "../../components/commentary_form/commentary_form.js";
import {CommentaryParent} from "../../common/consts.js";

/**
 * Страница содержит главный компонент - ленту новостей, хедер, сайдбар.
 * @class ArticlePageView
 */
export default class ArticlePageView extends PageView {
    mainContentElement: HTMLElement | undefined;
    commentaryContainer: HTMLElement | undefined;

    /**
     * @param {HTMLElement} root
     */
    constructor(root: HTMLElement) {
        super(root);
    }

    /**
     * Перерисовать главную страницу
     */
    async render(articleData: FullArticleData) {
        await super.render();
        const navbar = new Navbar();
        await navbar.render();
        this.root.appendChild(navbar.root);
        this.children.set('navbar', navbar);

        const rootEl = document.createElement('div');
        rootEl.id = 'root';
        rootEl.classList.add('root');
        this.root.appendChild(rootEl);
        this.root = rootEl;

        this.root.appendChild(document.createElement('div'));

        const mainContentElement = document.createElement('div');
        mainContentElement.classList.add('feed');
        this.mainContentElement = mainContentElement;
        this.root.appendChild(this.mainContentElement);

        const articleView = new OpenedArticle();
        await articleView.render(articleData);
        mainContentElement.appendChild(articleView.root);

        const commentaryContainer = document.createElement('div');
        commentaryContainer.classList.add('box');
        this.commentaryContainer = commentaryContainer;
        this.mainContentElement!.appendChild(this.commentaryContainer);

        const newCommentary = new CommentaryForm();
        console.log(articleData.id);
        const data: CommentaryData = {
            id: 0,
            parentId: articleData.id,
            parentType: CommentaryParent.article,
            rating: 0,
            content: "",
        }
        await newCommentary.render(data);
        commentaryContainer.appendChild(newCommentary.root);
        this.children.set('commentary form', newCommentary);

        this.root.appendChild(document.createElement('div'));
        this.children.set('article', articleView);
    }
}