import Overlay, {OverlayEventBus} from "../components/overlay/overlay.js";
import LoginForm, {LoginFormEventBus} from "../components/loginForm/loginForm.js";
import RegistrationForm, {RegistrationFormEventBus} from "../components/registrationForm/registrationForm.js";
import {Validators} from "./validators.js";
import {Requests} from "./requests.js";
import UserPlug, {UserPlugEventBus} from "../components/userPlug/userPlug.js";
import UserPlugMenu, {UserPlugMenuEventBus} from "../components/userPlugMenu/userPlugMenu.js";
import {
    CommentaryData,
    FullArticleData, LikeData, LikeResponse,
    Listener,
    RequestAnswer,
    SearchData, SharingData,
    UserData,
    UserPlugData
} from "../common/types";
import BasicComponent from "../components/_basicComponent/basicComponent.js";
import {CommentaryParent, Url, ResponseErrors} from "../common/consts.js"
import OtherMenu, {OtherMenuEventBus} from "../components/otherMenu/otherMenu.js";
import {URIChanger} from "./uriChanger.js";
import {PageLoaders} from "./pageLoaders.js";
import CommentaryForm, {CommentaryFormEventBus} from "../components/commentaryForm/commentaryForm.js";
import Commentary, {CommentaryComponentEventBus} from "../components/commentary/commentary.js";
import {AlertMessageData} from "../components/alertMessage/alertMessageView";
import AlertMessage, {AlertMessageEventBus} from "../components/alertMessage/alertMessage";
import {ConfirmMessageData} from "../components/confirmMessage/confirmMessageView";
import ConfirmMessage, {ConfirmMessageEventBus} from "../components/confirmMessage/confirmMessage";
import SearchHeader from "../components/searchHeader/searchHeader";
import SharingBox, {SharingBoxEventBus} from "../components/sharingBox/sharingBox";
import {NotificationModule} from "./notifications";
import Page from "../pages/_basic/page";


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
        const eventBus: OverlayEventBus = {}

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
                NotificationModule.longPollSubs();
                if (window.location.href === Url + '/') {
                    PageLoaders.feedPage();
                } else {
                    URIChanger.rootPage();
                }
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
        const emailForm: HTMLFormElement = document.getElementById("registration_form__email") as HTMLFormElement;
        const loginForm: HTMLFormElement = document.getElementById("registration_form__login") as HTMLFormElement;
        const usernameForm: HTMLFormElement = document.getElementById("registration_form__username") as HTMLFormElement;
        const passwordForm: HTMLFormElement = document.getElementById("registration_form__password") as HTMLFormElement;

        const userData = {
            email: emailForm.value.trim(),
            login: loginForm.value.trim(),
            username: usernameForm.value.trim(),
            password: passwordForm.value.trim()
        };

        const emailValidation: boolean = Events.emailValidateListenerRegistration();
        const loginValidation: boolean = Events.loginValidateListenerRegistration();
        const usernameValidation: boolean = Events.usernameValidateListenerRegistration();
        const passwordValidation: boolean = Events.passwordValidateListenerRegistration();
        const repeatPasswordValidation: boolean = Events.passwordRepeatValidateListenerRegistration();

        if (!(emailValidation && loginValidation && usernameValidation && passwordValidation && passwordValidation && repeatPasswordValidation)) {
            return;
        }

        Requests.signup(userData).then((result) => {
            if (result.status === 200) {
                NotificationModule.longPollSubs();
                if (window.location.href === Url + '/') {
                    PageLoaders.feedPage();
                } else {
                    URIChanger.rootPage();
                }
            } else {
                const form = document.getElementById("login-form_inputs-wrapper");
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
                                Events.#makeInvalid(loginForm, "Логин должен начинаться с латинской буквы, может содержать только латинские буквы и цифры и должен быть не короче 3-х символов");
                                break;
                            case ResponseErrors.passwordInvalid:
                                Events.#makeInvalid(passwordForm, "Пароль может содержать только латинские буквы, цифры и спецсимволы !@#$%^&*, а также должен быть не короче 4 символов");
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
     * Выводит сообщение message под элементом element
     * @param {HTMLElement} element
     * @param {string} message
     */
    static #makeInvalid(element: HTMLElement, message: string): void {
        Events.#makeValid(element);
        const errorClass = "error-message"
        const siblings = element.parentNode!.childNodes;

        const wrongSign = document.createElement('div');
        wrongSign.innerHTML = `<div class="${errorClass}">${message}</div>`;

        if (typeof (element as HTMLFormElement).setCustomValidity !== 'undefined') {
            (element as HTMLFormElement).setCustomValidity(message);
        }

        for (let i = 0; i < siblings.length; i++) {
            if (siblings[i] === element) {
                if (siblings[i + 1].nodeName === "#text") {
                    element.after(wrongSign);
                    break;
                }
                if (!((siblings[i + 1] as HTMLElement).innerHTML.startsWith(`<div class="${errorClass}">`))) {
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
        if (typeof (element as HTMLFormElement).setCustomValidity !== 'undefined') {
            (element as HTMLFormElement).setCustomValidity('');
        }
        const errorClass = "error-message";
        const siblings = element.parentNode!.childNodes;

        for (let i = 0; i < siblings.length; i++) {
            if (siblings[i] === element) {
                if (siblings[i + 1].nodeName === "#text") {
                    break;
                }
                if ((siblings[i + 1] as HTMLElement).innerHTML.startsWith(`<div class="${errorClass}">`)) {
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
        const emailForm: HTMLFormElement = document.getElementById('login_form__email_login') as HTMLFormElement;

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
        const passwordForm: HTMLFormElement = document.getElementById("login_form__password") as HTMLFormElement;

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
        const emailForm: HTMLFormElement = document.getElementById('registration_form__email') as HTMLFormElement;

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
        const loginForm: HTMLFormElement = document.getElementById("registration_form__login") as HTMLFormElement;

        const login: string = loginForm.value.trim();
        if (login === '') {
            Events.#makeValid(loginForm);
            return true;
        }
        if (!Validators.validateLogin(login)) {
            Events.#makeInvalid(loginForm, "Логин должен начинаться с латинской буквы, может содержать только латинские буквы и цифры и должен быть не короче 3-х символов");
            return false;
        }
        Events.#makeValid(loginForm);
        return true;
    }

    /**
     * Проверяет валидность значения в поле ника в плашке регистрации
     */
    static usernameValidateListenerRegistration(): boolean {
        const usernameForm: HTMLFormElement = document.getElementById("registration_form__username") as HTMLFormElement;

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
        const passwordForm: HTMLFormElement = document.getElementById("registration_form__password") as HTMLFormElement;

        const password: string = passwordForm.value.trim();
        if (password === '') {
            Events.#makeValid(passwordForm);
            return true;
        }

        if (!Validators.validatePassword(password)) {
            Events.#makeInvalid(passwordForm, "Пароль может содержать только латинские буквы, цифры и спецсимволы !@#$%^&*, а также должен быть не короче 4 символов");
            return false;
        }

        Events.#makeValid(passwordForm);
        return true;
    }

    /**
     * Проверяет совпаденик значений в полях пароля и повторения пароля в плашке регистрации
     */
    static passwordRepeatValidateListenerRegistration(): boolean {
        const passwordForm: HTMLFormElement = document.getElementById("registration_form__password") as HTMLFormElement;
        const repeatPasswordForm: HTMLFormElement = document.getElementById("registration_form__repeat-password") as HTMLFormElement;

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
        const cookieArr = document.cookie.split(";");

        for (let i = 0; i < cookieArr.length; i++) {
            const cookiePair = cookieArr[i].split("=");
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
        const session = Events.#getCookie("session_id");
        return !(session === "" || session === null);
    }

    /**
     * Обновляет вид кнопки пользователя на навбаре
     */
    static async updateAuth(): Promise<void> {
        const eventBus: UserPlugEventBus = {
            authedListener: Events.showProfileMenuListener,
            unauthedListener: Events.makeLoginOverlayListener,
        }

        const profileButton = document.getElementById("navbar__auth_button")!;
        const userPlug = new UserPlug();
        if (Events.#hasSession()) {
            const response = await Requests.getSessionInfo();
            if (response.status === 200) {
                const userData: UserPlugData = {
                    username: response.response.username === "" ? response.response.login : response.response.username,
                    avatarUrl: response.response.avatarUrl,
                }
                userPlug.render(userData);
            } else {
                userPlug.render();
            }
            profileButton.innerHTML = '';
            profileButton.appendChild(userPlug.root);
            userPlug.subscribe(eventBus);
        } else {
            userPlug.render();
            profileButton.innerHTML = '';
            profileButton.appendChild(userPlug.root);
            userPlug.subscribe(eventBus);
        }
    }

    /**
     * Закрывает меню под навбарам
     */
    static #closeNavbarMenu() {
        const root = document.getElementById('root')!;
        const openedMenu: HTMLElement | null = root.querySelector('.navbar_menu');
        if (openedMenu !== null) {
            root.removeChild(openedMenu!);
        }
    }

    /**
     * Открывает меню под навбарам и закрывает открытое, если такая есть
     */
    static #openNavbarMenu(controller: BasicComponent, eventBus?: object) {
        Events.#closeNavbarMenu();

        const root = document.getElementById('root')!;
        controller.render();
        root.appendChild(controller.root);
        controller.subscribe(eventBus);
    }

    /**
     * Открывает меню пользователя под кнопкой пользователя
     */
    static showProfileMenu(): void {
        const eventBus: UserPlugMenuEventBus = {
            goToSettings: URIChanger.settingsPage,
            unauthorize: Events.profileMenuUnauthorizeListener,
            authorPage: URIChanger.userFeedPage,
        }
        Events.#openNavbarMenu(new UserPlugMenu(), eventBus);
    }

    /**
     * Листенер открытия меню пользователя кнопки на навбаре
     */
    static showProfileMenuListener(): void {
        Events.showProfileMenu();

        const profileButton = document.getElementById("navbar__auth_button")!.lastChild!;
        profileButton.removeEventListener('click', Events.showProfileMenuListener);
        profileButton.addEventListener('click', Events.closeProfileMenuListener);

        const otherButton = document.getElementById("navbar__other")!;
        otherButton.removeEventListener('click', Events.closeOtherMenuListener);
        otherButton.addEventListener('click', Events.showOtherMenuListener);
    }

    /**
     * Листенер закрытия меню пользователя кнопки на навбаре
     */
    static closeProfileMenuListener(): void {
        Events.#closeNavbarMenu();

        const profileButton = document.getElementById("navbar__auth_button")!.lastChild!;
        profileButton.removeEventListener('click', Events.closeProfileMenuListener);
        profileButton.addEventListener('click', Events.showProfileMenuListener);
    }

    /**
     * Открывает меню пользователя под кнопкой пользователя
     */
    static showOtherMenu(): void {
        const eventBus: OtherMenuEventBus = {
            newArticle: Events.newArticlePageListener,
        }
        Events.#openNavbarMenu(new OtherMenu(), eventBus);
    }

    /**
     * Листенер открытия меню пользователя кнопки на навбаре
     */
    static showOtherMenuListener(): void {
        Events.showOtherMenu();

        const otherButton = document.getElementById("navbar__other")!;
        otherButton.removeEventListener('click', Events.showOtherMenuListener);
        otherButton.addEventListener('click', Events.closeOtherMenuListener);

        if (document.querySelector('.navbar__profile_block__nickname') !== null) {
            const profileButton = document.getElementById("navbar__auth_button")!.lastChild!;
            profileButton.removeEventListener('click', Events.closeProfileMenuListener);
            profileButton.addEventListener('click', Events.showProfileMenuListener);
        }
    }

    /**
     * Листенер закрытия меню пользователя кнопки на навбаре
     */
    static closeOtherMenuListener(): void {
        Events.#closeNavbarMenu();

        const otherButton = document.getElementById("navbar__other")!;
        otherButton.removeEventListener('click', Events.closeOtherMenuListener);
        otherButton.addEventListener('click', Events.showOtherMenuListener);
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
        URIChanger.feedPage();
        PageLoaders.feedPage();
    }

    /**
     * Отрисовка страницы популярного
     */
    static goToFeedPage(): void {
        URIChanger.feedPage();
    }

    /**
     * Отрисовка страницы автора
     */
    static goToAuthorFeed(login: string): void {
        URIChanger.userFeedPage(login);
    }

    /**
     * Отрисовка страницы автора
     */
    static goToCategoryFeed(category: string): void {
        URIChanger.categoryFeedPage(category);
    }

    /**
     * Отрисовка страницы просмотра статьи
     */
    static openArticle(articleId: number, comments?: boolean): void {
        if (comments === undefined) {
            URIChanger.articlePage(articleId, false);
        } else {
            URIChanger.articlePage(articleId, comments);
        }

    }

    /**
     * Отрисовка страницы профиля
     */
    static goToSettingsPage(): void {
        URIChanger.settingsPage();
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
        const emailForm: HTMLFormElement = document.getElementById("settings__email") as HTMLFormElement;
        const loginForm: HTMLFormElement = document.getElementById("settings__login") as HTMLFormElement;
        const usernameForm: HTMLFormElement = document.getElementById("settings__nickname") as HTMLFormElement;
        const passwordForm: HTMLFormElement = document.getElementById("settings__password") as HTMLFormElement;
        const repeatPasswordForm: HTMLFormElement = document.getElementById("settings__repeat_password") as HTMLFormElement;

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

        const image = document.getElementById('avatar_upload')! as HTMLInputElement;
        if (image.files!.length > 0) {
            Requests.sendProfilePicture(image.files![0]);
        }

    }

    /**
     * Обработчик создания статьи
     */
    static articleCreateListener(): void {
        const titleForm = document.querySelector('.article_edit__title')! as HTMLElement;
        const categoryForm = document.querySelector('.select_menu')! as HTMLSelectElement;
        const descriptionForm = document.querySelector('.article_edit__description')! as HTMLElement;
        const contentForm = document.querySelector('.article_edit__content')! as HTMLElement;

        const title: string = titleForm.textContent!;
        const description: string = descriptionForm.textContent!;
        const content: string = contentForm.textContent!;

        const titleValidation: boolean = Validators.validateArticleTitle(title.trim());
        const descriptionValidation: boolean = Validators.validateArticleDescription(description.trim());
        const contentValidation: boolean = Validators.validateArticleContent(content.trim());

        if (!titleValidation) {
            Events.#makeInvalid(titleForm, "Необходим заголовок");
        }

        if (!descriptionValidation) {
            Events.#makeInvalid(descriptionForm, "Неверное описание");
        }

        if (!contentValidation) {
            Events.#makeInvalid(contentForm, "Вы не можте сохранить пустую статью");
        }

        if (!(titleValidation && contentValidation && contentValidation)) {
            return;
        }

        Events.#makeValid(titleForm);
        Events.#makeValid(descriptionForm);
        Events.#makeValid(contentForm);

        const tags: string[] = [];
        document.querySelectorAll('.article__tag').forEach((tagDiv) => {
            tags.push(tagDiv.innerHTML);
        });


        const articleData: FullArticleData = {
            id: 0,
            title: titleForm.textContent ? titleForm.textContent : "",
            category: categoryForm.value,
            description: descriptionForm.textContent ? descriptionForm.textContent : "",
            tags: tags,
            comments: 0,
            rating: 0,
            likeStatus: 0,
            content: contentForm.textContent ? contentForm.textContent : "",
            coverImgPath: "",
            publisher: {login: "", username: ""},
            avatarImgPath: '',
        };

        Events.articleCreate(articleData);
        URIChanger.feedPage();
    }

    /**
     * Обработчик изменения статьи
     */
    static articleUpdateListener(articleId: number): void {
        const titleForm = document.querySelector('.article_edit__title')!;
        const categoryForm = document.querySelector('.select_menu')!;
        const descriptionForm = document.querySelector('.article_edit__description')!;
        const contentForm = document.querySelector('.article_edit__content')!;
        const tags: string[] = [];
        document.querySelectorAll('.article__tag').forEach((tagDiv) => {
            tags.push(tagDiv.innerHTML);
        });
        console.log(contentForm.innerHTML);
        const content: string = contentForm.innerHTML.replaceAll('<p>', '').replaceAll('</p>', '\n');
        console.log(content);
        const articleData: FullArticleData = {
            id: articleId,
            title: titleForm.textContent ? titleForm.textContent : "",
            category: categoryForm.textContent ? categoryForm.textContent : "",
            description: descriptionForm.textContent ? descriptionForm.textContent : "",
            tags: tags,
            comments: 0,
            rating: 0,
            likeStatus: 0,
            content: content,
            coverImgPath: "",
            publisher: {login: "", username: ""},
            avatarImgPath: '',
        };

        Events.articleUpdate(articleData);
    }

    /**
     * Удаление статьи по id
     */
    static articleRemoveListener(articleId: number): void {
        Events.openConfirmMessage("Удалить статью?", () => {
            Events.articleRemove(articleId).then((result) => {
                if (result) {
                    URIChanger.feedPage();
                } else {
                    Events.openAlertMessage("Удаление не удалось");
                }
            });

        }, () => {
            return;
        });
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
    static articleCreate(articleData: FullArticleData): Promise<boolean> {
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
        const emailForm: HTMLFormElement = document.getElementById('settings__email') as HTMLFormElement;

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
        const loginForm: HTMLFormElement = document.getElementById("settings__login") as HTMLFormElement;

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
        const usernameForm: HTMLFormElement = document.getElementById("settings__nickname") as HTMLFormElement;

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
        const passwordForm: HTMLFormElement = document.getElementById("settings__password") as HTMLFormElement;

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
        const passwordForm: HTMLFormElement = document.getElementById("settings__password") as HTMLFormElement;
        const repeatPasswordForm: HTMLFormElement = document.getElementById("settings__repeat_password") as HTMLFormElement;

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

    static newArticlePageListener() {
        Requests.getSessionInfo().then((result) => {
            if (result.status === 401) {
                Events.openAlertMessage("Для создания статьи нужно авторизироваться");
                return;
            }

            URIChanger.editArticle();
        });
    }

    static editArticleListener(id: number) {
        URIChanger.editArticle(id);
    }

    static setLocation(uri: string) {
        location.hash = uri;
    }

    static createCommentary(form: CommentaryForm) {
        const contentForm = form.root.querySelector(".div_textarea")! as HTMLElement;
        const content = contentForm.textContent!;

        if (!Validators.validateCommentary(content.trim())) {
            Events.#makeInvalid(contentForm, "Вы не можете отправить пустой комментарий");
            return;
        }
        Events.#makeValid(contentForm);


        const commentaryDate: CommentaryData = {
            article: form.article,
            id: 0,
            parentId: form.parent,
            parentType: form.parentType,
            rating: 0,
            likeStatus: 0,
            content: content
        }

        Requests.commentaryCreate(commentaryDate).then((result) => {
            if (!result) {
                Events.openAlertMessage("Для отправки комментариев нужно авторизироваться");
            }
            Events.rerenderCommentaries(form.article);
        });
    }

    static searchFormListener() {
        const form = document.querySelector(".navbar__search_form")! as HTMLFormElement;
        if (form.value.trim().length === 0) {
            return;
        }

        const data: SearchData = {
            request: form.value,
        }

        URIChanger.searchPage(data);
    }

    /**
     * Обработчик добавления тега к списку тегов на странице поиска
     */
    static addSearchedTagListener(form: SearchHeader): void {
        const tagsForm = form.root.querySelector('.select_menu')! as HTMLSelectElement;
        const newTagString: string = tagsForm.value;

        if (newTagString != '') {
            /*
            if (!form.tags.includes(newTagString)) {
                const tagsRow = form.root.querySelector('.advanced_search__sidebar__tags')!;
                if (tagsRow.querySelectorAll('.article__tag').length === 0) {
                    tagsRow.innerHTML = '';
                }

                const newTag = document.createElement('div');
                newTag.classList.add('article__tag');
                newTag.innerHTML = newTagString;
                tagsRow.appendChild(newTag);

                form.tags.push(newTagString);

                newTag.addEventListener('click', () => {

                    const index = form.tags.indexOf(newTagString);
                    if (index > -1) {
                        form.tags.splice(index, 1);
                    }

                    if (form.tags.length == 0) {
                        newTag.parentElement!.innerHTML = '<div class="advanced_search__sidebar__tags__message">Теги не выбраны</div>';
                    } else {
                        newTag.parentNode!.removeChild(newTag);
                    }

                 });
            }*/
            const tagsRow = form.root.querySelector('.advanced_search__sidebar__tags')!;
            if (tagsRow.querySelectorAll('.article__tag').length !== 0) {
                tagsRow.innerHTML = '';
                form.tags = [];
            }
            const newTag = document.createElement('div');
            newTag.classList.add('article__tag');
            newTag.innerHTML = newTagString;
            form.tags.push(newTagString);
            tagsRow.innerHTML = '';

            newTag.addEventListener('click', () => {
                form.tags = [];
                newTag.parentElement!.innerHTML = '<div class="advanced_search__sidebar__tags__message">Теги не выбраны</div>';
            });
            tagsRow.appendChild(newTag);
        }
    }

    /**
     * Обработчик подтверждения в панели расширенного поиска
     */
    static submitSearchHeaderListener(form: SearchHeader) {
        let request: string | undefined | null = document.querySelector(".search_header__title")?.textContent;
        request = request === '' || request == null ? undefined : request.trim();

        let login: string | undefined | null = form.root.querySelector(".search_header__author")?.textContent;
        login = login === '' || login == null ? undefined : login.trim();

        const tags = form.tags.length !== 0 ? form.tags : undefined;
        const data: SearchData = {
            request: request,
            author: login,
            tags: tags,
        }
        URIChanger.searchPage(data);
    }

    /**
     * Обработчик добавления тега к списку тегов при создании/редактирвоании страницы
     */
    static addArticleTagListener(): void {
        const tagsForm = document.querySelector('.tag_selector')! as HTMLSelectElement;
        const newTagString: string = tagsForm.value;

        const tags: string[] = [];
        document.querySelectorAll('.article__tag').forEach((tagDiv) => {
            tags.push(tagDiv.innerHTML);
        });

        if (newTagString != '') {
            if (!tags.includes(newTagString)) {
                const tagsRow = document.querySelector('.article_edit__tags_row')!;
                if (tagsRow.querySelectorAll('.article__tag').length === 0) {
                    tagsRow.innerHTML = '';
                }

                const newTag = document.createElement('div');
                newTag.classList.add('article__tag');
                newTag.innerHTML = newTagString;
                tagsRow.appendChild(newTag);

                newTag.addEventListener('click', () => {
                    const tags: string[] = [];
                    document.querySelectorAll('.article__tag').forEach((tagDiv) => {
                        tags.push(tagDiv.innerHTML);
                    });

                    const index = tags.indexOf(newTagString);
                    if (index > -1) {
                        tags.splice(index, 1);
                    }

                    if (tags.length == 0) {
                        newTag.parentElement!.innerHTML = '<div class="advanced_search__sidebar__tags__message">Теги не выбраны</div>';
                    } else {
                        newTag.parentNode!.removeChild(newTag);
                    }
                });
            }
        }
    }

    /**
     * Добавление формы комментария к комментарию
     */
    static addCommentaryFormToComment(parent: Commentary): void {
        const potentialForm = parent.root.querySelector('.commentary_form');
        if (potentialForm !== null) {
            potentialForm.parentNode!.removeChild(potentialForm);
            return;
        }
        const form = new CommentaryForm();
        const commentaryData: CommentaryData = {
            article: parent.data!.article,
            id: 0,
            parentId: parent.data!.id,
            parentType: CommentaryParent.commentary,
            rating: 0,
            likeStatus: 0,
            content: ""
        }
        form.render(commentaryData);
        const eventBus: CommentaryFormEventBus = {
            commentaryCreate: Events.createCommentary,
        }
        form.subscribe(eventBus);
        const parentReplyContainer = parent.root.querySelector('.commentary__reply_box')!
        parentReplyContainer.insertBefore(form.root, parentReplyContainer.firstChild);

    }

    /**
     * @param {int} articleId
     */
    static rerenderCommentaries(articleId: number) {
        Requests.getCommentaries(articleId).then(async (commentaries) => {
            const renderedCommentaries: Commentary[] = [];
            for (const commentaryData of commentaries) {
                const commentary = new Commentary();
                await commentary.render(commentaryData);
                const eventBus: CommentaryComponentEventBus = {
                    goToAuthorFeed: URIChanger.userFeedPage,
                    showAnswerForm: Events.addCommentaryFormToComment,
                    likeListener: Events.commentaryLikeListener,
                    openLogin: Events.makeLoginOverlayListener,
                }
                commentary.subscribe(eventBus);
                renderedCommentaries.push(commentary);
            }

            const container = document.querySelector('.commentary__block__wrapper')!;
            const form = container.querySelector('.commentary_form')!;
            form.querySelector('.commentary_form__content')!.innerHTML = '';
            container.innerHTML = '';
            container.appendChild(form);


            const addToComment = (parent: Commentary, child: Commentary) => {
                const wrapper = parent.root.querySelector('.commentary__reply_box')!;
                if (parent.level < 12) {
                    wrapper.appendChild(child.root);
                    return;
                }
                let nextLevelWrapper = wrapper.querySelector('.commentary__new_level');
                if (nextLevelWrapper === null) {
                    nextLevelWrapper = document.createElement('div');
                    nextLevelWrapper.classList.add('commentary__new_level');
                    wrapper.appendChild(nextLevelWrapper);
                }
                nextLevelWrapper.appendChild(child.root);
            }

            const addedCommentaries: Commentary[] = [];
            const commentariesToCommentaries: Commentary[] = [];
            for (const renderedCommentary of renderedCommentaries) {
                if (renderedCommentary.data!.parentType === CommentaryParent.article) {
                    container.appendChild(renderedCommentary.root);
                    addedCommentaries.push(renderedCommentary);
                } else {
                    commentariesToCommentaries.push(renderedCommentary);
                }
            }

            while (commentariesToCommentaries.length > 0) {
                const buf = commentariesToCommentaries;
                for (const comment of buf) {
                    for (const addedCommentary of addedCommentaries) {
                        if (addedCommentary.data!.id === comment.data!.parentId) {
                            addToComment(addedCommentary, comment);
                            comment.level = addedCommentary.level + 1;
                            if (comment.level > 12) {
                                comment.level = 4;
                            }
                            addedCommentaries.push(comment);
                            const index = commentariesToCommentaries.indexOf(comment);
                            if (index > -1) {
                                commentariesToCommentaries.splice(index, 1);
                            }
                        }
                    }
                }
            }
            const commentaryCount = commentaries.length;
            document.querySelectorAll('.article__comments_count__count').forEach((element) => {
                element.innerHTML = "" + commentaryCount;
            })
        })
    }

    /**
     * Отматывает наверх страницы
     */
    static scrollUp() {
        const comments = document.querySelector('.commentary__block__wrapper')!;
        window.scroll({
            top: 0,
        });
    }

    /**
     * Отматывает до комментариев, когда на странице статьи
     */
    static scrollToComments() {
        const comments = document.querySelector('.commentary__block__wrapper')!;
        const y = comments.getBoundingClientRect().top + window.scrollY;
        window.scroll({
            top: y,
            behavior: 'smooth'
        });
    }

    /**
     * Открывает alert сообщение
     */
    static openAlertMessage(message: string, buttonValue?: string, alertListener?: Listener) {
        const body = document.querySelector("body")!;

        const data: AlertMessageData = {
            message: message,
            buttonValue: buttonValue,
        }

        if (alertListener === undefined) alertListener = () => {
            return;
        };
        const eventBus: AlertMessageEventBus = {
            okEvent: () => {
                Events.closeAlertMessage();
                alertListener!();
            },
        }

        const alertMessage = new AlertMessage();
        alertMessage.render(data);
        alertMessage.subscribe(eventBus);

        body.classList.add("disabled");
        body.appendChild(alertMessage.root);
    }

    /**
     * Закрывает alert сообщение
     */
    static closeAlertMessage() {
        const body = document.querySelector("body")!;
        body.classList.remove("disabled");
        const message = body.querySelector(".alert_prompt")!;
        body.removeChild(message);
    }

    /**
     * Открывает alert сообщение
     */
    static openConfirmMessage(message: string, okListener: Listener, cancelListener: Listener, values?: {
        positiveValue?: string, negativeValue?: string,
    }) {
        const body = document.querySelector("body")!;

        const data: ConfirmMessageData = {
            message: message,
            values: values,
        }

        const eventBus: ConfirmMessageEventBus = {
            okEvent: () => {
                Events.closeConfirmMessage();
                okListener();
            },
            cancelEvent: () => {
                Events.closeConfirmMessage();
                cancelListener();
            }
        }

        const confirmMessage = new ConfirmMessage();
        confirmMessage.render(data);
        confirmMessage.subscribe(eventBus);

        body.classList.add("disabled");
        body.appendChild(confirmMessage.root);
    }

    /**
     * Закрывает confirm сообщение
     */
    static closeConfirmMessage() {
        const body = document.querySelector("body")!;
        body.classList.remove("disabled");
        const message = body.querySelector(".alert_prompt")!;
        body.removeChild(message);
    }

    /**
     * Подписка на категорию
     */
    static categorySubscribeListener(category: string): Promise<boolean> {
        return Requests.getSessionInfo().then((result) => {
            if (result.status === 401) {
                Events.openAlertMessage("Для подписки нужно авторизироваться");
                return false;
            }
            return true;
        }).then((result) => {
            if (result) {
                return Requests.categorySubscribe(category).then((result) => {
                    if (!result) {
                        Events.openAlertMessage("Не удалось подписаться");
                    }
                    return result;
                });
            }
            return false;
        })
    }

    /**
     * Подписка на пользователя
     */
    static userSubscribeListener(login: string): Promise<boolean> {
        return Requests.userSubscribe(login).then((result) => {
            if (!result) {
                Events.openAlertMessage("Не удалось подписаться");
            }
            return result;
        })
    }

    /**
     * Отписка от категории
     */
    static categoryUnsubscribeListener(category: string): Promise<boolean> {
        return Requests.categoryUnsubscribe(category).then((result) => {
            if (!result) {
                Events.openAlertMessage("Не удалось отписаться");
            }
            return result;
        })
    }

    /**
     * Отписка от пользователя
     */
    static userUnsubscribeListener(login: string): Promise<boolean> {
        return Requests.userUnsubscribe(login).then((result) => {
            if (!result) {
                Events.openAlertMessage("Не удалось отписаться");
            }
            return result;
        })
    }

    /**
     * Открытие страницы расширенного поиска
     */
    static openAdvSearchListener() {
        const form = document.querySelector(".navbar__search_form")! as HTMLFormElement;
        const data: SearchData = {
            request: form.value.trim().length === 0 ? undefined : form.value.trim(),
        };
        URIChanger.searchPage(data);
    }

    /**
     * Закрывает окно шеринга
     */
    static closeShareBox() {
        const body = document.querySelector("body")!;
        body.classList.remove("disabled");
        const shareBox = body.querySelector(".share_alert")!;
        body.removeChild(shareBox);
    }

    /**
     * Открывает окно шеринга
     */
    static openShareBox(shareData: SharingData) {
        const body = document.querySelector("body")!;

        const eventBus: SharingBoxEventBus = {
            close: Events.closeShareBox,
        }

        const sharingBox = new SharingBox();
        sharingBox.render(shareData);
        sharingBox.subscribe(eventBus);

        body.classList.add("disabled");
        body.appendChild(sharingBox.root);
    }

    /**
     * Сообщает, что аватарка слишком тяжёлая
     */
    static tooBigProfilePicture() {
        Events.openAlertMessage('Размер аватарки не должен превышать 4Мб');
    }

    /**
     * Действие лайка/дизлайка/их снятия со статьи
     */
    static articleLikeListener(data: LikeData): Promise<LikeResponse> {
        return Requests.changeArticleLikeStatus(data);
    }

    /**
     * Действие лайка/дизлайка/их снятия с комментария
     */
    static commentaryLikeListener(data: LikeData): Promise<LikeResponse> {
        return Requests.changeCommentaryLikeStatus(data);
    }
}
