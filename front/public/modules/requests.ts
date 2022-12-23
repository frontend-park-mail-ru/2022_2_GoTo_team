import {Ajax} from "./ajax.js";
import {requestParams} from "./ajax"
import {
    CategoryData, CommentaryData, FullArticleData, ImgPostData,
    IncompleteArticleData, LikeData, LikeResponse, NewSubsResponse,
    RequestAnswer, SearchData, UserData,
    UserHeaderData,
    UserLoginData,
    UserPlugData,
    UserRegistrationData
} from "../common/types";

import {categoryCoverFolder, CommentaryParent, ResponseErrors} from "../common/consts.js"

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
        commentaryCreate: '/commentary/create',
        commentaryFeed: '/commentary/feed',
        searchPage: '/search',
        searchTagPage: '/search/tag',
        tagList: '/tag/list',
        articleLike: '/article/like',
        commentaryLike: '/commentary/like',
        subscribeUser: '/user/subscribe',
        subscribeCategory: '/category/subscribe',
        unsubscribeUser: '/user/unsubscribe',
        unsubscribeCategory: '/category/unsubscribe',
        sendProfilePicture: '/file/upload/profile/photo',
        getAvatar: '/user/avatar',
        hasNewSubs: '/feed/subscriptions/has-new-articles-from',
        subscribesFeed: '/api/v1/feed/subscriptions',
    }
}

const ajax = new Ajax();

export class Requests {

    /**
     * Преобразует статьи из запроса в массив IncompleteArticleData
     * @param {any[]} rawArticles т.к. вытаскивается из запроса тип "может быть любым"
     */
    static #parseIncompleteArticles(rawArticles: any[]): Promise<IncompleteArticleData[]>{
        const articles: Promise<IncompleteArticleData>[] = [];
        if (rawArticles) {
            rawArticles.forEach((rawArticle: {
                liked: 1 | 0 | -1;
                id: any; title: any; description: any; tags: any; category: any; rating: any; comments: any; publisher: { login: any; username: any; }; cover_img_path: any; }) => {
                const avatar: Promise<string> = rawArticle.category === "" ? Requests.getProfilePicture(rawArticle.publisher.login) : Promise.resolve(categoryCoverFolder(rawArticle.category));
                articles.push(avatar.then((avatar): IncompleteArticleData => {
                    const article: IncompleteArticleData = {
                        id: rawArticle.id,
                        title: rawArticle.title,
                        description: rawArticle.description,
                        tags: rawArticle.tags,
                        category: rawArticle.category,
                        rating: rawArticle.rating,
                        likeStatus: rawArticle.liked,
                        comments: rawArticle.comments,
                        publisher: {
                            login: rawArticle.publisher.login,
                            username: rawArticle.publisher.username,
                        },
                        coverImgPath: rawArticle.cover_img_path,
                        avatarImgPath: avatar,
                    }
                    return article;
                }));
            });
        }
        return Promise.all(articles);
    }

    /**
     * Запрашивает статьи
     */
    static getArticles(): Promise<IncompleteArticleData[]> {
        return ajax.get({
            url: config.hrefs.articles,
        }).then((response) => {
            const result: RequestAnswer = response!;
            return Requests.#parseIncompleteArticles(result.response.articles);
        });
    }

    /**
     * Авторизация
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

        return ajax.post(params).then((response) => {
            const result: RequestAnswer = response!;

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

        return ajax.post(params).then((response) => {
            const result: RequestAnswer = response!;

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
     */
    static getSessionInfo(): Promise<RequestAnswer> {
        if (window.sessionStorage.getItem('login') !== null) {
            const answer: RequestAnswer = {
                response: {
                    username: window.sessionStorage.getItem('username') === '' ? window.sessionStorage.getItem('login') : window.sessionStorage.getItem('username'),
                    avatarUrl: window.sessionStorage.getItem('avatar'),
                },
                status: 200,
            };
            ajax.get({
                url: config.hrefs.sessionInfo,
            }).then((response) => {
                if (response!.status === 200) {
                    window.sessionStorage.setItem('username', response!.response.username);
                    window.sessionStorage.setItem('login', response!.response.login);
                    window.sessionStorage.setItem('avatar', response!.response.avatar_img_path);
                }
            });
            return Promise.resolve(answer);
        }
        return ajax.get({
            url: config.hrefs.sessionInfo,
        }).then((response) => {
            const result = response!;
            const userData: UserPlugData = {
                username: response!.response.username,
                avatarUrl: response!.response.avatar_img_path,
            }
            if (response!.status === 200) {
                window.sessionStorage.setItem('username', response!.response.username);
                window.sessionStorage.setItem('login', response!.response.login);
                window.sessionStorage.setItem('avatar', response!.response.avatar_img_path);
            }
            result.response = userData;
            return result;
        });
    }

    /**
     * Деавторизация
     */
    static removeSession(): void {
        ajax.post({
            url: config.hrefs.sessionRemove,
        })
        window.sessionStorage.clear();
    }

    /**
     * Запрашивает статьи из подписок
     */
    static getSubscriptionFeed(): Promise<IncompleteArticleData[]> {
        return ajax.get({
            url: config.hrefs.subscribesFeed,
        }).then((response) => {
            const result: RequestAnswer = response!;
            return Requests.#parseIncompleteArticles(result.response.articles);
        });
    }

    /**
     * Информация в шапку страницы автора
     */
    static userHeaderInfo(login: string): Promise<UserHeaderData> {
        return ajax.get({
            url: config.hrefs.userInfo,
            data: {
                login: login,
            }
        }).then((response) => {
            const result = response!;
            if (result.status !== 200) {
                throw result.status;
            }
            return Requests.getProfilePicture(login).then((avatar) => {
                const userData: UserHeaderData = {
                    username: result.response.username,
                    login: login,
                    rating: result.response.rating,
                    subscribers: result.response.subscribers_count,
                    registration_date: result.response.registration_date,
                    subscribed: result.response.subscribed,
                    avatarUrl: avatar,
                };
                return userData;
            })
        });
    }

    /**
     * Запрашивает статьи автора
     */
    static getUserArticles(login: string): Promise<IncompleteArticleData[]> {
        return ajax.get({
            url: config.hrefs.userFeed,
            data: {
                login: login,
            }
        }).then((response) => {
            const result: RequestAnswer = response!;
            return Requests.#parseIncompleteArticles(result.response.articles);
        });
    }

    /**
     * Информация в шапку страницы категории
     */
    static categoryHeaderInfo(category: string): Promise<CategoryData> {
        return ajax.get({
            url: config.hrefs.categoryInfo,
            data: {
                category: category,
            }
        }).then((response) => {
            const result = response!;
            if (result.status !== 200) {
                throw result.status;
            }
            const categoryData: CategoryData = {
                name: result.response.category_name,
                description: result.response.description,
                subscribers: result.response.subscribers_count,
                subscribed: result.response.subscribed,
                avatarImgPath: categoryCoverFolder(result.response.category_name),
            };
            return categoryData;
        });
    }

    /**
     * Запрашивает статьи автора
     */
    static getCategoryArticles(category: string): Promise<IncompleteArticleData[]> {
        return ajax.get({
            url: config.hrefs.categoryFeed,
            data: {
                category: category,
            }
        }).then((response) => {
            const result: RequestAnswer = response!;
            return Requests.#parseIncompleteArticles(result.response.articles);
        });
    }

    /**
     * Запрашивает статью по id
     */
    static getArticle(articleId: number): Promise<FullArticleData> {
        return ajax.get({
            url: config.hrefs.article,
            data: {
                id: articleId,
            }
        }).then((response) => {
            const result: RequestAnswer = response!;
            if (result.status !== 200) {
                throw result.status;
            }
            const avatar: Promise<string> = result.response.category === "" ? Requests.getProfilePicture(result.response.publisher.login) : Promise.resolve(categoryCoverFolder(result.response.category));
            return avatar.then((avatar) => {
                const article: FullArticleData = {
                    id: result.response.id,
                    title: result.response.title,
                    description: result.response.description,
                    tags: result.response.tags,
                    category: result.response.category,
                    rating: result.response.rating,
                    likeStatus: result.response.liked,
                    comments: result.response.comments,
                    publisher: {
                        login: result.response.publisher.login,
                        username: result.response.publisher.username,
                    },
                    coverImgPath: result.response.cover_img_path,
                    content: result.response.content,
                    avatarImgPath: avatar,
                }
                return article;
            })
        });
    }

    /**
     * Запрашивает данные профиля
     */
    static getProfile(): Promise<UserData> {
        return ajax.get({
            url: config.hrefs.profile,
        }).then((response) => {
            const result = response!;
            const data: UserData = {
                email: result.response.email,
                login: result.response.login,
                username: result.response.username,
                avatarUrl: result.response.avatar_img_path,
            }
            return data;
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
                avatar_img_path: userData.avatarUrl ? userData.avatarUrl : "",
            },
        }

        return ajax.post(params).then((response) => {
            const result = response!;
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
    static articleRemove(articleId: number): Promise<boolean> {
        const params: requestParams = {
            url: config.hrefs.articleRemove,
            data: {
                id: articleId
            },
        }

        return ajax.post(params).then((response) => {
            return response!.status === 200;
        });
    }

    /**
     * Создаёт статью
     */
    static articleCreate(articleData: FullArticleData): Promise<boolean> {
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

        return ajax.post(params).then((response) => {
            return response!.status == 200;
        });
    }

    /**
     * Обновляет статью
     */
    static articleUpdate(articleData: FullArticleData): Promise<boolean> {
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

        return ajax.post(params).then((response) => {
            return response!.status == 200;
        });
    }

    /**
     * Получение списка категорий
     */
    static getCategories(): Promise<RequestAnswer> {
        const params: requestParams = {
            url: config.hrefs.categoryList,
        }

        return ajax.get(params).then((response) => {
            return response!;
        });
    }

    /**
     * Получение списка тегов
     */
    static getTags(): Promise<RequestAnswer> {
        const params: requestParams = {
            url: config.hrefs.tagList,
        }

        return ajax.get(params).then((response) => {
            return response!;
        });
    }

    /**
     * Создаёт комментарий
     */
    static commentaryCreate(commentaryData: CommentaryData): Promise<boolean> {
        let params: requestParams;
        if (commentaryData.parentType === CommentaryParent.article) {
            params = {
                url: config.hrefs.commentaryCreate,
                data: {
                    article_id: commentaryData.article,
                    comment_for_comment_id: "",
                    content: commentaryData.content
                },
            }
        } else {
            params = {
                url: config.hrefs.commentaryCreate,
                data: {
                    article_id: commentaryData.article,
                    comment_for_comment_id: "" + commentaryData.parentId,
                    content: commentaryData.content
                },
            }
        }


        return ajax.post(params).then((response) => {
            return response!.status == 200;
        });
    }

    /**
     * Запрос поиска
     */
    static search(searchData: SearchData): Promise<IncompleteArticleData[]> {
        const params = {
            url: config.hrefs.searchPage,
            data: {
                substringToSearch: searchData.request,
                author: searchData.author,
                tag: searchData.tags,
            },
        }

        return ajax.get(params).then((response) => {
            const result: RequestAnswer = response!;
            return Requests.#parseIncompleteArticles(result.response.articles);
        });
    }


    /**
     * Запрос комментариев статьи
     */
    static getCommentaries(articleId: number): Promise<CommentaryData[]> {
        const params = {
            url: config.hrefs.commentaryFeed,
            data: {
                article: articleId,
            },
        }

        return ajax.get(params).then((response) => {
            const result: RequestAnswer = response!;
            const commentaries: Promise<CommentaryData>[] = [];
            result.response.commentaries.forEach((rawCommentary: {
                comment_id: number,
                article_id: number,
                comment_for_comment_id: string
                publisher: {
                    username: string,
                    login: string,
                },
                rating: number,
                liked: -1 | 0 | 1,
                content: string,
            }) => {
                const avatar: Promise<string> = Requests.getProfilePicture(rawCommentary.publisher.login);
                commentaries.push(avatar.then((avatar) => {

                    const commentary: CommentaryData = {
                        article: rawCommentary.article_id,
                        id: rawCommentary.comment_id,
                        parentId: rawCommentary.comment_for_comment_id === '' ? +rawCommentary.article_id : +rawCommentary.comment_for_comment_id,
                        parentType: rawCommentary.comment_for_comment_id === '' ? CommentaryParent.article : CommentaryParent.commentary,
                        publisher: {
                            username: rawCommentary.publisher.username,
                            login: rawCommentary.publisher.login,
                            avatar: avatar,
                        },
                        rating: rawCommentary.rating,
                        likeStatus: rawCommentary.liked,
                        content: rawCommentary.content
                    }
                    return commentary;
                }))
            });
            return Promise.all(commentaries.reverse());
        });
    }

    /**
     * Подписка на категорию
     */
    static categorySubscribe(category: string): Promise<boolean> {
        const params = {
            url: config.hrefs.subscribeCategory,
            data: {
                category_name: category,
            },
        }

        return ajax.post(params).then((response) => {
            return response!.status == 200;
        });
    }

    /**
     * Подписка на пользователя
     */
    static userSubscribe(login: string): Promise<boolean> {
        const params = {
            url: config.hrefs.subscribeUser,
            data: {
                login: login,
            },
        }

        return ajax.post(params).then((response) => {
            return response!.status == 200;
        });
    }

    /**
     * Отписка от категории
     */
    static categoryUnsubscribe(category: string): Promise<boolean> {
        const params = {
            url: config.hrefs.unsubscribeCategory,
            data: {
                category_name: category,
            },
        }

        return ajax.post(params).then((response) => {
            return response!.status == 200;
        });
    }

    /**
     * Отписка от пользователя
     */
    static userUnsubscribe(login: string): Promise<boolean> {
        const params = {
            url: config.hrefs.unsubscribeUser,
            data: {
                login: login,
            },
        }

        return ajax.post(params).then((response) => {
            return response!.status == 200;
        });
    }

    /**
     * Отправляет аватарку пользователя
     */
    static sendProfilePicture(image: File): Promise<boolean> {
        const params: ImgPostData = {
            url: config.hrefs.sendProfilePicture,
            body: image,
        }

        return ajax.postFile(params).then((response) => {
            return response!.status == 200;
        });
    }

    /**
     * Получение пути к аватару по логину
     */
    static getProfilePicture(login: string): Promise<string> {
        const params = {
            url: config.hrefs.getAvatar,
            data: {
                login: login,
            },
        }

        return ajax.get(params).then((response) => {
            return response!.response.avatar_img_path;
        });
    }

    /**
     * Запрос лайка/дизлайка/их снятия со статьи
     */
    static changeArticleLikeStatus(data: LikeData): Promise<LikeResponse> {
        const params = {
            url: config.hrefs.articleLike,
            data: {
                id: data.id,
                sign: data.sign,
            },
        }

        return ajax.post(params).then((response) => {
            if (response!.status == 200){
                const likeResponse: LikeResponse = {
                    status: response!.status,
                    rating: response!.response.rating,
                }
                return likeResponse;
            }
            const likeResponse: LikeResponse = {
                status: response!.status,
                rating: 0,
            }
            return likeResponse;
        });
    }

    /**
     * Запрос лайка/дизлайка/их снятия с комментария
     */
    static changeCommentaryLikeStatus(data: LikeData): Promise<LikeResponse> {
        const params = {
            url: config.hrefs.commentaryLike,
            data: {
                id: data.id,
                sign: data.sign,
            },
        }

        return ajax.post(params).then((response) => {
            if (response!.status == 200){
                const likeResponse: LikeResponse = {
                    status: response!.status,
                    rating: response!.response.rating,
                }
                return likeResponse;
            }
            const likeResponse: LikeResponse = {
                status: response!.status,
                rating: 0,
            }
            return likeResponse;
        });
    }

    /**
     * Запрос id статей из подписок, созданных после указанной
     */
    static hasNewSubs(lastId: number): Promise<NewSubsResponse>{
        const params = {
            url: config.hrefs.hasNewSubs,
            data: {
                articleId: lastId,
            },
        }

        return ajax.get(params).then((response) => {
            const result: NewSubsResponse = {
                status: response!.status,
                ids: response!.response.ids,
            }
            return result
        });
    }
}
