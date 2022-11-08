export class Validators {
    /**
     * Проверяет валидность логин
     * @param {string} login
     */
    static validate_login(login) {
        return /^[a-zA-Z][a-zA-Z0-9]{3,}$/.test(login);
    }

    /**
     * Проверяет валидность ника
     * @param {string} username
     */
    static validate_username(username) {
        return true
    }

    /**
     * Проверяет валидность пароля
     * @param {string} password
     */
    static validate_password(password) {
        return /^[a-zA-Z0-9]{4,}$/.test(password);
    }

    /**
     * Проверяет валидность почты
     * @param {string} email
     */
    static validate_email(email) {
        return /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/.test(email);
    }
}