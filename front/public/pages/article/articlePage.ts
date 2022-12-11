import ArticlePageView from "./articlePageView.js";
import {Requests} from "../../modules/requests.js"
import {Events} from "../../modules/events.js";
import Page from "../_basic/page.js";
import {OpenedArticleEventBus} from "../../components/openedArticle/openedArticle.js";
import {NavbarEventBus} from "../../components/navbar/navbar";
import {URIChanger} from "../../modules/uriChanger.js";
import {CommentaryFormEventBus} from "../../components/commentaryForm/commentaryForm.js";
import Commentary, {CommentaryComponentEventBus} from "../../components/commentary/commentary.js";
import {CommentaryParent} from "../../common/consts.js";

/**
 * ModalView-контроллер для соответсвующих страниц
 * @class ArticlePage
 */
export default class ArticlePage extends Page {
    view: ArticlePageView;

    constructor(root: HTMLElement) {
        super(root);
        this.view = new ArticlePageView(root);
    }

    async render(data: { articleId: number, toComments: boolean }) {
        Events.scrollUp();
        const article = await Requests.getArticle(data.articleId);
        await this.view.render(article);
        Requests.getCommentaries(data.articleId).then(async (commentaries) => {
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
            const commentariesToCommentaries: Commentary[] = [];
            for (const renderedCommentary of renderedCommentaries) {
                if (renderedCommentary.data!.parentType === CommentaryParent.article) {
                    // @ts-ignore
                    this.view.children.get('commentary container').appendChild(renderedCommentary.root);
                    addedCommentaries.push(renderedCommentary);
                } else {
                    commentariesToCommentaries.push(renderedCommentary);

                }
            }

            while (commentariesToCommentaries.length > 0){
                const buf = commentariesToCommentaries;
                for (const comment of buf){
                    for (const addedCommentary of addedCommentaries){
                        if (addedCommentary.data!.id === comment.data!.parentId){
                            addToComment(addedCommentary, comment);
                            addedCommentaries.push(comment);
                            const index = commentariesToCommentaries.indexOf(comment);
                            if (index > -1) {
                                commentariesToCommentaries.splice(index, 1);
                            }
                        }
                    }
                }
            }
        })
        Events.updateAuth();
        if (data.toComments){
            Events.scrollToComments();
        }
    }

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
            openTagPage: URIChanger.searchByTagPage,
            scrollToComments: Events.scrollToComments,
            editArticle: Events.editArticleListener,
        }

        const commentaryFormEventBus: CommentaryFormEventBus = {
            commentaryCreate: Events.createCommentary,
        }

        this.view.children.get('navbar')!.subscribe(navbarEventBus);
        this.view.children.get('article')!.subscribe(articleEventBus);
        this.view.children.get('commentary form')!.subscribe(commentaryFormEventBus);
    }
}