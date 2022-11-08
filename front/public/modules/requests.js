import {Ajax} from "./ajax.js";

const ajax = new (Ajax);
const config = {
    hrefs: {
        articles: '/feed',
        login: '/session/create',
        signup: '/user/signup',
        session_info: '/session/info',
        session_remove: '/session/remove',
        user_info: '/user/info',
        user_feed: '/feed/user'
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
     * Регистрация
     * @param {Object} user_data
     * @property {string} email
     * @property {string} login
     * @property {string} username
     * @property {string} password
     * @return {Promise} Promise со статусом запроса
     */
    static signup(user_data) {
        return ajax.post({
            url: config.hrefs.signup,
            body: {
                "new_user_data": {
                    "email": user_data.email,
                    "login": user_data.login,
                    "username": user_data.username,
                    "password": user_data.password
                }
            },
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


    /**
     * Информация в шапку страницы автора
     */
    static user_header_info(login) {
        return ajax.get({
            url: config.hrefs.user_info,
            data: {
                login: login,
            }
        }).then((response) => {
            const user_data = {
                username: response.response.username,
                rating: response.response.rating,
                subscribers: response.response.subscribers_count,
                registration_date: response.response.registration_date,
            }
            return user_data;
        });
    }

    /**
     * Запрашивает статьи автора
     * @return {Promise} Promise с массивом статей
     */
    static get_user_articles(login) {
        const promise = ajax.get({
            url: config.hrefs.articles,
            data: {
                login: login,
            }
        }).then((response) => {
            return response.response.articles
        });
        return promise;
    }
}
