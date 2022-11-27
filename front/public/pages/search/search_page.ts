import {Events} from "../../modules/events.js";
import Page from "../_basic/page.js";
import {NavbarEventBus} from "../../components/navbar/navbar";
import {FullSearchData} from "../../common/types";
import SearchPageView from "./search_page_view.js";
import {SearchHeaderEventBus} from "../../components/search_header/search_header";
import {AdvancedSearchSidebarEventBus} from "../../components/advanced_search/advanced_search_sidebar";
import {URIChanger} from "../../modules/uri_changer.js";
import {Requests} from "../../modules/requests.js";
import Article, {ArticleComponentEventBus} from "../../components/article/article.js";

/**
 * ModalView-контроллер для соответсвующих страниц
 * @class  SearchPage
 */
export default class SearchPage extends Page {
    view: SearchPageView;

    /**
     * Страница содержит главный компонент
     * @param {HTMLElement} root
     */
    constructor(root: HTMLElement) {
        super(root);
        this.view = new SearchPageView(root);
    }

    /**
     * Отобразить подконтрольную страницу.
     * Должен быть вызван render() для обновления.
     */
    async render(data: FullSearchData): Promise<void> {
        data.primary.request = decodeURIComponent(data.primary.request);
        if (typeof data.advanced.author !== 'undefined'){
            data.advanced.author = decodeURIComponent(data.advanced.author);
        }
        await this.view.render(data);

        Requests.search(data).then((articles) => {
            const articleEventBus: ArticleComponentEventBus = {
                goToAuthorFeed: Events.goToAuthorFeed,
                goToCategoryFeed: Events.goToCategoryFeed,
                openArticle: URIChanger.articlePage,
                openTagPage: URIChanger.searchByTagPage,
            }

            if (articles && Array.isArray(articles)) {
                this.view.mainContentElement.innerHTML = '';
                articles.forEach((article) => {
                    const articleView = new Article();
                    articleView.render(article).then(() => {
                        articleView.subscribe(articleEventBus);
                        this.view.mainContentElement.appendChild(articleView.root);
                    });
                })
            }
        });

        Events.updateAuth();
    }

    /**
     * Подписка на связанные события
     */
    async subscribe(): Promise<void> {
        const navbarEventBus: NavbarEventBus = {
            goToHotFeed: URIChanger.feedPage,
            goToNewFeed: URIChanger.feedPage,
            goToSubscribeFeed: URIChanger.feedPage,
            openOtherMenu: Events.showOtherMenuListener,
            openSearch: Events.showSearchForm,
        }

        this.view.children.get('navbar').subscribe(navbarEventBus);

        const headerEventBus: SearchHeaderEventBus = {};
        this.view.children.get('header').subscribe(headerEventBus);

        const sidebarEventBus: AdvancedSearchSidebarEventBus = {
            addTag: Events.addSearchedTagListener,
            submit: Events.submitAdvSearchListener,
        };
        this.view.children.get('sidebar').subscribe(sidebarEventBus);
    }
}