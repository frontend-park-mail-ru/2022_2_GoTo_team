import ArticlePageView from "./article_page_view.js";
import {Requests} from "../../modules/requests.js"
import {Events} from "../../modules/events.js";
import Page from "../_basic/page.js";
import {OpenedArticleEventBus} from "../../components/opened_article/opened_article";
import {NavbarEventBus} from "../../components/navbar/navbar";
import {URIChanger} from "../../modules/uri_changer.js";
import {CommentaryFormEventBus} from "../../components/commentary_form/commentary_form";
import Commentary, {CommentaryComponentEventBus} from "../../components/commentary/commentary.js";
import {CommentaryParent} from "../../common/consts.js";

/**
 * ModalView-контроллер для соответсвующих страниц
 * @class ArticlePage
 */
export default class ArticlePage extends Page {
    view: ArticlePageView;

    /**
     * Страница содержит главный компонент
     * @param {HTMLElement} root
     */
    constructor(root: any) {
        super(root);
        this.view = new ArticlePageView(root);
    }

    /**
     * Отобразить подконтрольную страницу.
     * Должен быть вызван render() для обновления.
     */
    async render(articleId: number) {
        const article = await Requests.getArticle(articleId);
        await this.view.render(article);
        Requests.getCommentaries(articleId).then(async (commentaries) => {
            const renderedCommentaries: Commentary[] = [];
            for (const commentaryData of commentaries) {
                const commentary = new Commentary();
                await commentary.render(commentaryData);
                const eventBus: CommentaryComponentEventBus = {
                    goToAuthorFeed: URIChanger.userFeedPage,
                    showAnswerForm: Events.addCommentaryFormToComment,
                }
                commentary.subscribe(eventBus);
                renderedCommentaries.push(commentary);
            }

            const addToComment = (parent: Commentary, child: Commentary) => {
                const wrapper = parent.root.querySelector('.commentary__reply_box')!;
                wrapper.appendChild(child.root);
            }

            const addedCommentaries: Commentary[] = [];
            renderedCommentaries.forEach((renderedCommentary) => {
                if (renderedCommentary.data!.parentType === CommentaryParent.article) {
                    this.view.children.get('commentary container').appendChild(renderedCommentary);

                    const index = renderedCommentaries.indexOf(renderedCommentary);
                    if (index > -1) {
                        renderedCommentaries.splice(index, 1);
                    }
                    addedCommentaries.push(renderedCommentary);
                } else {
                    for (const addedCommentary of addedCommentaries) {
                        if (renderedCommentary.data!.parentId === addedCommentary.data!.id) {
                            addToComment(addedCommentary, renderedCommentary);

                            const index = renderedCommentaries.indexOf(renderedCommentary);
                            if (index > -1) {
                                renderedCommentaries.splice(index, 1);
                            }
                            addedCommentaries.push(renderedCommentary);
                            break;
                        }
                    }

                }
            })
        })
        Events.updateAuth();
    }

    /**
     * Подписка на связанные события
     */
    async subscribe() {
        const navbarEventBus: NavbarEventBus = {
            goToHotFeed: URIChanger.feedPage,
            //goToNewFeed: URIChanger.feedPage,
            //goToSubscribeFeed: URIChanger.feedPage,
            goToNewArticle: Events.newArticlePageListener,
            //openOtherMenu: Events.showOtherMenuListener,
            openSearch: Events.showSearchForm,
        }

        const articleEventBus: OpenedArticleEventBus = {
            goToCategoryFeed: Events.goToCategoryFeed,
            goToAuthorFeed: Events.goToAuthorFeed,
        }

        const commentaryFormEventBus: CommentaryFormEventBus = {
            commentaryCreate: Events.createCommentary,
        }

        this.view.children.get('navbar').subscribe(navbarEventBus);
        this.view.children.get('article').subscribe(articleEventBus);
        this.view.children.get('commentary form').subscribe(commentaryFormEventBus);
    }
}