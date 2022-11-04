import Overlay from "../components/overlay/overlay.js";
import Login_form from "../components/login_form/login_form.js";
import Registration_form from "../components/registration_form/registration_form.js";
import {Validators} from "./validators.js";
import {Requests} from "./requests.js";
import Feed from "../pages/feed/feed.js";
import User_plug from "../components/user_plug/user_plug.js";

export class Events {
    /**
     * Отрисовывает оверлей
     */
    static open_overlay() {
        const overlay = new Overlay();
        overlay.render();
        const root = document.getElementById('root');
        root.appendChild(overlay.root);
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
    static #change_overlay(controller) {
        const overlay = document.getElementById('overlay');
        overlay.innerHTML = '';
        controller.render();
        overlay.appendChild(controller.root);
        controller.subscribe();
    }

    /**
     * Создаёт оверлей с формой логина
     */
    static make_login_overlay_listener() {
        Events.open_overlay();
        Events.#change_overlay(new Login_form());

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
        Events.#change_overlay(new Registration_form());
    }

    /**
     * Перерисовывает плашку оверлея на регистрацию
     */
    static redraw_login_overlay() {
        Events.#change_overlay(new Login_form());
    }

    /**
     * Подтверждение формы логина
     */
    static submit_login() {
        const email_form = document.getElementById("login_form__email_login");
        const password_form = document.getElementById("login_form__password");
        const user_data = {
            email: email_form.value.trim(), password: password_form.value.trim(),
        }
        if (!Validators.validate_email(user_data.email)) {
            Events.#make_invalid(email_form, "Неверный формат email");
            return
        }
        Events.#make_valid(email_form);

        if (!Validators.validate_password(user_data.password)) {
            Events.#make_invalid(password_form, "Неправильный формат пароля");
            return
        }
        Events.#make_valid(password_form);
        Requests.login(user_data).then((response) => {
            if (response === 200) {
                //update_auth();
                Events.#close_overlay();
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
}