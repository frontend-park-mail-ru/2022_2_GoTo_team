import {Ajax} from "./ajax.js";

const ajax = new (Ajax);
const config = {
    hrefs: {
        articles: '/feed',
        login: '/session/create',
        signup: '/user/signup',
        sessionInfo: '/session/info',
        sessionRemove: '/session/remove',
        userInfo: '/user/info',
        userFeed: '/feed/user',
        categoryInfo: '/category/info',
        categoryFeed: '/feed/category',
        article: '/article',
        profile: '/profile',
        saveProfile: '/profile/update',
        articleRemove: '/article/remove',
        articleCreate: '/article/create',
        articleUpdate: '/article/update',
        categoryList: '/category/list',
    }
}

export class Requests {
    /**
     * Запрашивает статьи
     * @return {Promise} Promise с массивом статей
     */
    static getArticles() {
        const promise = ajax.get({
            url: config.hrefs.articles,
        }).then((response) => {
            return (response as any).response.articles;
        });
        return promise;
    }

    /**
     * Авторизация
     * @param {Object} userData
     * @property {string} email
     * @property {string} password
     * @return {Promise} Promise со статусом запроса
     */
    static login(userData: any) {
        return ajax.post({
            url: config.hrefs.login,
            body: {"user_data": {"email": userData.email, "password": userData.password}}
        }).then((response) => {
            if ((response as any).status === 200){
                return {
    status: (response as any).status,
    body: "",
};
            }
            const errors = {
                email_invalid: "invalid email",
                password_invalid: "invalid password",
                wrong_auth: "wrong email or password",
            }
            switch ((response as any).response){
                case "email is not valid":
                    return {
    status: (response as any).status,
    body: errors.email_invalid,
};
                case "password is not valid":
                    return {
    status: (response as any).status,
    body: errors.password_invalid,
};
                case "incorrect email or password":
                    return {
    status: (response as any).status,
    body: errors.wrong_auth,
};
                default:
                    return {
    status: (response as any).status,
    body: (response as any).response,
};
            }
        });
    }

    /**
     * Регистрация
     * @param {Object} userData
     * @property {string} email
     * @property {string} login
     * @property {string} username
     * @property {string} password
     * @return {Promise} Promise со статусом запроса
     */
    static signup(userData: any) {
        return ajax.post({
            url: config.hrefs.signup,
            body: {
                "new_user_data": {
                    "email": userData.email,
                    "login": userData.login,
                    "username": userData.username,
                    "password": userData.password
                }
            },
        }).then((response) => {
            if ((response as any).status === 200){
                return {
    status: (response as any).status,
    body: "",
};
            }
            const errors = {
                email_invalid: "invalid email",
                login_invalid: "invalid login",
                password_invalid: "invalid password",
                email_conflict: "email exists",
                login_conflict: "login exists",
            }
            switch ((response as any).response){
                case "email is not valid":
                    return {
    status: (response as any).status,
    body: errors.email_invalid,
};
                case "login is not valid":
                    return {
    status: (response as any).status,
    body: errors.login_invalid,
};
                case "password is not valid":
                    return {
    status: (response as any).status,
    body: errors.password_invalid,
};
                case "email exists":
                    return {
    status: (response as any).status,
    body: errors.email_conflict,
};
                case "login exists":
                    return {
    status: (response as any).status,
    body: errors.login_conflict,
};
                default:
                    return {
    status: (response as any).status,
    body: (response as any).response,
};
            }
        });

    }

    /**
     * Получение информации пользователя по куке
     * @return {Promise} Promise со статусом и никнеймом
     */
    static getSessionInfo() {
        return ajax.get({
            url: config.hrefs.sessionInfo,
        });
    }

    /**
     * Деавторизация
     */
    static removeSession() {
        return ajax.post({
            url: config.hrefs.sessionRemove,
        });
    }


    /**
     * Информация в шапку страницы автора
     */
    static userHeaderInfo(login: any) {
        return ajax.get({
            url: config.hrefs.userInfo,
            data: {
                login: login,
            }
        }).then((response) => {
            const userData = {
    username: (response as any).response.username,
    rating: (response as any).response.rating,
    subscribers: (response as any).response.subscribers_count,
    registration_date: (response as any).response.registration_date,
};
            return userData;
        });
    }

    /**
     * Запрашивает статьи автора
     * @return {Promise} Promise с массивом статей
     */
    static getUserArticles(login: any) {
        const promise = ajax.get({
            url: config.hrefs.userFeed,
            data: {
                login: login,
            }
        }).then((response) => {
            return (response as any).response.articles;
        });
        return promise;
    }

    /**
     * Информация в шапку страницы категории
     */
    static categoryHeaderInfo(category: any) {
        return ajax.get({
            url: config.hrefs.categoryInfo,
            data: {
                category: category,
            }
        }).then((response) => {
            const categoryData = {
    name: (response as any).response.category_name,
    description: (response as any).response.description,
    subscribers: (response as any).response.subscribers_count,
};
            return categoryData;
        });
    }

    /**
     * Запрашивает статьи автора
     * @return {Promise} Promise с массивом статей
     */
    static getCategoryArticles(category: any) {
        const promise = ajax.get({
            url: config.hrefs.categoryFeed,
            data: {
                category: category,
            }
        }).then((response) => {
            return (response as any).response.articles;
        });
        return promise;
    }

    /**
     * Запрашивает статью по id
     */
    static getArticle(articleId: any) {
        return ajax.get({
            url: config.hrefs.article,
            data: {
                id: articleId,
            }
        }).then((response) => {
            return (response as any).response;
        });
    }

    /**
     * Запрашивает данные профиля
     */
    static getProfile() {
        return ajax.get({
            url: config.hrefs.profile,
        }).then((response) => {
            return {
    email: (response as any).response.email,
    login: (response as any).response.login,
    username: (response as any).response.username,
    avatarLink: (response as any).response.avatar_img_path,
};
        });
    }

    /**
     * Сохраняет настройки профиля
     */
    static saveProfile(userData: any) {
        return ajax.post({
            url: config.hrefs.saveProfile,
            body: {
                email: userData.email,
                login: userData.login,
                username: userData.username,
                password: userData.password,
                avatarImgPath: userData.avatar_link,
            }
        }).then((result) => {
            if ((result as any).status === 200){
                return {
    status: (result as any).status,
    body: "",
};
            }
            const errors = {
                login_conflict: "login conflict",
                email_conflict: "email conflict",
                email_invalid: "invalid email",
                login_invalid: "invalid login",
                password_invalid: "invalid password",
            }
            switch ((result as any).response){
                case "login exists":
                    return {
    status: (result as any).status,
    body: errors.login_conflict,
};
                case "email exists":
                    return {
    status: (result as any).status,
    body: errors.email_conflict,
};
                case "email is not valid":
                    return {
    status: (result as any).status,
    body: errors.email_invalid,
};
                case "login is not valid":
                    return {
    status: (result as any).status,
    body: errors.login_invalid,
};
                case "password is not valid":
                    return {
    status: (result as any).status,
    body: errors.password_invalid,
};
                default:
                    return {
    status: (result as any).status,
    body: (result as any).response,
};
            }
        });
    }

    /**
     * Удаляет статью по id
     */
    static articleRemove(articleId: any) {
        return ajax.post({
            url: config.hrefs.articleRemove,
            body: {
                id: articleId
            }
        });
    }

    /**
     * Создаёт статью
     */
    static articleCreate(articleData: any) {
        return ajax.post({
            url: config.hrefs.articleCreate,
            body: {
                title: articleData.title,
                description: articleData.description,
                tags: articleData.tags,
                category: articleData.category,
                co_author: articleData.coAuthor,
                content: articleData.content,
            }
        });
    }

    /**
     * Обновляет статью
     */
    static articleUpdate(articleData: any) {
        return ajax.post({
            url: config.hrefs.articleUpdate,
            body: {
                id: articleData.id,
                title: articleData.title,
                description: articleData.description,
                tags: articleData.tags,
                category: articleData.category,
                content: articleData.content,
            }
        });
    }

    /**
     * Обновляет статью
     */
    static getCategories() {
        return (ajax.get({
    url: config.hrefs.categoryList,
}) as any).response;
    }
}
