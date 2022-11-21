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
    articlePage: /article\/([0-9]*)$/,
    categoryPage: /category\/(.*)$/,
    authorPage: /author\/(.*)$/,
    newArticlePage: /new_article$/,
    articleEditPage: /article\/([0-9]*)\/edit$/,
}