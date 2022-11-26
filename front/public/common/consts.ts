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
    articlePage: /article\/([0-9]+)$/,
    categoryPage: /category\/(.+)$/,
    authorPage: /author\/(.+)$/,
    newArticlePage: /new_article$/,
    articleEditPage: /article\/([0-9]+)\/edit$/,
    searchPage: /search\/([^\/]+)(\/publisher\/([^\/]+))?(\/tags\/(.+))?$/
}

export const APIStrings = {
    root: () => {return ''},
    feedPage: () => {return '/feed'},
    settingsPage: () => {return '/settings'},
    articlePage: (id: number) => {return '/article/' + id},
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

        console.log(uri);
        return uri;
    }
}

export const CommentaryParent = {
    article: "article",
    commentary: "commentary",
}
