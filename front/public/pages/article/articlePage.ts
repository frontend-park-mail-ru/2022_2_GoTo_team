import ArticlePageView from "./articlePageView.js";
import {Requests} from "../../modules/requests.js"
import {Events} from "../../modules/events.js";
import Page from "../_basic/page.js";
import {OpenedArticleEventBus} from "../../components/openedArticle/openedArticle.js";
import {NavbarEventBus} from "../../components/navbar/navbar";
import {URIChanger} from "../../modules/uriChanger.js";
import {CommentaryFormEventBus} from "../../components/commentaryForm/commentaryForm.js";
import {FullArticleData} from "../../common/types";

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

    async render(data: { article: FullArticleData, toComments: boolean }) {
        Events.scrollUp();
        await this.view.render(data.article);
        Events.rerenderCommentaries(data.article.id);
        Events.updateAuth();
        if (data.toComments){
            Events.scrollToComments();
        }
    }

    async subscribe() {
        const navbarEventBus: NavbarEventBus = {
            goToRoot: URIChanger.rootPage,
            goToHotFeed: URIChanger.feedPage,
            //goToNewFeed: URIChanger.feedPage,
            goToSubscribeFeed: URIChanger.subscriptionFeedPage,
            goToNewArticle: Events.newArticlePageListener,
            openAdvSearch: Events.openAdvSearchListener,
            search: Events.searchFormListener,
        }

        const articleEventBus: OpenedArticleEventBus = {
            goToCategoryFeed: Events.goToCategoryFeed,
            goToAuthorFeed: Events.goToAuthorFeed,
            openTagPage: URIChanger.searchByTagPage,
            scrollToComments: Events.scrollToComments,
            editArticle: Events.editArticleListener,
            shareListener: Events.openShareBox,
            likeListener: Events.articleLikeListener,
            openLogin: Events.makeLoginOverlayListener,
        }

        const commentaryFormEventBus: CommentaryFormEventBus = {
            commentaryCreate: Events.createCommentary,
        }

        this.view.children.get('navbar')!.subscribe(navbarEventBus);
        this.view.children.get('article')!.subscribe(articleEventBus);
        this.view.children.get('commentary form')!.subscribe(commentaryFormEventBus);
    }
}