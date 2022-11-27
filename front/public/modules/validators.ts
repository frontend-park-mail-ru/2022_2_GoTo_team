export class Validators {
    /**
     * Проверяет валидность логин
     * @param {string} login
     */
    static validateLogin(login: any) {
        return /^[a-zA-Z][a-zA-Z0-9]{3,}$/.test(login);
    }

    /**
     * Проверяет валидность ника
     * @param {string} username
     */
    static validateUsername(username: any) {
        return true
    }

    /**
     * Проверяет валидность пароля
     * @param {string} password
     */
    static validatePassword(password: any) {
        return /^[a-zA-Z0-9]{4,}$/.test(password);
    }

    /**
     * Проверяет валидность почты
     * @param {string} email
     */
    static validateEmail(email: any) {
        return /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/.test(email);
    }

    /**
     * Проверяет валидность заголовка статьи
     * @param {string} title
     */
    static validateArticleTitle(title: string) {
        return /.+/.test(title);
    }

    /**
     * Проверяет валидность описания статьи
     * @param {string} description
     */
    static validateArticleDescription(description: string) {
        return true;
    }

    /**
     * Проверяет валидность наполнения статьи
     * @param {string} content
     */
    static validateArticleContent(content: string) {
        return /.+/.test(content);
    }

    /**
     * Проверяет валидность комментария
     * @param {string} commentary
     */
    static validateCommentary(commentary: string) {
        return /.+/.test(commentary);
    }
}