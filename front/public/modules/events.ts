import Overlay, {OverlayEventBus} from "../components/overlay/overlay.js";
import LoginForm, {LoginFormEventBus} from "../components/login_form/login_form.js";
import RegistrationForm, {RegistrationFormEventBus} from "../components/registration_form/registration_form.js";
import {Validators} from "./validators.js";
import {Requests} from "./requests.js";
import UserPlug, {UserPlugEventBus} from "../components/user_plug/user_plug.js";
import UserPlugMenu, {UserPlugMenuEventBus} from "../components/user_plug_menu/user_plug_menu.js";
import {PageLoaders} from "./page_loaders.js";
import {FullArticleData, RequestAnswer, UserData, UserPlugData} from "../common/types";
import BasicComponent from "../components/_basic_component/basic_component";
import {ResponseErrors} from "../common/consts.js"


export class Events {
    static #overlayLoginEventBus: LoginFormEventBus = {
        submit: Events.submitLogin,
        goToRegistration: Events.redrawRegistrationOverlay,
        emailValidation: Events.emailValidateListenerLogin,
        passwordValidation: Events.passwordValidateListenerLogin,
        closeForm: Events.closeOverlayListener,
    }

    static #overlayRegistrationEventBus: RegistrationFormEventBus = {
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
    static async openOverlay(): Promise<void> {
        const eventBus: OverlayEventBus = {

        }

        const overlay = new Overlay();
        await overlay.render();

        const root = document.getElementById('root')!;
        root.appendChild(overlay.root);
        await overlay.subscribe(eventBus);
    }

    /**
     * Удаляет оверлей
     */
    static #closeOverlay(): void {
        const overlay = document.getElementById('overlay');
        if (overlay !== null) {
            overlay.parentNode!.removeChild(overlay);
        }
    }

    /**
     * Перерисовывает плашку оверлея на view
     * @param {BasicComponent} controller
     * @param {Object?} eventBus
     */
    static async #changeOverlay(controller: BasicComponent, eventBus?: object): Promise<void> {
        const overlayCenter = document.getElementById('overlay__center')!;
        overlayCenter.innerHTML = '';
        await controller.render();
        overlayCenter.appendChild(controller.root);
        controller.subscribe(eventBus);
    }

    /**
     * Создаёт оверлей с формой логина
     */
    static async makeLoginOverlayListener(): Promise<void> {
        await Events.openOverlay();
        await Events.#changeOverlay(new LoginForm(), Events.#overlayLoginEventBus);

        const auth_button = document.getElementById('navbar__auth_button')!.lastChild!;
        auth_button.removeEventListener('click', Events.makeLoginOverlayListener);
        auth_button.addEventListener('click', Events.closeOverlayListener);
    }

    /**
     * Удаляет оверлей
     */
    static closeOverlayListener(): void {
        Events.#closeOverlay()

        const authButton = document.getElementById('navbar__auth_button')!.lastChild!;
        authButton.removeEventListener('click', Events.closeOverlayListener);
        authButton.addEventListener('click', Events.makeLoginOverlayListener);
    }

    /**
     * Перерисовывает плашку оверлея на логин
     */
    static redrawRegistrationOverlay(): void {
        Events.#changeOverlay(new RegistrationForm(), Events.#overlayRegistrationEventBus);
    }

    /**
     * Перерисовывает плашку оверлея на регистрацию
     */
    static redrawLoginOverlay(): void {
        Events.#changeOverlay(new LoginForm(), Events.#overlayLoginEventBus);
    }

    /**
     * Подтверждение формы логина
     */
    static submitLogin(): void {
        const emailForm: HTMLFormElement = document.getElementById("login_form__email_login")! as HTMLFormElement;
        const passwordForm: HTMLFormElement = document.getElementById("login_form__password")! as HTMLFormElement;

        const userData = {
            email: emailForm.value.trim(),
            password: passwordForm.value.trim(),
        };

        const emailValidation: boolean = Events.emailValidateListenerLogin();
        const passwordValidation: boolean = Events.passwordValidateListenerLogin();

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
                        switch (result.response) {
                            case  ResponseErrors.emailInvalid:
                                Events.#makeInvalid(emailForm, "Неверный формат email");
                                break;
                            case  ResponseErrors.passwordInvalid:
                                Events.#makeInvalid(passwordForm, "Неверный формат пароля");
                                break;
                            case ResponseErrors.wrongAuth:
                                Events.#makeInvalid(form as HTMLFormElement, "Неверный email или пароль");
                                break;
                        }
                        break;
                    default:
                        Events.#makeInvalid(form as HTMLFormElement, "Что-то пошло не так");
                }
            }
        });
    }

    /**
     * Подтверждение формы регистрации
     */
    static submitRegistration(): void {
        const emailForm : HTMLFormElement = document.getElementById("registration_form__email") as HTMLFormElement;
        const loginForm : HTMLFormElement = document.getElementById("registration_form__login") as HTMLFormElement;
        const usernameForm : HTMLFormElement = document.getElementById("registration_form__username") as HTMLFormElement;
        const passwordForm : HTMLFormElement = document.getElementById("registration_form__password") as HTMLFormElement;

        const userData = {
            email: emailForm.value.trim(),
            login: loginForm.value.trim(),
            username: usernameForm.value.trim(),
            password: passwordForm.value.trim()
        };

        const emailValidation : boolean = Events.emailValidateListenerRegistration();
        const loginValidation : boolean = Events.loginValidateListenerRegistration();
        const usernameValidation : boolean = Events.usernameValidateListenerRegistration();
        const passwordValidation : boolean = Events.passwordValidateListenerRegistration();
        const repeatPasswordValidation : boolean = Events.passwordRepeatValidateListenerRegistration();

        if (!(emailValidation && loginValidation && usernameValidation && passwordValidation && passwordValidation && repeatPasswordValidation)) {
            return;
        }

        Requests.signup(userData).then((result) => {
            if (result.status === 200) {
                PageLoaders.feedPage();
            } else {
                switch (result.status) {
                    case 409:
                        switch (result.response) {
                            case ResponseErrors.emailConflict:
                                Events.#makeInvalid(emailForm, "Email занят");
                                break;
                            case ResponseErrors.loginConflict:
                                Events.#makeInvalid(loginForm, "Логин занят");
                                break;
                        }
                        break;
                    case 400:
                        switch (result.response) {
                            case ResponseErrors.emailInvalid:
                                Events.#makeInvalid(emailForm, "Неверный формат email");
                                break;
                            case ResponseErrors.loginInvalid:
                                Events.#makeInvalid(loginForm, "Неверный формат логина");
                                break;
                            case ResponseErrors.passwordInvalid:
                                Events.#makeInvalid(passwordForm, "Неверный формат пароля");
                                break;
                        }
                        break;
                    default:
                        const form = document.getElementById("login-form_inputs-wrapper");
                        Events.#makeInvalid(form as HTMLFormElement, "Что-то пошло не так");
                }
            }
        });
    }

    /**
     * Выводит сообщение message под элементом element
     * @param {HTMLElement} element
     * @param {string} message
     */
    static #makeInvalid(element: HTMLElement, message: string): void {
        Events.#makeValid(element);
        const errorClass = "error-message"
        const siblings = element.parentNode!.childNodes;

        const wrongSign = document.createElement('div');
        wrongSign.innerHTML = `<div class=\"${errorClass}\">${message}</div>`;

        if (typeof (element as HTMLFormElement).setCustomValidity !== 'undefined') {
            (element as HTMLFormElement).setCustomValidity(message);
        }

        for (let i = 0; i < siblings.length; i++) {
            if (siblings[i] === element) {
                if (siblings[i + 1].nodeName === "#text") {
                    element.after(wrongSign);
                    break;
                }
                if (!((siblings[i + 1] as HTMLElement).innerHTML.startsWith(`<div class=\"${errorClass}\">`))) {
                    element.after(wrongSign);
                }
                break;
            }
        }
    }

    /**
     * Убирает невалидность формы element
     * @param {HTMLElement} element
     */
    static #makeValid(element: HTMLElement): void {
        (element as HTMLFormElement).setCustomValidity('');
        const errorClass = "error-message";
        const siblings = element.parentNode!.childNodes;

        for (let i = 0; i < siblings.length; i++) {
            if (siblings[i] === element) {
                if (siblings[i + 1].nodeName === "#text") {
                    break;
                }
                if ((siblings[i + 1] as HTMLElement).innerHTML.startsWith(`<div class=\"${errorClass}\">`)) {
                    element.parentNode!.removeChild(siblings[i + 1]);
                }
                break;
            }
        }
    }

    /**
     * Проверяет валидность значения в поле почты в плашке логина
     */
    static emailValidateListenerLogin(): boolean {
        const emailForm : HTMLFormElement = document.getElementById('login_form__email_login') as HTMLFormElement;

        const email: string = emailForm.value.trim();
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
    static passwordValidateListenerLogin(): boolean {
        const passwordForm : HTMLFormElement = document.getElementById("login_form__password") as HTMLFormElement;

        const password: string = passwordForm.value.trim();
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
    static emailValidateListenerRegistration(): boolean {
        const emailForm : HTMLFormElement = document.getElementById('registration_form__email') as HTMLFormElement;

        const email: string = emailForm.value.trim();
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
    static loginValidateListenerRegistration(): boolean {
        const loginForm : HTMLFormElement = document.getElementById("registration_form__login") as HTMLFormElement;

        const login: string = loginForm.value.trim();
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
    static usernameValidateListenerRegistration(): boolean {
        const usernameForm : HTMLFormElement = document.getElementById("registration_form__username") as HTMLFormElement;

        const username: string = usernameForm.value.trim();
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
    static passwordValidateListenerRegistration(): boolean {
        const passwordForm : HTMLFormElement = document.getElementById("registration_form__password") as HTMLFormElement;

        const password: string = passwordForm.value.trim();
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
    static passwordRepeatValidateListenerRegistration(): boolean {
        const passwordForm : HTMLFormElement = document.getElementById("registration_form__password") as HTMLFormElement;
        const repeatPasswordForm : HTMLFormElement = document.getElementById("registration_form__repeat-password") as HTMLFormElement;

        const password: string = passwordForm.value.trim();
        const repeatPassword: string = repeatPasswordForm.value.trim();
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
    static #getCookie(name: string): string | null {
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
    static #hasSession(): boolean {
        let session = Events.#getCookie("session_id");
        return !(session === "" || session === null);
    }

    /**
     * Обновляет вид кнопки пользователя на навбаре
     */
    static async updateAuth(): Promise<void> {
        const eventBus : UserPlugEventBus = {
            authedListener: Events.showProfileMenuListener,
            unauthedListener: Events.makeLoginOverlayListener,
        }

        const profileButton = document.getElementById("navbar__auth_button")!;
        const userPlug = new UserPlug();
        let promise: Promise<HTMLElement>;

        if (Events.#hasSession()) {
            const response = await Requests.getSessionInfo()
            if (response.status === 200) {
                const userData: UserPlugData = {
                    username: response.response.username,
                    avatarUrl: "",
                }
                promise = userPlug.render(userData);
            } else {
                promise = userPlug.render();
            }
            promise.then(() => {
                profileButton.innerHTML = '';
                profileButton.appendChild(userPlug.root);
                userPlug.subscribe(eventBus);
            })
        } else {
            userPlug.render().then(() => {
                profileButton.innerHTML = '';
                profileButton.appendChild(userPlug.root);
                userPlug.subscribe(eventBus);
            })
        }
    }

    /**
     * Открывает меню пользователя под кнопкой пользователя
     */
    static showProfileMenu(): void {
        const profileMenu = document.getElementById('profile_menu');
        if (profileMenu === null) {
            const userPlugMenu = new UserPlugMenu();
            userPlugMenu.render().then(() => {
                const root = document.getElementById('root')!;
                root.appendChild(userPlugMenu.root);

                const eventBus: UserPlugMenuEventBus = {
                    goToSettings: PageLoaders.settingsPage,
                    unauthorize: Events.profileMenuUnauthorizeListener,
                }
                userPlugMenu.subscribe(eventBus);
            });
        }
    }

    /**
     * Листенер открытия меню пользователя кнопки на навбаре
     */
    static showProfileMenuListener(): void {
        Events.showProfileMenu();

        const profileButton = document.getElementById("navbar__auth_button")!.lastChild!;
        profileButton.removeEventListener('click', Events.showProfileMenuListener);
        profileButton.addEventListener('click', Events.closeProfileMenuListener);
    }

    /**
     * Закрывает меню пользователя под кнопкой пользователя
     */
    static closeProfileMenu(): void {
        const profileMenu = document.getElementById('profile_menu');
        if (profileMenu) {
            const root = document.getElementById('root')!;
            root.removeChild(profileMenu);
        }
    }

    /**
     * Листенер закрытия меню пользователя кнопки на навбаре
     */
    static closeProfileMenuListener(): void {
        Events.closeProfileMenu();

        const profileButton = document.getElementById("navbar__auth_button")!.lastChild!;
        profileButton.removeEventListener('click', Events.closeProfileMenuListener);
        profileButton.addEventListener('click', Events.showProfileMenuListener);
    }

    /**
     * Деавторизация
     */
    static unauthorize(): void {
        Requests.removeSession();
    }

    /**
     * Деавторизация
     */
    static profileMenuUnauthorizeListener(): void {
        Events.unauthorize();
        PageLoaders.feedPage();
    }

    /**
     * Отрисовка страницы популярного
     */
    static goToFeedPage(): void {
        PageLoaders.feedPage();
    }

    /**
     * Отрисовка страницы автора
     */
    static goToAuthorFeed(login: string): void {
        PageLoaders.userFeedPage(login);
    }

    /**
     * Отрисовка страницы автора
     */
    static goToCategoryFeed(category: string): void {
        PageLoaders.categoryFeedPage(category);
    }

    /**
     * Отрисовка страницы просмотра статьи
     */
    static openArticle(articleId: number): void {
        PageLoaders.articlePage(articleId);
    }

    /**
     * Отрисовка страницы профиля
     */
    static goToSettingsPage(): void {
        PageLoaders.settingsPage();
    }

    /**
     * Отправление изменений профиля
     */
    static saveProfileEvent(userData: UserData): Promise<RequestAnswer> {
        return Requests.saveProfile(userData);
    }

    /**
     * Отправление изменений профиля
     */
    static saveProfileListener(): void {
        const emailForm : HTMLFormElement = document.getElementById("settings__email") as HTMLFormElement;
        const loginForm : HTMLFormElement = document.getElementById("settings__login") as HTMLFormElement;
        const usernameForm : HTMLFormElement = document.getElementById("settings__nickname") as HTMLFormElement;
        const passwordForm : HTMLFormElement = document.getElementById("settings__password") as HTMLFormElement;
        const repeatPasswordForm : HTMLFormElement = document.getElementById("settings__repeat_password") as HTMLFormElement;

        const userData = {
            email: emailForm.value.trim(),
            login: loginForm.value.trim(),
            username: usernameForm.value.trim(),
            password: passwordForm.value.trim(),
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

        if (userData.password !== repeatPasswordForm.value.trim()) {
            Events.#makeInvalid(repeatPasswordForm, "Пароли не совпадают");
            return
        }
        Events.#makeValid(repeatPasswordForm);

        //TODO:Загрузка картинки

        Events.saveProfileEvent(userData).then((response) => {
            if (response.status === 200) {
                PageLoaders.settingsPage();
            } else {
                const form = document.getElementById("login-form_inputs-wrapper") as HTMLFormElement;
                switch (response.status) {
                    case 400:
                        switch (response.response) {
                            case ResponseErrors.emailInvalid:
                                Events.#makeInvalid(emailForm, "Неверный формат email");
                                return;
                            case ResponseErrors.loginInvalid:
                                Events.#makeInvalid(loginForm, "Неверный формат логина");
                                return;
                            case ResponseErrors.passwordInvalid:
                                Events.#makeInvalid(passwordForm, "Неверный формат пароля");
                                return;
                        }
                        break;
                    case 409:
                        switch (response.response) {
                            case ResponseErrors.loginConflict:
                                Events.#makeInvalid(loginForm, "Логин занят");
                                return;
                            case ResponseErrors.emailConflict:
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
    static articleCreateListener(): void {
        const titleForm = document.querySelector('.article_edit__title')!;
        const categoryForm = document.querySelector('.select_menu')!;
        const descriptionForm = document.querySelector('.article_edit__description')!;
        const contentForm = document.querySelector('.article_edit__content')!;
        const articleData: FullArticleData = {
            id: 0,
            title: titleForm.textContent ? titleForm.textContent : "",
            category: categoryForm.textContent ? categoryForm.textContent : "",
            description: descriptionForm.textContent ? descriptionForm.textContent : "",
            tags: [''],
            comments: 0,
            rating: 0,
            content: contentForm.textContent ? contentForm.textContent : "",
            coverImgPath: "",
            publisher: {login: "", username: ""},
        };

        Events.articleCreate(articleData);
        PageLoaders.feedPage();
    }

    /**
     * Обработчик изменения статьи
     */
    static articleUpdateListener(articleId: number): void {
        const titleForm = document.querySelector('.article_edit__title')!;
        const categoryForm = document.querySelector('.select_menu')!;
        const descriptionForm = document.querySelector('.article_edit__description')!;
        const contentForm = document.querySelector('.article_edit__content')!;
        const articleData : FullArticleData = {
            id: articleId,
            title: titleForm.textContent ? titleForm.textContent : "",
            category: categoryForm.textContent ? categoryForm.textContent : "",
            description: descriptionForm.textContent ? descriptionForm.textContent : "",
            tags: [''],
            comments: 0,
            rating: 0,
            content: contentForm.textContent ? contentForm.textContent : "",
            coverImgPath: "",
            publisher: {login: "", username: ""},
        };

        Events.articleUpdate(articleData);
    }

    /**
     * Удаление статьи по id
     */
    static articleRemove(articleId: number): Promise<boolean> {
        return Requests.articleRemove(articleId);
    }

    /**
     * Создание статьи
     */
    static articleCreate(articleData: FullArticleData): Promise<boolean>  {
        return Requests.articleCreate(articleData);
    }

    /**
     * Обновление статьи
     */
    static articleUpdate(articleData: FullArticleData): Promise<boolean> {
        return Requests.articleUpdate(articleData);
    }

    /**
     * Проверяет валидность значения в поле почты на странице профиля
     */
    static emailValidateListenerSettings(): boolean {
        const emailForm : HTMLFormElement = document.getElementById('settings__email') as HTMLFormElement;

        const email: string = emailForm.value.trim();
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
     * Проверяет валидность значения в поле логина на странице профиля
     */
    static loginValidateListenerSettings(): boolean {
        const loginForm : HTMLFormElement = document.getElementById("settings__login") as HTMLFormElement;

        const login: string = loginForm.value.trim();
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
     * Проверяет валидность значения в поле ника на странице профиля
     */
    static usernameValidateListenerSettings(): boolean {
        const usernameForm : HTMLFormElement = document.getElementById("settings__nickname") as HTMLFormElement;

        const username: string = usernameForm.value.trim();
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
     * Проверяет валидность значения в поле пароля на странице профиля
     */
    static passwordValidateListenerSettings(): boolean {
        const passwordForm : HTMLFormElement = document.getElementById("settings__password") as HTMLFormElement;

        const password: string = passwordForm.value.trim();
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
     * Проверяет совпаденик значений в полях пароля и повторения пароля на странице профиля
     */
    static passwordRepeatValidateListenerSettings(): boolean {
        const passwordForm : HTMLFormElement = document.getElementById("settings__password") as HTMLFormElement;
        const repeatPasswordForm : HTMLFormElement = document.getElementById("settings__repeat_password") as HTMLFormElement;

        const password: string = passwordForm.value.trim();
        const repeatPassword: string = repeatPasswordForm.value.trim();
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
}