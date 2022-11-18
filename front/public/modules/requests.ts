import Ajax from "./ajax.js";
import {requestParams} from "./ajax"
import {
    CategoryData, FullArticleData,
    IncompleteArticleData,
    RequestAnswer, UserData,
    UserHeaderData,
    UserLoginData,
    UserPlugData,
    UserRegistrationData
} from "../common/types";

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
    static getArticles(): Promise<IncompleteArticleData[]> {
        return Ajax.get({
            url: config.hrefs.articles,
        }).then((response) => {
            const result: RequestAnswer = response!;
            let articles: IncompleteArticleData[] = [];
            result.response.articles.forEach((rawArticle: { id: any; title: any; description: any; tags: any; category: any; rating: any; comments: any; publisher: { login: any; username: any; }; cover_img_path: any; }) => {
                const article: IncompleteArticleData = {
                    id: rawArticle.id,
                    title: rawArticle.title,
                    description: rawArticle.description,
                    tags: rawArticle.tags,
                    category: rawArticle.category,
                    rating: rawArticle.rating,
                    comments: rawArticle.comments,
                    publisher: {
                        login: rawArticle.publisher.login,
                        username: rawArticle.publisher.username,
                    },
                    coverImgPath: "",
                }
                articles.push(article);
            });
            return articles;
        });
    }

    /**
     * Авторизация
     * @param {UserLoginData} userData
     * @return {Promise} Promise со статусом запроса
     */
    static login(userData: UserLoginData): Promise<RequestAnswer> {
        const params: requestParams = {
            url: config.hrefs.login,
            data: {
                "user_data": {
                    "email": userData.email,
                    "password": userData.password
                }
            },
        };

        return Ajax.post(params).then((response) => {
            let result: RequestAnswer = response!;

            if (result.status === 200) {
                result.response = "";
                return result;
            }

            switch (result.response) {
                case "email is not valid":
                    result.response = ResponseErrors.emailInvalid;
                    return result;
                case "password is not valid":
                    result.response = ResponseErrors.passwordInvalid;
                    return result;
                case "incorrect email or password":
                    result.response = ResponseErrors.wrongAuth;
                    return result;
                default:
                    return result;
            }
        });
    }

    /**
     * Регистрация
     * @param {UserRegistrationData} userData
     * @return {Promise} Promise со статусом запроса
     */
    static signup(userData: UserRegistrationData): Promise<RequestAnswer> {
        const params: requestParams = {
            url: config.hrefs.signup,
            data: {
                "new_user_data": {
                    "email": userData.email,
                    "login": userData.login,
                    "username": userData.username,
                    "password": userData.password,
                }
            },
        }

        return Ajax.post(params).then((response) => {
            let result: RequestAnswer = response!;

            if (result.status === 200) {
                result.response = "";
                return result;
            }

            switch (result.response) {
                case "email is not valid":
                    result.response = ResponseErrors.emailInvalid;
                    return result;
                case "login is not valid":
                    result.response = ResponseErrors.loginInvalid;
                    return result;
                case "password is not valid":
                    result.response = ResponseErrors.passwordInvalid;
                    return result;
                case "email exists":
                    result.response = ResponseErrors.emailConflict;
                    return result;
                case "login exists":
                    result.response = ResponseErrors.loginConflict;
                    return result;
                default:
                    return result;
            }
        });

    }

    /**
     * Получение информации пользователя по куке
     * @return {Promise} Promise со статусом и никнеймом
     */
    static getSessionInfo(): Promise<RequestAnswer> {
        return Ajax.get({
            url: config.hrefs.sessionInfo,
        }).then((response) => {
            let result = response!;
            const userData: UserPlugData = {
                username: response!.response.username,
                avatarUrl: "",
            }
            result.response = userData;
            return result;
        });
    }

    /**
     * Деавторизация
     */
    static removeSession(): void {
        Ajax.post({
            url: config.hrefs.sessionRemove,
        });
    }


    /**
     * Информация в шапку страницы автора
     */
    static userHeaderInfo(login: string): Promise<UserHeaderData> {
        return Ajax.get({
            url: config.hrefs.userInfo,
            data: {
                login: login,
            }
        }).then((response) => {
            const result = response!;
            const userData: UserHeaderData = {
                username: result.response.username,
                rating: result.response.rating,
                subscribers: result.response.subscribers_count,
                registration_date: result.response.registration_date,
            };
            return userData;
        });
    }

    /**
     * Запрашивает статьи автора
     * @return {Promise} Promise с массивом статей
     */
    static getUserArticles(login: string): Promise<IncompleteArticleData[]> {
        return Ajax.get({
            url: config.hrefs.userFeed,
            data: {
                login: login,
            }
        }).then((response) => {
            const result: RequestAnswer = response!;
            let articles: IncompleteArticleData[] = [];
            result.response.articles.forEach((rawArticle: { id: any; title: any; description: any; tags: any; category: any; rating: any; comments: any; publisher: { login: any; username: any; }; cover_img_path: any; }) => {
                const article: IncompleteArticleData = {
                    id: rawArticle.id,
                    title: rawArticle.title,
                    description: rawArticle.description,
                    tags: rawArticle.tags,
                    category: rawArticle.category,
                    rating: rawArticle.rating,
                    comments: rawArticle.comments,
                    publisher: {
                        login: rawArticle.publisher.login,
                        username: rawArticle.publisher.username,
                    },
                    coverImgPath: "",
                }
                articles.push(article);
            });
            return articles;
        });
    }

    /**
     * Информация в шапку страницы категории
     */
    static categoryHeaderInfo(category: string): Promise<CategoryData> {
        return Ajax.get({
            url: config.hrefs.categoryInfo,
            data: {
                category: category,
            }
        }).then((response) => {
            const result = response!;
            const categoryData: CategoryData = {
                name: result.response.category_name,
                description: result.response.description,
                subscribers: result.response.subscribers_count,
            };
            return categoryData;
        });
    }

    /**
     * Запрашивает статьи автора
     * @return {Promise} Promise с массивом статей
     */
    static getCategoryArticles(category: string): Promise<IncompleteArticleData[]> {
        return Ajax.get({
            url: config.hrefs.categoryFeed,
            data: {
                category: category,
            }
        }).then((response) => {
            const result: RequestAnswer = response!;
            let articles: IncompleteArticleData[] = [];
            result.response.articles.forEach((rawArticle: { id: any; title: any; description: any; tags: any; category: any; rating: any; comments: any; publisher: { login: any; username: any; }; cover_img_path: any; }) => {
                const article: IncompleteArticleData = {
                    id: rawArticle.id,
                    title: rawArticle.title,
                    description: rawArticle.description,
                    tags: rawArticle.tags,
                    category: rawArticle.category,
                    rating: rawArticle.rating,
                    comments: rawArticle.comments,
                    publisher: {
                        login: rawArticle.publisher.login,
                        username: rawArticle.publisher.username,
                    },
                    coverImgPath: "",
                }
                articles.push(article);
            });
            return articles;
        });
    }

    /**
     * Запрашивает статью по id
     */
    static getArticle(articleId: number): Promise<FullArticleData> {
        return Ajax.get({
            url: config.hrefs.article,
            data: {
                id: articleId,
            }
        }).then((response) => {
            const result: RequestAnswer = response!;
            const article: FullArticleData = {
                id: result.response.id,
                title:  result.response.title,
                description:  result.response.description,
                tags:  result.response.tags,
                category:  result.response.category,
                rating:  result.response.rating,
                comments:  result.response.comments,
                publisher: {
                    login:  result.response.publisher.login,
                    username:  result.response.publisher.username,
                },
                coverImgPath: "",
                content:  result.response.content,
            }
            return article;
        });
    }

    /**
     * Запрашивает данные профиля
     */
    static getProfile(): Promise<UserData> {
        return Ajax.get({
            url: config.hrefs.profile,
        }).then((response) => {
            const result = response!;
            return {
                email: result.response.email,
                login: result.response.login,
                username: result.response.username,
                avatarLink: result.response.avatar_img_path,
            };
        });
    }

    /**
     * Сохраняет настройки профиля
     */
    static saveProfile(userData: UserData): Promise<RequestAnswer> {
        const params: requestParams = {
            url: config.hrefs.saveProfile,
            data: {
                email: userData.email,
                login: userData.login,
                username: userData.username,
                password: userData.password ? userData.password : "",
                avatarImgPath: userData.avatar_link ? userData.avatar_link : "",
            },
        }
        return Ajax.post(params).then((response) => {
            let result = response!;
            if (result.status === 200) {
                result.response = "";
                return result;
            }

            switch (result.response) {
                case "login exists":
                    result.response = ResponseErrors.loginConflict;
                    return result;
                case "email exists":
                    result.response = ResponseErrors.emailConflict;
                    return result;
                case "email is not valid":
                    result.response = ResponseErrors.emailInvalid;
                    return result;
                case "login is not valid":
                    result.response = ResponseErrors.loginInvalid;
                    return result;
                case "password is not valid":
                    result.response = ResponseErrors.passwordInvalid;
                    return result;
                default:
                    return result;
            }
        });
    }

    /**
     * Удаляет статью по id
     */
    static articleRemove(articleId: any) {
        const params: requestParams = {
            url: config.hrefs.articleRemove,
            data: {
                id: articleId
            },
        }
        return Ajax.post(params);
    }

    /**
     * Создаёт статью
     */
    static articleCreate(articleData: any) {
        const params: requestParams = {
            url: config.hrefs.articleCreate,
            data: {
                title: articleData.title,
                description: articleData.description,
                tags: articleData.tags,
                category: articleData.category,
                co_author: articleData.coAuthor,
                content: articleData.content,
            },
        }
        return Ajax.post(params);
    }

    /**
     * Обновляет статью
     */
    static articleUpdate(articleData: any) {
        const params: requestParams = {
            url: config.hrefs.articleUpdate,
            data: {
                id: articleData.id,
                title: articleData.title,
                description: articleData.description,
                tags: articleData.tags,
                category: articleData.category,
                content: articleData.content,
            },
        }
        return Ajax.post(params);
    }

    /**
     * Обновляет статью
     */
    static getCategories() {
        const params: requestParams = {
            url: config.hrefs.categoryList,
        }
        return Ajax.get(params);
    }
}
