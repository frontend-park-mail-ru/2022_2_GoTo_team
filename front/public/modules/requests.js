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
     * @return {Promise} Promise с массивом статей
     */
    static get_articles() {
        const promise = ajax.get({
            url: config.hrefs.articles,
        }).then((response) => {
            return response.response.articles
        });
        return promise;
    }

    /**
     * Авторизация
     * @param {Object} user_data
     * @property {string} email
     * @property {string} password
     * @return {Promise} Promise со статусом запроса
     */
    static login(user_data) {
        return ajax.post({
            url: config.hrefs.login,
            body: {"user_data": {"email": user_data.email, "password": user_data.password}}
        }).then((response) => {
            return response.status;
        });
    }

    /**
     * Получение информации пользователя по куке
     * @return {Promise} Promise со статусом и никнеймом
     */
    static get_session_info() {
        return ajax.get({
            url: config.hrefs.session_info,
        });
    }

    /**
     * Деавторизация
     */
    static remove_session() {
        return ajax.post({
            url: config.hrefs.session_remove,
        });
    }
}
