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
        go_to_registration: Events.redrawRegistrationOverlay,
        email_validation: Events.emailValidateListenerLogin,
        password_validation: Events.passwordValidateListenerLogin,
        close_form: Events.closeOverlayListener,
    }

    static #overlayRegistrationEventBus = {
        submit: Events.submitRegistration,
        go_to_login: Events.redrawLoginOverlay,
        email_validation: Events.emailValidateListenerLogin,
        login_validation: Events.loginValidateListenerRegistration,
        username_validation: Events.usernameValidateListenerRegistration,
        password_validation: Events.passwordValidateListenerRegistration,
        repeat_password_validation: Events.passwordRepeatValidateListenerRegistration,
        close_form: Events.closeOverlayListener,
    }

    /**
     * Отрисовывает оверлей
     */
    static openOverlay() {
        const overlay = new Overlay();
        overlay.render();
        const root = document.getElementById('root');
        root.appendChild(overlay.root);
        overlay.subscribe();
    }

    /**
     * Удаляет оверлей
     */
    static #closeOverlay() {
        const overlay = document.getElementById('overlay');
        overlay.parentNode.removeChild(overlay);
    }

    /**
     * Перерисовывает плашку оверлея на view
     * @param {BasicComponent} controller
     */
    static #changeOverlay(controller, eventBus) {
        const overlayCenter = document.getElementById('overlay__center');
        overlayCenter.innerHTML = '';
        controller.render();
        overlayCenter.appendChild(controller.root);
        controller.subscribe(eventBus);
    }

    /**
     * Создаёт оверлей с формой логина
     */
    static makeLoginOverlayListener() {
        Events.openOverlay();
        Events.#changeOverlay(new LoginForm(), Events.#overlayLoginEventBus);

        const auth_button = document.getElementById('navbar__auth_button').lastChild;
        auth_button.removeEventListener('click', Events.makeLoginOverlayListener);
        auth_button.addEventListener('click', Events.closeOverlayListener);
    }

    /**
     * Удаляет оверлей
     */
    static closeOverlayListener() {
        Events.#closeOverlay()

        const authButton = document.getElementById('navbar__auth_button').lastChild;
        authButton.removeEventListener('click', Events.closeOverlayListener);
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
            email: emailForm.value.trim(),
            password: passwordForm.value.trim(),
        }

        //Валидация происходит автоматически при анфокусе форм

        Requests.login(userData).then((result) => {
            if (result === 200) {
                const root = document.getElementsByTagName('body')[0];
                const page = new Feed(root);
                page.render();
                page.subscribe();
            } else {
                Events.#makeInvalid(document.getElementById("login-form_inputs-wrapper"), "Что-то пошло не так");
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
            email: emailForm.value.trim(),
            login: loginForm.value.trim(),
            username: usernameForm.value.trim(),
            password: passwordForm.value.trim()
        }

        Events.emailValidateListenerRegistration();
        Events.loginValidateListenerRegistration();
        Events.usernameValidateListenerRegistration();
        Events.passwordValidateListenerRegistration();
        Events.passwordRepeatValidateListenerRegistration();

        Requests.signup(userData).then((result) => {
            if (result === 200) {
                const root = document.getElementsByTagName('body')[0];
                const page = new Feed(root);
                page.render();
                page.subscribe();
            } else {
                if (result.response === 409) {
                    Events.#makeInvalid(emailForm, "Email занят")
                    return;
                }
                const form = document.getElementById("login-form_inputs-wrapper");
                Events.#makeInvalid(form, "Что-то пошло не так");
            }
        });
    }

    /**
     * Выводит сообщение message под элементом element
     * @param {HTMLSelectElement} element
     * @param {string} message
     */
    static #makeInvalid(element, message) {
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
    static #makeValid(element) {
        if (typeof element.setCustomValidity !== 'undefined') {
            element.setCustomValidity('');
        }
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
        const email = emailForm.value.trim();
        if (email === '') {
            return;
        }
        if (!Validators.validateEmail(email)) {
            Events.#makeInvalid(emailForm, "Неверный формат email");
            return;
        }
        Events.#makeValid(emailForm);
    }

    /**
     * Проверяет валидность значения в поле пароля в плашке логина
     */
    static passwordValidateListenerLogin() {
        const passwordForm = document.getElementById("login_form__password");
        const password = passwordForm.value.trim();
        if (password === '') {
            return;
        }
        if (!Validators.validatePassword(password)) {
            Events.#makeInvalid(passwordForm, "Неправильный формат пароля");
            return
        }
        Events.#makeValid(passwordForm);
    }

    /**
     * Проверяет валидность значения в поле почты в плашке регистрации
     */
    static emailValidateListenerRegistration() {
        const emailForm = document.getElementById('registration_form__email');
        const email = emailForm.value.trim();
        if (email === '') {
            return;
        }
        if (!Validators.validateEmail(email)) {
            Events.#makeInvalid(emailForm, "Неверный формат email");
            return;
        }
        Events.#makeValid(emailForm);
    }

    /**
     * Проверяет валидность значения в поле логина в плашке регистрации
     */
    static loginValidateListenerRegistration() {
        const loginForm = document.getElementById("registration_form__login");
        const login = loginForm.value.trim();
        if (login === '') {
            return;
        }
        if (!Validators.validateLogin(login)) {
            Events.#makeInvalid(loginForm, "Неправильный формат логина");
            return
        }
        Events.#makeValid(loginForm);
    }

    /**
     * Проверяет валидность значения в поле ника в плашке регистрации
     */
    static usernameValidateListenerRegistration() {
        const usernameForm = document.getElementById("registration_form__username");
        const username = usernameForm.value.trim();
        if (username === '') {
            return;
        }
        if (!Validators.validateUsername(username)) {
            Events.#makeInvalid(usernameForm, "Неправильный формат ника");
            return
        }
        Events.#makeValid(usernameForm);
    }

    /**
     * Проверяет валидность значения в поле пароля в плашке регистрации
     */
    static passwordValidateListenerRegistration() {
        const passwordForm = document.getElementById("registration_form__password");
        const password = passwordForm.value.trim();
        if (password === '') {
            return;
        }
        if (!Validators.validatePassword(password)) {
            Events.#makeInvalid(passwordForm, "Неправильный формат пароля");
            return
        }
        Events.#makeValid(passwordForm);
    }

    /**
     * Проверяет совпаденик значений в полях пароля и повторения пароля в плашке регистрации
     */
    static passwordRepeatValidateListenerRegistration() {
        const passwordForm = document.getElementById("registration_form__password");
        const repeatPasswordForm = document.getElementById("registration_form__repeat-password");
        const password = passwordForm.value.trim();
        const repeatPassword = repeatPasswordForm.value.trim();
        if (password === '' || repeatPassword === '') {
            return;
        }
        if (password !== repeatPassword) {
            Events.#makeInvalid(repeatPasswordForm, "Пароли не совпадают");
            return
        }
        Events.#makeValid(repeatPasswordForm);
    }

    /**
     * Возвращает значение куки name
     * @param {string} name
     */
    static #getCookie(name) {
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
                if (response.status === 200) {
                    userPlug.render({nickname: response.response.username});
                } else {
                    userPlug.render();
                }
                userPlug.subscribe();
                profileButton.innerHTML = '';
                profileButton.appendChild(userPlug.root);
            });
        }
        userPlug.render();
        userPlug.subscribe();
        profileButton.innerHTML = '';
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
            root.appendChild(userPlugMenu.root);
            userPlugMenu.subscribe();
        }
    }

    /**
     * Листенер открытия меню пользователя кнопки на навбаре
     */
    static showProfileMenuListener() {
        Events.showProfileMenu()
        const profileButton = document.getElementById("navbar__auth_button").lastChild;
        profileButton.removeEventListener('click', Events.showProfileMenuListener);
        profileButton.addEventListener('click', Events.closeProfileMenuListener);
    }

    /**
     * Закрывает меню пользователя под кнопкой пользователя
     */
    static closeProfileMenu() {
        const profileMenu = document.getElementById('profile_menu');
        if (profileMenu) {
            const root = document.getElementById('root');
            root.removeChild(profileMenu);
        }
    }

    /**
     * Листенер закрытия меню пользователя кнопки на навбаре
     */
    static closeProfileMenuListener() {
        Events.closeProfileMenu()
        const profileButton = document.getElementById("navbar__auth_button").lastChild;
        profileButton.removeEventListener('click', Events.closeProfileMenuListener);
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
        Events.closeProfileMenu();
        Events.updateAuth();
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
    static goToAuthorFeed(login) {
        PageLoaders.userFeedPage(login);
    }

    /**
     * Отрисовка страницы автора
     */
    static goToCategoryFeed(category) {
        PageLoaders.categoryFeedPage(category);
    }

    /**
     * Отрисовка страницы просмотра статьи
     */
    static openArticle(articleId) {
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
    static saveProfileEvent(userData) {
        Requests.saveProfile(userData);
    }

    /**
     * Отправление изменений профиля
     */
    static saveProfileListener() {
        const emailForm = document.getElementById("settings__email");
        const loginForm = document.getElementById("settings__login");
        const usernameForm = document.getElementById("settings__nickname");

        const userData = {
            email: emailForm.value.trim(),
            login: loginForm.value.trim(),
            username: usernameForm.value.trim(),
        }

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

        //TODO:Загрузка картинки

        Requests.saveProfile(userData).then((response) => {
            if (response.status === 200) {
                PageLoaders.settingsPage();
            } else {
                if (response.status === 409) {
                    if (response.body === "login conflict"){
                        Events.#makeInvalid(loginForm, "Логин занят");
                    }else{
                        Events.#makeValid(loginForm);
                    }
                    if (response.body === "email conflict"){
                        Events.#makeInvalid(emailForm, "Email занят");
                    }else{
                        Events.#makeValid(emailForm);
                    }
                }
                const form = document.getElementsByClassName("inputs_wrapper")[0];
                Events.#makeInvalid(form, "Что-то пошло не так");
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
            category: categoryForm.value,
            description: descriptionForm.textContent,
            tags: [''],
            co_author: '',
            content: contentForm.textContent,
        }

        Events.articleCreate(articleData);
    }

    /**
     * Обработчик изменения статьи
     */
    static articleUpdateListener(articleId) {
        const titleForm = document.getElementsByClassName('article_edit__title')[0];
        const categoryForm = document.getElementsByClassName('select_menu')[0];
        const descriptionForm =document.getElementsByClassName('article_edit__description')[0];
        const contentForm = document.getElementsByClassName('article_edit__content')[0];
        const articleData = {
            id: articleId,
            title: titleForm.textContent,
            category: categoryForm.value,
            description: descriptionForm.textContent,
            tags: [""],
            content: contentForm.textContent,
        }

        Events.article_update(articleData);
    }

    /**
     * Удаление статьи по id
     */
    static articleRemove(articleId) {
        Requests.articleRemove(articleId);
    }

    /**
     * Создание статьи
     */
    static articleCreate(articleData) {
        Requests.articleCreate(articleData);
    }

    /**
     * Обновление статьи
     */
    static articleUpdate(articleData) {
        Requests.articleUpdate(articleData);
    }
}