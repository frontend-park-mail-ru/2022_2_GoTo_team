import {Ajax} from "./ajax.js";

const ajax = new (Ajax);
const config = {
    hrefs: {
        articles: '/feed',
        login: '/session/create',
        signup: '/user/signup',
        session_info: '/session/info',
        session_remove: '/session/remove',
    }
}

export class Requests {
    /**
     * Запрашивает статьи
     * @param {Object[]} articles
     */
    static async get_articles() {
        const articles = await ajax.get({
            url: config.hrefs.articles,
        }).then((response) => {
            console.log(response);
            return response.response.articles
        });
        return articles
    }

    /**
     * Деавторизация
     */
    remove_session() {
        return ajax.post({
            url: config.hrefs.session_remove,
        });
    }
}
