import {SearchData} from "./types";

export const ResponseErrors = {
    emailInvalid: "invalid email",
    loginInvalid: "invalid login",
    passwordInvalid: "invalid password",
    emailConflict: "email exists",
    loginConflict: "login exists",
    wrongAuth: "wrong email or password",
}

export const SubscribeErrors = {
    notAuth: "no auth",
    something: "something happened",
}

export const API = {
    root: '',
    feedPage: /feed$/,
    settingsPage: /settings$/,
    articlePage: /article\/([0-9]+)(\?comments)?$/,
    categoryPage: /category\/(.+)$/,
    authorPage: /author\/(.+)$/,
    newArticlePage: /new_article$/,
    articleEditPage: /article\/([0-9]+)\/edit$/,
    searchPage: /search(\/([^\/]+))?(\/publisher\/([^\/]+))?(\/tags\/(.+))?$/,
}

export const APIStrings = {
    root: () => {return ''},
    feedPage: () => {return '/feed'},
    settingsPage: () => {return '/settings'},
    articlePage: (id: number, comments: boolean) => {
        if (comments){
            return '/article/' + id + '?comments';
        }
        return '/article/' + id;
    },
    categoryPage: (name: string) => {return '/category/' + name},
    authorPage: (login: string) => {return '/author/' + login},
    newArticlePage: () => {return '/new_article'},
    articleEditPage: (id: number) => {return '/article/' + id + '/edit/'},
    searchPage: (searchData: SearchData) => {
        let uri = '/search';

        if (typeof searchData.request !== 'undefined'){
            uri += '/' + searchData.request;
        }

        if (typeof searchData.author !== 'undefined'){
            uri += '/publisher/' + searchData.author;
        }

        if (typeof searchData.tags !== 'undefined'){
            uri += '/tags/'
            searchData.tags.forEach((tag) => {
                uri += tag + ',';
            });
            uri = uri.slice(0, -1);
        }

        return uri;
    },
}

export const CommentaryParent = {
    article: "article",
    commentary: "commentary",
}
