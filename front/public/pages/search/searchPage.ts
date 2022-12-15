import {Events} from "../../modules/events.js";
import Page from "../_basic/page.js";
import {NavbarEventBus} from "../../components/navbar/navbar";
import {RequestAnswer, SearchData, SearchHeaderData} from "../../common/types";
import SearchPageView from "./searchPageView.js";
import {SearchHeaderEventBus} from "../../components/searchHeader/searchHeader.js";
import {URIChanger} from "../../modules/uriChanger.js";
import {Requests} from "../../modules/requests.js";
import Article, {ArticleComponentEventBus} from "../../components/article/article.js";
import {Helpers} from "../../modules/helpers.js";

/**
 * ModalView-контроллер для соответсвующих страниц
 * @class  SearchPage
 */
export default class SearchPage extends Page {
    view: SearchPageView;

    constructor(root: HTMLElement) {
        super(root);
        this.view = new SearchPageView(root);
    }

    /**
     * Отобразить подконтрольную страницу.
     * Должен быть вызван render() для обновления.
     */
    async render(data: SearchData): Promise<void> {
        Events.scrollUp();
        if ( data.request !== undefined){
            data.request = decodeURIComponent(data.request);
        }

        if (data.author !== undefined){
            data.author = decodeURIComponent(data.author);
        }

        if (data.tags !== undefined){
            const tags: string[] = [];
            data.tags.forEach((tag) => {
                tags.push(decodeURIComponent(tag))
            })
            data.tags = tags;
        }

        const tagsRequest: RequestAnswer = await Requests.getTags();
        let tagList: string[] = [];

        if (tagsRequest.status == 200) {
            tagList = tagsRequest.response.tags;
        }

        const headerData: SearchHeaderData = {
            searchData: data,
            tagList: tagList,
        }
        await this.view.render(headerData);

        console.log(data);

        if(!(data.request === undefined && data.author === undefined && data.tags === undefined)) {
            Requests.search(data).then((articles) => {
                const articleEventBus: ArticleComponentEventBus = {
                    goToAuthorFeed: Events.goToAuthorFeed,
                    goToCategoryFeed: Events.goToCategoryFeed,
                    openArticle: URIChanger.articlePage,
                    openTagPage: URIChanger.searchByTagPage,
                    editArticle: Events.editArticleListener,
                    shareListener: Events.openShareBox,
                }

                let foundNumString: string;
                if (articles.length === 0) {
                    foundNumString = "Результатов не найдено";
                } else {
                    foundNumString = Helpers.numWord(articles.length,
                        ["Найдена", "Найдено", "Найдено"]) + ' ' + articles.length + ' ' + Helpers.numWord(articles.length,
                        ["статья", "статьи", "статей"]);
                }
                document.querySelector('.feed_page__header__subscribers')!.innerHTML = foundNumString;


                if (articles && Array.isArray(articles)) {
                    this.view.mainContentElement!.innerHTML = '';
                    articles.forEach((article) => {
                        const articleView = new Article();
                        articleView.render(article)
                        articleView.subscribe(articleEventBus);
                        this.view.mainContentElement!.appendChild(articleView.root);
                    })
                }
            });
        }

        Events.updateAuth();
    }

    /**
     * Подписка на связанные события
     */
    async subscribe(): Promise<void> {
        const navbarEventBus: NavbarEventBus = {
            goToHotFeed: URIChanger.feedPage,
            //goToNewFeed: URIChanger.feedPage,
            //goToSubscribeFeed: URIChanger.feedPage,
            //openOtherMenu: Events.showOtherMenuListener,
            goToNewArticle: Events.newArticlePageListener,
            openAdvSearch: Events.openAdvSearchListener,
            search: Events.searchFormListener,
        }

        this.view.children.get('navbar')!.subscribe(navbarEventBus);

        const headerEventBus: SearchHeaderEventBus = {
            addTag: Events.addSearchedTagListener,
            submit: Events.submitSearchHeaderListener,
        };
        this.view.children.get('header')!.subscribe(headerEventBus);
    }
}