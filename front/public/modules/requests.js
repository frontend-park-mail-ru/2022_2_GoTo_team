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
        user_feed: '/feed/user',
        category_info: '/category/info',
        category_feed: '/feed/category',
        article: '/article',
        profile: '/profile',
        save_profile: '/profile/save',
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
            url: config.hrefs.user_feed,
            data: {
                login: login,
            }
        }).then((response) => {
            return response.response.articles
        });
        return promise;
    }

    /**
     * Информация в шапку страницы категории
     */
    static category_header_info(category) {
        return ajax.get({
            url: config.hrefs.category_info,
            data: {
                category: category,
            }
        }).then((response) => {
            const category_data = {
                name: response.response.category_name,
                description: response.response.description,
                subscribers: response.response.subscribers_count,
            }
            return category_data;
        });
    }

    /**
     * Запрашивает статьи автора
     * @return {Promise} Promise с массивом статей
     */
    static get_category_articles(category) {
        const promise = ajax.get({
            url: config.hrefs.category_feed,
            data: {
                category: category,
            }
        }).then((response) => {
            return response.response.articles;
        });
        return promise;
    }

    /**
     * Запрашивает статью по id
     */
    static get_article(article_id) {
        return ajax.get({
            url: config.hrefs.article,
            data: {
                id: article_id,
            }
        }).then((response) => {
            return response.response;
        });
    }

    /**
     * Запрашивает статью по id
     */
    static get_profile() {
        return ajax.get({
            url: config.hrefs.profile,
        }).then((response) => {
            return {
                email: response.response.email,
                login: response.response.login,
                username: response.response.username,
                avatar_link: response.response.avatar_img_path,
            };
        });
    }

    /**
     * Запрашивает статью по id
     */
    static save_profile(user_data) {
        return ajax.post({
            url: config.hrefs.save_profile,
            body: {
                email: user_data.email,
                login: user_data.login,
                username: user_data.username,
                avatar_img_path: user_data.avatar_link,
            }
        });
    }
}
