import {Events} from "../../modules/events.js";
import Page from "../_basic/page.js";
import {NavbarEventBus} from "../../components/navbar/navbar";
import {SearchData} from "../../common/types";
import {SearchHeaderEventBus} from "../../components/searchHeader/searchHeader.js";
import {AdvancedSearchSidebarEventBus} from "../../components/advancedSearch/advancedSearchSidebar.js";
import {URIChanger} from "../../modules/uriChanger.js";
import {Requests} from "../../modules/requests.js";
import Article, {ArticleComponentEventBus} from "../../components/article/article.js";
import SearchTagPageView from "./searchTagPageView.js";
import {Helpers} from "../../modules/helpers.js";

/**
 * ModalView-контроллер для соответсвующих страниц
 * @class  SearchTagPage
 */
export default class SearchTagPage extends Page {
    view: SearchTagPageView;

    /**
     * Страница содержит главный компонент
     * @param {HTMLElement} root
     */
    constructor(root: HTMLElement) {
        super(root);
        this.view = new SearchTagPageView(root);
    }

    /**
     * Отобразить подконтрольную страницу.
     * Должен быть вызван render() для обновления.
     */
    async render(data: SearchData): Promise<void> {
        const tag = decodeURIComponent(data.request);
        data.request = 'Поиск по тегу \"' + tag + '\"';
        await this.view.render(data);

        Requests.searchByTag(tag).then((articles) => {
                const articleEventBus: ArticleComponentEventBus = {
                    goToAuthorFeed: Events.goToAuthorFeed,
                    goToCategoryFeed: Events.goToCategoryFeed,
                    openArticle: URIChanger.articlePage,
                    openTagPage: URIChanger.searchByTagPage,
                }

                let foundNumString: string;
                if (articles.length === 0){
                    foundNumString = "Результатов не найдено";
                }else{
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
            }
        );

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
            openSearch: Events.showSearchForm,
        }

        this.view.children.get('navbar')!.subscribe(navbarEventBus);

        const headerEventBus: SearchHeaderEventBus = {};
        this.view.children.get('header')!.subscribe(headerEventBus);

        const sidebarEventBus: AdvancedSearchSidebarEventBus = {
            addTag: Events.addSearchedTagListener,
            submit: Events.submitAdvSearchListener,
        };
        this.view.children.get('sidebar')!.subscribe(sidebarEventBus);
    }
}