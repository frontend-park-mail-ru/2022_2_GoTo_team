import LoginPage from "../pages/login/loginPage.js";
import Feed from "../pages/feed/feed.js";
import RegistrationPage from "../pages/registration/registrationPage.js";
import UserFeed from "../pages/userFeed/userFeed.js";
import CategoryFeed from "../pages/categoryFeed/categoryFeed.js";
import ArticlePage from "../pages/article/articlePage.js";
import SettingsPage from "../pages/settingsPage/settingsPage.js";
import ArticleEditPage from "../pages/articleEdit/articleEditPage.js";
import {CategoryData, FullArticleData, SearchData, UserHeaderData} from "../common/types";
import SearchPage from "../pages/search/searchPage.js";
import Page from "../pages/_basic/page";
import Page404 from "../pages/page404/page404";
import SubscriptionsFeed from "../pages/subscriptionsFeed/subscriptionsFeed";

const root = document.getElementsByTagName('body')[0];

export class PageLoaders {
    /**
     * Отрисовывает страницу популярных статей
     */
    static feedPage(): Page {
        const page = new Feed(root);
        page.render().then(() => {
            page.subscribe();
        });
        return page;
    }

    /**
     * Отрисовывает страницу логина
     */
    static loginPage(): Page {
        const page = new LoginPage(root);
        page.render().then(() => {
            page.subscribe();
        });
        return page;
    }

    /**
     * Отрисовывает страницу регистрации
     */
    static registrationPage(): Page {
        const page = new RegistrationPage(root);
        page.render().then(() => {
            page.subscribe();
        });
        return page;
    }

    /**
     * Отрисовывает страницу подписок
     */
    static subscriptionFeedPage(): Page {
        const page = new SubscriptionsFeed(root);
        page.render().then(() => {
            page.subscribe();
        });
        return page;
    }

    /**
     * Отрисовывает страницу автора
     */
    static userFeedPage(userHeaderData: UserHeaderData): Page {
        const page = new UserFeed(root);
        page.render(userHeaderData).then(() => {
            page.subscribe();
        });
        return page;
    }

    /**
     * Отрисовывает страницу автора
     */
    static categoryFeedPage(categoryData: CategoryData): Page {
        const page = new CategoryFeed(root);
        page.render(categoryData).then(() => {
            page.subscribe();
        });
        return page;
    }

    /**
     * Отрисовывает страницу просмотра статьи
     */
    static articlePage(article: FullArticleData, comments: boolean): Page {
        const page = new ArticlePage(root);
        page.render({article: article, toComments: comments}).then(() => {
            page.subscribe();
        });
        return page;
    }

    /**
     * Отрисовывает страницу профиля
     */
    static settingsPage(): Page {
        const page = new SettingsPage(root);
        page.render().then(() => {
            page.subscribe();
        });
        return page;
    }

    /**
     * Отрисовывает редактирования/создания статьи
     */
    static editArticle(article?: FullArticleData): Page {
        const page = new ArticleEditPage(root)
        page.render(article).then(() => {
            page.subscribe();
        });
        return page;
    }

    /**
     * Отрисовывает поиск
     */
    static searchPage(searchData: SearchData): Page {
        const page = new SearchPage(root)
        page.render(searchData).then(() => {
            page.subscribe();
        });
        return page;
    }

    /**
     * Отрисовывает страницу ошибки 404
     */
    static error404(): Page {
        const page = new Page404(root);
        page.render().then(() => {
            page.subscribe();
        });
        return page;
    }
}
