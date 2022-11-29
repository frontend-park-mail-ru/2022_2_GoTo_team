const Regs = {
    login: /^[a-zA-Z][a-zA-Z0-9]{3,}$/,
    username: /^.*$/,
    password: /^[a-zA-Z0-9]{4,}$/,
    email: /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
    articleTitle: /.+/,
    articleDescription: /^.*$/,
    articleContent: /.+/,
    commentary: /.+/,
}

export class Validators {
    /**
     * Проверяет валидность логин
     */
    static validateLogin(login: string) {
        return Regs.login.test(login);
    }

    /**
     * Проверяет валидность ника
     */
    static validateUsername(username: string) {
        return Regs.username.test(username);
    }

    /**
     * Проверяет валидность пароля
     */
    static validatePassword(password: string) {
        return Regs.password.test(password);
    }

    /**
     * Проверяет валидность почты
     */
    static validateEmail(email: string) {
        return Regs.email.test(email);}

    /**
     * Проверяет валидность заголовка статьи
     */
    static validateArticleTitle(title: string) {
        return Regs.articleTitle.test(title);
    }

    /**
     * Проверяет валидность описания статьи
     */
    static validateArticleDescription(description: string) {
        return Regs.articleDescription.test(description);
    }

    /**
     * Проверяет валидность наполнения статьи
     */
    static validateArticleContent(content: string) {
        return Regs.articleContent.test(content);
    }

    /**
     * Проверяет валидность комментария
     */
    static validateCommentary(commentary: string) {
        return Regs.commentary.test(commentary);
    }
}