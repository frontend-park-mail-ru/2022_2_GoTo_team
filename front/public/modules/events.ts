import Overlay from "../components/overlay/overlay.js";
import LoginForm from "../components/login_form/login_form.js";
import RegistrationForm from "../components/registration_form/registration_form.js";
import {Validators} from "./validators.js";
import {Requests} from "./requests.js";
import Feed from "../pages/feed/feed.js";
import UserPlug from "../components/user_plug/user_plug.js";
import UserPlugMenu from "../components/user_plug_menu/user_plug_menu.js";
import {PageLoaders} from "./page_loaders.js";


export class Events {
    static #overlayLoginEventBus = {
        submit: Events.submitLogin,
        goToRegistration: Events.redrawRegistrationOverlay,
        emailValidation: Events.emailValidateListenerLogin,
        passwordValidation: Events.passwordValidateListenerLogin,
        closeForm: Events.closeOverlayListener,
    }

    static #overlayRegistrationEventBus = {
        submit: Events.submitRegistration,
        goToLogin: Events.redrawLoginOverlay,
        emailValidation: Events.emailValidateListenerRegistration,
        loginValidation: Events.loginValidateListenerRegistration,
        usernameValidation: Events.usernameValidateListenerRegistration,
        passwordValidation: Events.passwordValidateListenerRegistration,
        repeatPasswordValidation: Events.passwordRepeatValidateListenerRegistration,
        closeForm: Events.closeOverlayListener,
    }

    /**
     * Отрисовывает оверлей
     */
    static openOverlay() {
        const overlay = new Overlay();
        overlay.render();
        const root = document.getElementById('root');
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        root.appendChild(overlay.root);
        overlay.subscribe();
    }

    /**
     * Удаляет оверлей
     */
    static #closeOverlay() {
        const overlay = document.getElementById('overlay');
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        overlay.parentNode.removeChild(overlay);
    }

    /**
     * Перерисовывает плашку оверлея на view
     * @param {BasicComponent} controller
     */
    static #changeOverlay(controller: any, eventBus: any) {
        const overlayCenter = document.getElementById('overlay__center');
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        overlayCenter.innerHTML = '';
        controller.render();
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        overlayCenter.appendChild(controller.root);
        controller.subscribe(eventBus);
    }

    /**
     * Создаёт оверлей с формой логина
     */
    static makeLoginOverlayListener() {
        Events.openOverlay();
        Events.#changeOverlay(new LoginForm(), Events.#overlayLoginEventBus);

        // @ts-expect-error TS(2531): Object is possibly 'null'.
        const auth_button = document.getElementById('navbar__auth_button').lastChild;
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        auth_button.removeEventListener('click', Events.makeLoginOverlayListener);
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        auth_button.addEventListener('click', Events.closeOverlayListener);
    }

    /**
     * Удаляет оверлей
     */
    static closeOverlayListener() {
        Events.#closeOverlay()

        // @ts-expect-error TS(2531): Object is possibly 'null'.
        const authButton = document.getElementById('navbar__auth_button').lastChild;
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        authButton.removeEventListener('click', Events.closeOverlayListener);
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        authButton.addEventListener('click', Events.makeLoginOverlayListener);
    }

    /**
     * Перерисовывает плашку оверлея на логин
     */
    static redrawRegistrationOverlay() {
        Events.#changeOverlay(new RegistrationForm(), Events.#overlayRegistrationEventBus);
    }

    /**
     * Перерисовывает плашку оверлея на регистрацию
     */
    static redrawLoginOverlay() {
        Events.#changeOverlay(new LoginForm(), Events.#overlayLoginEventBus);
    }

    /**
     * Подтверждение формы логина
     */
    static submitLogin() {
        const emailForm = document.getElementById("login_form__email_login");
        const passwordForm = document.getElementById("login_form__password");
        const userData = {
    email: (emailForm as any).value.trim(),
    password: (passwordForm as any).value.trim(),
};

        const emailValidation = Events.emailValidateListenerLogin();
        const passwordValidation = Events.passwordValidateListenerLogin();

        if (!(emailValidation && passwordValidation)) {
            return;
        }

        Requests.login(userData).then((result) => {
            if (result.status === 200) {
                Events.updateAuth();
                Events.#closeOverlay();
            } else {
                const form = document.getElementById("login-form_inputs-wrapper");
                switch (result.status) {
                    case 400:
                        switch (result.body) {
                            case "invalid email":
                                Events.#makeInvalid(emailForm, "Неверный формат email");
                                break;
                            case "invalid password":
                                Events.#makeInvalid(passwordForm, "Неверный формат пароля");
                                break;
                            case "wrong email or password":
                                Events.#makeInvalid(form, "Неверный email или пароль");
                                break;
                        }
                        break;
                    default:
                        Events.#makeInvalid(form, "Что-то пошло не так");
                }
            }
        });
    }

    /**
     * Подтверждение формы регистрации
     */
    static submitRegistration() {
        const emailForm = document.getElementById("registration_form__email");
        const loginForm = document.getElementById("registration_form__login");
        const usernameForm = document.getElementById("registration_form__username");
        const passwordForm = document.getElementById("registration_form__password");

        const userData = {
    email: (emailForm as any).value.trim(),
    login: (loginForm as any).value.trim(),
    username: (usernameForm as any).value.trim(),
    password: (passwordForm as any).value.trim()
};

        const emailValidation = Events.emailValidateListenerRegistration();
        const loginValidation = Events.loginValidateListenerRegistration();
        const usernameValidation = Events.usernameValidateListenerRegistration();
        const passwordValidation = Events.passwordValidateListenerRegistration();
        const repeatPasswordValidation = Events.passwordRepeatValidateListenerRegistration();

        if (!(emailValidation && loginValidation && usernameValidation && passwordValidation && passwordValidation && repeatPasswordValidation)) {
            return;
        }

        Requests.signup(userData).then((result) => {
            if (result.status === 200) {
                const root = document.getElementsByTagName('body')[0];
                const page = new Feed(root);
                page.render();
                page.subscribe();
            } else {
                switch (result.status) {
                    case 409:
                        switch (result.body) {
                            case "email exists":
                                Events.#makeInvalid(emailForm, "Email занят");
                                break;
                            case "login exists":
                                Events.#makeInvalid(loginForm, "Логин занят");
                                break;
                        }
                        break;
                    case 400:
                        switch (result.body) {
                            case "invalid email":
                                Events.#makeInvalid(emailForm, "Неверный формат email");
                                break;
                            case "invalid login":
                                Events.#makeInvalid(loginForm, "Неверный формат логина");
                                break;
                            case "invalid password":
                                Events.#makeInvalid(passwordForm, "Неверный формат пароля");
                                break;
                        }
                        break;
                    default:
                        const form = document.getElementById("login-form_inputs-wrapper");
                        Events.#makeInvalid(form, "Что-то пошло не так");
                }
            }
        });
    }

    /**
     * Выводит сообщение message под элементом element
     * @param {HTMLSelectElement} element
     * @param {string} message
     */
    static #makeInvalid(element: any, message: any) {
        const errorClass = "error-message"
        const siblings = element.parentNode.childNodes;
        const wrongSign = document.createElement('div');
        wrongSign.innerHTML = `<div class=\"${errorClass}\">${message}</div>`;
        if (typeof element.setCustomValidity !== 'undefined') {
            element.setCustomValidity(message);
        }

        for (let i = 0; i < siblings.length; i++) {
            if (siblings[i] === element) {
                if (siblings[i + 1].nodeName === "#text") {
                    element.after(wrongSign);
                    break;
                }
                if (!(siblings[i + 1].innerHTML.startsWith(`<div class=\"${errorClass}\">`))) {
                    element.after(wrongSign);
                }
                break;
            }
        }
    }

    /**
     * Убирает невалидность формы element
     * @param {HTMLSelectElement} element
     */
    static #makeValid(element: any) {
        element.setCustomValidity('');
        const errorClass = "error-message";
        const siblings = element.parentNode.childNodes;

        for (let i = 0; i < siblings.length; i++) {
            if (siblings[i] === element) {
                if (siblings[i + 1].nodeName === "#text") {
                    break;
                }
                if (siblings[i + 1].innerHTML.startsWith(`<div class=\"${errorClass}\">`)) {
                    element.parentNode.removeChild(siblings[i + 1]);
                }
                break;
            }
        }
    }

    /**
     * Проверяет валидность значения в поле почты в плашке логина
     */
    static emailValidateListenerLogin() {
        const emailForm = document.getElementById('login_form__email_login');
        const email = (emailForm as any).value.trim();
        if (email === '') {
            Events.#makeValid(emailForm);
            return true;
        }
        if (!Validators.validateEmail(email)) {
            Events.#makeInvalid(emailForm, "Неверный формат email");
            return false;
        }
        Events.#makeValid(emailForm);
        return true;
    }

    /**
     * Проверяет валидность значения в поле пароля в плашке логина
     */
    static passwordValidateListenerLogin() {
        const passwordForm = document.getElementById("login_form__password");
        const password = (passwordForm as any).value.trim();
        if (password === '') {
            Events.#makeValid(passwordForm);
            return true;
        }
        if (!Validators.validatePassword(password)) {
            Events.#makeInvalid(passwordForm, "Неправильный формат пароля");
            return false;
        }
        Events.#makeValid(passwordForm);
        return true;
    }

    /**
     * Проверяет валидность значения в поле почты в плашке регистрации
     */
    static emailValidateListenerRegistration() {
        const emailForm = document.getElementById('registration_form__email');
        const email = (emailForm as any).value.trim();

        if (email === '') {
            Events.#makeValid(emailForm);
            return true;
        }
        if (!Validators.validateEmail(email)) {
            Events.#makeInvalid(emailForm, "Неверный формат email");
            return false;
        }
        Events.#makeValid(emailForm);
        return true;
    }

    /**
     * Проверяет валидность значения в поле логина в плашке регистрации
     */
    static loginValidateListenerRegistration() {
        const loginForm = document.getElementById("registration_form__login");
        const login = (loginForm as any).value.trim();

        if (login === '') {
            Events.#makeValid(loginForm);
            return true;
        }
        if (!Validators.validateLogin(login)) {
            Events.#makeInvalid(loginForm, "Неправильный формат логина");
            return false;
        }
        Events.#makeValid(loginForm);
        return true;
    }

    /**
     * Проверяет валидность значения в поле ника в плашке регистрации
     */
    static usernameValidateListenerRegistration() {
        const usernameForm = document.getElementById("registration_form__username");
        const username = (usernameForm as any).value.trim();

        if (username === '') {
            Events.#makeValid(usernameForm);
            return true;
        }
        if (!Validators.validateUsername(username)) {
            Events.#makeInvalid(usernameForm, "Неправильный формат ника");
            return false;
        }
        Events.#makeValid(usernameForm);
        return true;
    }

    /**
     * Проверяет валидность значения в поле пароля в плашке регистрации
     */
    static passwordValidateListenerRegistration() {
        const passwordForm = document.getElementById("registration_form__password");
        const password = (passwordForm as any).value.trim();

        if (password === '') {
            Events.#makeValid(passwordForm);
            return true;
        }
        if (!Validators.validatePassword(password)) {
            Events.#makeInvalid(passwordForm, "Неправильный формат пароля");
            return false;
        }
        Events.#makeValid(passwordForm);
        return true;
    }

    /**
     * Проверяет совпаденик значений в полях пароля и повторения пароля в плашке регистрации
     */
    static passwordRepeatValidateListenerRegistration() {
        const passwordForm = document.getElementById("registration_form__password");
        const repeatPasswordForm = document.getElementById("registration_form__repeat-password");
        const password = (passwordForm as any).value.trim();
        const repeatPassword = (repeatPasswordForm as any).value.trim();

        if (password === '' || repeatPassword === '') {
            Events.#makeValid(repeatPasswordForm);
            return true;
        }
        if (password !== repeatPassword) {
            Events.#makeInvalid(repeatPasswordForm, "Пароли не совпадают");
            return false;
        }
        Events.#makeValid(repeatPasswordForm);
        return true;
    }

    /**
     * Возвращает значение куки name
     * @param {string} name
     */
    static #getCookie(name: any) {
        let cookieArr = document.cookie.split(";");
        for (let i = 0; i < cookieArr.length; i++) {
            let cookiePair = cookieArr[i].split("=");
            if (name === cookiePair[0].trim()) {
                return decodeURIComponent(cookiePair[1]);
            }
        }
        return null;
    }

    /**
     * Проверяет наличие куки сессии
     */
    static #hasSession() {
        let session = Events.#getCookie("session_id");
        return !(session === "" || session === null);
    }

    /**
     * Обновляет вид кнопки пользователя на навбаре
     */
    static updateAuth() {
        const profileButton = document.getElementById("navbar__auth_button");
        const userPlug = new UserPlug();
        if (Events.#hasSession()) {
            Requests.getSessionInfo().then((response) => {
    if ((response as any).status === 200) {
        userPlug.render({ nickname: (response as any).response.username });
    }
    else {
        // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
        userPlug.render();
    }
    userPlug.subscribe();
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    profileButton.innerHTML = '';
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    profileButton.appendChild(userPlug.root);
});
        }
        // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
        userPlug.render();
        userPlug.subscribe();
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        profileButton.innerHTML = '';
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        profileButton.appendChild(userPlug.root);
    }

    /**
     * Открывает меню пользователя под кнопкой пользователя
     */
    static showProfileMenu() {
        const profileMenu = document.getElementById('profile_menu');
        if (profileMenu === null) {
            const userPlugMenu = new UserPlugMenu();
            userPlugMenu.render();
            const root = document.getElementById('root');
            // @ts-expect-error TS(2531): Object is possibly 'null'.
            root.appendChild(userPlugMenu.root);
            userPlugMenu.subscribe();
        }
    }

    /**
     * Листенер открытия меню пользователя кнопки на навбаре
     */
    static showProfileMenuListener() {
        Events.showProfileMenu()
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        const profileButton = document.getElementById("navbar__auth_button").lastChild;
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        profileButton.removeEventListener('click', Events.showProfileMenuListener);
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        profileButton.addEventListener('click', Events.closeProfileMenuListener);
    }

    /**
     * Закрывает меню пользователя под кнопкой пользователя
     */
    static closeProfileMenu() {
        const profileMenu = document.getElementById('profile_menu');
        if (profileMenu) {
            const root = document.getElementById('root');
            // @ts-expect-error TS(2531): Object is possibly 'null'.
            root.removeChild(profileMenu);
        }
    }

    /**
     * Листенер закрытия меню пользователя кнопки на навбаре
     */
    static closeProfileMenuListener() {
        Events.closeProfileMenu()
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        const profileButton = document.getElementById("navbar__auth_button").lastChild;
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        profileButton.removeEventListener('click', Events.closeProfileMenuListener);
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        profileButton.addEventListener('click', Events.showProfileMenuListener);
    }

    /**
     * Деавторизация
     */
    static unauthorize() {
        Requests.removeSession();
    }

    /**
     * Деавторизация
     */
    static profileMenuUnauthorizeListener() {
        Events.unauthorize();
        PageLoaders.feedPage();
    }

    /**
     * Отрисовка страницы популярного
     */
    static goToFeedPage() {
        PageLoaders.feedPage();
    }

    /**
     * Отрисовка страницы автора
     */
    static goToAuthorFeed(login: any) {
        PageLoaders.userFeedPage(login);
    }

    /**
     * Отрисовка страницы автора
     */
    static goToCategoryFeed(category: any) {
        PageLoaders.categoryFeedPage(category);
    }

    /**
     * Отрисовка страницы просмотра статьи
     */
    static openArticle(articleId: any) {
        PageLoaders.articlePage(articleId);
    }

    /**
     * Отрисовка страницы профиля
     */
    static goToSettingsPage() {
        PageLoaders.settingsPage();
    }

    /**
     * Отправление изменений профиля
     */
    static saveProfileEvent(userData: any) {
        Requests.saveProfile(userData);
    }

    /**
     * Отправление изменений профиля
     */
    static saveProfileListener() {
        const emailForm = document.getElementById("settings__email");
        const loginForm = document.getElementById("settings__login");
        const usernameForm = document.getElementById("settings__nickname");
        const passwordForm = document.getElementById("settings__password");
        const repeatPasswordForm = document.getElementById("settings__repeat_password");

        const userData = {
    email: (emailForm as any).value.trim(),
    login: (loginForm as any).value.trim(),
    username: (usernameForm as any).value.trim(),
    password: (passwordForm as any).value.trim(),
};

        if (!Validators.validateLogin(userData.login)) {
            Events.#makeInvalid(loginForm, "Неправильный формат логина");
            return
        }
        Events.#makeValid(loginForm);

        if (!Validators.validateEmail(userData.email)) {
            Events.#makeInvalid(emailForm, "Неправильный формат почты");
            return
        }
        Events.#makeValid(emailForm);

        if (!Validators.validateUsername(userData.username)) {
            Events.#makeInvalid(usernameForm, "Неправильный формат ника");
            return
        }
        Events.#makeValid(usernameForm);

        if (!Validators.validatePassword(userData.password) && userData.password !== "") {
            Events.#makeInvalid(passwordForm, "Неправильный формат пароля");
            return
        }
        Events.#makeValid(passwordForm);

        if (userData.password !== (repeatPasswordForm as any).value.trim()) {
            Events.#makeInvalid(repeatPasswordForm, "Пароли не совпадают");
            return
        }
        Events.#makeValid(repeatPasswordForm);

        //TODO:Загрузка картинки

        Requests.saveProfile(userData).then((response) => {
            if (response.status === 200) {
                PageLoaders.settingsPage();
            } else {
                const form = document.getElementById("login-form_inputs-wrapper");
                switch (response.status) {
                    case 400:
                        switch (response.body) {
                            case "invalid email":
                                Events.#makeInvalid(emailForm, "Неверный формат email");
                                return;
                            case "invalid login":
                                Events.#makeInvalid(loginForm, "Неверный формат логина");
                                return;
                            case "invalid password":
                                Events.#makeInvalid(passwordForm, "Неверный формат пароля");
                                return;
                        }
                        break;
                    case 409:
                        switch (response.body) {
                            case "login conflict":
                                Events.#makeInvalid(loginForm, "Логин занят");
                                return;
                            case "email conflict":
                                Events.#makeInvalid(emailForm, "Email занят");
                                return;
                        }
                        break;
                    default:
                        Events.#makeInvalid(form, "Что-то пошло не так");
                }
                Events.#makeValid(loginForm);
                Events.#makeValid(emailForm);
            }
        })

    }

    /**
     * Обработчик создания статьи
     */
    static articleCreateListener() {
        const titleForm = document.getElementsByClassName('article_edit__title')[0];
        const categoryForm = document.getElementsByClassName('select_menu')[0];
        const descriptionForm = document.getElementsByClassName('article_edit__description')[0];
        const contentForm = document.getElementsByClassName('article_edit__content')[0];
        const articleData = {
    title: titleForm.textContent,
    category: (categoryForm as any).value,
    description: descriptionForm.textContent,
    tags: [''],
    co_author: '',
    content: contentForm.textContent,
};

        Events.articleCreate(articleData);
        PageLoaders.feedPage();
    }

    /**
     * Обработчик изменения статьи
     */
    static articleUpdateListener(articleId: any) {
        const titleForm = document.getElementsByClassName('article_edit__title')[0];
        const categoryForm = document.getElementsByClassName('select_menu')[0];
        const descriptionForm = document.getElementsByClassName('article_edit__description')[0];
        const contentForm = document.getElementsByClassName('article_edit__content')[0];
        const articleData = {
    id: articleId,
    title: titleForm.textContent,
    category: (categoryForm as any).value,
    description: descriptionForm.textContent,
    tags: [""],
    content: contentForm.textContent,
};

        Events.articleUpdate(articleData);
    }

    /**
     * Удаление статьи по id
     */
    static articleRemove(articleId: any) {
        Requests.articleRemove(articleId);
    }

    /**
     * Создание статьи
     */
    static articleCreate(articleData: any) {
        Requests.articleCreate(articleData);
    }

    /**
     * Обновление статьи
     */
    static articleUpdate(articleData: any) {
        Requests.articleUpdate(articleData);
    }
}