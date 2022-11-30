export const ResponseErrors = {
    emailInvalid: "invalid email",
    loginInvalid: "invalid login",
    passwordInvalid: "invalid password",
    emailConflict: "email exists",
    loginConflict: "login exists",
    wrongAuth: "wrong email or password",
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
    searchPage: /search\/([^\/]+)(\/publisher\/([^\/]+))?(\/tags\/(.+))?$/,
    searchByTagPage: /search\/tag\/([^\/]+)$/,
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
    searchPage: (request: string, author?: string, tags?: string[]) => {
        let uri = '/search/' + request;

        if (typeof author !== 'undefined'){
            uri += '/publisher/' + author;
        }

        if (typeof tags !== 'undefined'){
            uri += '/tags/'
            tags.forEach((tag) => {
                uri += tag + ',';
            });
            uri = uri.slice(0, -1);
        }

        return uri;
    },
    searchByTagPage: (tag: string) => {return '/search/tag/' + tag;}
}

export const CommentaryParent = {
    article: "article",
    commentary: "commentary",
}
