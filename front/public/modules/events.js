import Overlay from "../components/overlay/overlay.js";
import Login_form from "../components/login_form/login_form.js";
import Registration_form from "../components/registration_form/registration_form.js";
import {Validators} from "./validators.js";
import {Requests} from "./requests.js";
import Feed from "../pages/feed/feed.js";
import User_plug from "../components/user_plug/user_plug.js";
import User_plug_menu from "../components/user_plug_menu/user_plug_menu.js";
import {Page_loaders} from "./page_loaders.js";



export class Events {
    static #overlay_login_event_bus = {
        submit: Events.submit_login,
        go_to_registration: Events.redraw_registration_overlay,
        email_validation: Events.email_validate_listener_login,
        password_validation: Events.password_validate_listener_login,
        close_form: Events.close_overlay_listener,
    }

    static #overlay_registration_event_bus = {
        submit: Events.submit_registration,
        go_to_login: Events.redraw_login_overlay,
        email_validation: Events.email_validate_listener_registration,
        login_validation: Events.login_validate_listener_registration,
        username_validation: Events.username_validate_listener_registration,
        password_validation: Events.password_validate_listener_registration,
        repeat_password_validation: Events.password_repeat_validate_listener_registration,
        close_form: Events.close_overlay_listener,
    }
    /**
     * Отрисовывает оверлей
     */
    static open_overlay() {
        const overlay = new Overlay();
        overlay.render();
        const root = document.getElementById('root');
        root.appendChild(overlay.root);
        overlay.subscribe();
    }

    /**
     * Удаляет оверлей
     */
    static #close_overlay() {
        const overlay = document.getElementById('overlay');
        overlay.parentNode.removeChild(overlay);
    }

    /**
     * Перерисовывает плашку оверлея на view
     * @param {Basic_component} controller
     */
    static #change_overlay(controller, event_bus) {
        const overlay_center = document.getElementById('overlay__center');
        overlay_center.innerHTML = '';
        controller.render();
        overlay_center.appendChild(controller.root);
        controller.subscribe(event_bus);
    }

    /**
     * Создаёт оверлей с формой логина
     */
    static make_login_overlay_listener() {
        Events.open_overlay();
        Events.#change_overlay(new Login_form(), Events.#overlay_login_event_bus);

        const auth_button = document.getElementById('navbar__auth_button').lastChild;
        auth_button.removeEventListener('click', Events.make_login_overlay_listener);
        auth_button.addEventListener('click', Events.close_overlay_listener);
    }

    /**
     * Удаляет оверлей
     */
    static close_overlay_listener() {
        Events.#close_overlay()

        const auth_button = document.getElementById('navbar__auth_button').lastChild;
        auth_button.removeEventListener('click', Events.close_overlay_listener);
        auth_button.addEventListener('click', Events.make_login_overlay_listener);
    }

    /**
     * Перерисовывает плашку оверлея на логин
     */
    static redraw_registration_overlay() {
        Events.#change_overlay(new Registration_form(), Events.#overlay_registration_event_bus);
    }

    /**
     * Перерисовывает плашку оверлея на регистрацию
     */
    static redraw_login_overlay() {
        Events.#change_overlay(new Login_form(), Events.#overlay_login_event_bus);
    }

    /**
     * Подтверждение формы логина
     */
    static submit_login() {
        const email_form = document.getElementById("login_form__email_login");
        const password_form = document.getElementById("login_form__password");
        const user_data = {
            email: email_form.value.trim(),
            password: password_form.value.trim(),
        }

        //Валидация происходит автоматически при анфокусе форм

        Requests.login(user_data).then((response) => {
            if (response === 200) {
                const root = document.getElementsByTagName('body')[0];
                const page = new Feed(root);
                page.render();
                page.subscribe();
            } else {
                Events.#make_invalid(document.getElementById("login-form_inputs-wrapper"), "Что-то пошло не так");
            }
        });
    }

    /**
     * Подтверждение формы регистрации
     */
    static submit_registration() {
        const email_form = document.getElementById("registration_form__email");
        const login_form = document.getElementById("registration_form__login");
        const username_form = document.getElementById("registration_form__username");
        const password_form = document.getElementById("registration_form__password");

        const user_data = {
            email: email_form.value.trim(),
            login: login_form.value.trim(),
            username: username_form.value.trim(),
            password: password_form.value.trim()
        }

        Events.email_validate_listener_registration();
        Events.login_validate_listener_registration();
        Events.username_validate_listener_registration();
        Events.password_validate_listener_registration();
        Events.password_repeat_validate_listener_registration();

        Requests.signup(user_data).then((response) => {
            if (response === 200) {
                const root = document.getElementsByTagName('body')[0];
                const page = new Feed(root);
                page.render();
                page.subscribe();
            } else {
                if (response.response === 409) {
                    Events.#make_invalid(email_form, "Email занят")
                    return;
                }
                const form = document.getElementById("login-form_inputs-wrapper");
                Events.#make_invalid(form, "Что-то пошло не так");
            }
        })
    }

    /**
     * Выводит сообщение message под элементом element
     * @param {HTMLSelectElement} element
     * @param {string} message
     */
    static #make_invalid(element, message) {
        const error_class = "error-message"
        const siblings = element.parentNode.childNodes;
        const wrong_sign = document.createElement('div');
        wrong_sign.innerHTML = `<div class=\"${error_class}\">${message}</div>`;
        if (typeof element.setCustomValidity !== 'undefined') {
            element.setCustomValidity(message);
        }

        for (let i = 0; i < siblings.length; i++) {
            if (siblings[i] === element) {
                if (siblings[i + 1].nodeName === "#text") {
                    element.after(wrong_sign);
                    break;
                }
                if (!(siblings[i + 1].innerHTML.startsWith(`<div class=\"${error_class}\">`))) {
                    element.after(wrong_sign);
                }
                break;
            }
        }
    }

    /**
     * Убирает невалидность формы element
     * @param {HTMLSelectElement} element
     */
    static #make_valid(element) {
        if (typeof element.setCustomValidity !== 'undefined') {
            element.setCustomValidity('');
        }
        const error_class = "error-message";
        const siblings = element.parentNode.childNodes;

        for (let i = 0; i < siblings.length; i++) {
            if (siblings[i] === element) {
                if (siblings[i + 1].nodeName === "#text") {
                    break;
                }
                if (siblings[i + 1].innerHTML.startsWith(`<div class=\"${error_class}\">`)) {
                    element.parentNode.removeChild(siblings[i + 1]);
                }
                break;
            }
        }
    }

    /**
     * Проверяет валидность значения в поле почты в плашке логина
     */
    static email_validate_listener_login(){
        const email_form = document.getElementById('login_form__email_login');
        const email = email_form.value.trim();
        if (email === ''){
            return;
        }
        if (!Validators.validate_email(email)) {
            Events.#make_invalid(email_form, "Неверный формат email");
            return;
        }
        Events.#make_valid(email_form);
    }

    /**
     * Проверяет валидность значения в поле пароля в плашке логина
     */
    static password_validate_listener_login(){
        const password_form = document.getElementById("login_form__password");
        const password = password_form.value.trim();
        if (password === ''){
            return;
        }
        if (!Validators.validate_password(password)) {
            Events.#make_invalid(password_form, "Неправильный формат пароля");
            return
        }
        Events.#make_valid(password_form);
    }

    /**
     * Проверяет валидность значения в поле почты в плашке регистрации
     */
    static email_validate_listener_registration(){
        const email_form = document.getElementById('registration_form__email');
        const email = email_form.value.trim();
        if (email === ''){
            return;
        }
        if (!Validators.validate_email(email)) {
            Events.#make_invalid(email_form, "Неверный формат email");
            return;
        }
        Events.#make_valid(email_form);
    }

    /**
     * Проверяет валидность значения в поле логина в плашке регистрации
     */
    static login_validate_listener_registration(){
        const login_form = document.getElementById("registration_form__login");
        const login = login_form.value.trim();
        if (login === ''){
            return;
        }
        if (!Validators.validate_login(login)) {
            Events.#make_invalid(login_form, "Неправильный формат логина");
            return
        }
        Events.#make_valid(login_form);
    }

    /**
     * Проверяет валидность значения в поле ника в плашке регистрации
     */
    static username_validate_listener_registration(){
        const username_form = document.getElementById("registration_form__username");
        const username = username_form.value.trim();
        if (username === ''){
            return;
        }
        if (!Validators.validate_username(username)) {
            Events.#make_invalid(username_form, "Неправильный формат ника");
            return
        }
        Events.#make_valid(username_form);
    }

    /**
     * Проверяет валидность значения в поле пароля в плашке регистрации
     */
    static password_validate_listener_registration(){
        const password_form = document.getElementById("registration_form__password");
        const password = password_form.value.trim();
        if (password === ''){
            return;
        }
        if (!Validators.validate_password(password)) {
            Events.#make_invalid(password_form, "Неправильный формат пароля");
            return
        }
        Events.#make_valid(password_form);
    }

    /**
     * Проверяет совпаденик значений в полях пароля и повторения пароля в плашке регистрации
     */
    static password_repeat_validate_listener_registration(){
        const password_form = document.getElementById("registration_form__password");
        const repeat_password_form = document.getElementById("registration_form__repeat-password");
        const password = password_form.value.trim();
        const repeat_password = repeat_password_form.value.trim();
        if (password === '' || repeat_password === ''){
            return;
        }
        if (password !== repeat_password) {
            Events.#make_invalid(repeat_password_form, "Пароли не совпадают");
            return
        }
        Events.#make_valid(repeat_password_form);
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
    static update_auth() {
        const profileButton = document.getElementById("navbar__auth_button");
        const user_plug = new User_plug();
        if (Events.#hasSession()) {
            Requests.get_session_info().then((response) => {
                if (response.status === 200) {
                    user_plug.render({nickname: response.response.username});
                } else {
                    user_plug.render();
                }
                user_plug.subscribe();
                profileButton.innerHTML = '';
                profileButton.appendChild(user_plug.root);
            });
        }
        user_plug.render();
        user_plug.subscribe();
        profileButton.innerHTML = '';
        profileButton.appendChild(user_plug.root);
    }

    /**
     * Открывает меню пользователя под кнопкой пользователя
     */
    static show_profile_menu() {
        const profile_menu = document.getElementById('profile_menu');
        if (profile_menu === null) {
            const user_plug_menu = new User_plug_menu();
            user_plug_menu.render();
            const root = document.getElementById('root');
            root.appendChild(user_plug_menu.root);
            user_plug_menu.subscribe();
        }
    }

    /**
     * Листенер открытия меню пользователя кнопки на навбаре
     */
    static show_profile_menu_listener() {
        Events.show_profile_menu()
        const profileButton = document.getElementById("navbar__auth_button").lastChild;
        profileButton.removeEventListener('click', Events.show_profile_menu_listener);
        profileButton.addEventListener('click', Events.close_profile_menu_listener);
    }

    /**
     * Закрывает меню пользователя под кнопкой пользователя
     */
    static close_profile_menu() {
        const profile_menu = document.getElementById('profile_menu');
        if (profile_menu) {
            const root = document.getElementById('root');
            root.removeChild(profile_menu);
        }
    }

    /**
     * Листенер закрытия меню пользователя кнопки на навбаре
     */
    static close_profile_menu_listener() {
        Events.close_profile_menu()
        const profileButton = document.getElementById("navbar__auth_button").lastChild;
        profileButton.removeEventListener('click', Events.close_profile_menu_listener);
        profileButton.addEventListener('click', Events.show_profile_menu_listener);
    }

    /**
     * Деавторизация
     */
    static unauthorize() {
        Requests.remove_session();
    }

    /**
     * Деавторизация
     */
    static profile_menu_unauthorize_listener() {
        Events.unauthorize();
        Events.close_profile_menu();
        Events.update_auth();
    }

    /**
     * Отрисовка страницы автора
     */
    static go_to_author_feed(login) {
        Page_loaders.user_feed_page(login);
    }
}