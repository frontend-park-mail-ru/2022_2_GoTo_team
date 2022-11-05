`use strict`;
/* global Handlebars */

import Feed from "./pages/feed/feed.js";
import Login_page from "./pages/login/login_page.js";
import {Page_loaders} from "./modules/page_loaders.js";

Page_loaders.login_page();
/*

const mainContentElement = document.createElement('div');
mainContentElement.classList.add('feed');
root.appendChild(mainContentElement);
const overlay = document.createElement('div')
overlay.classList.add("overlay")

const ajax = new (Ajax);

const config = {
    menu: {
        feed: {
            href: '/feed',
            name: 'Лента',
            render: render_feed,
        },
        login: {
            href: '/session/create',
            name: 'Авторизация',
            render: render_login,
        },
        signup: {
            href: '/user/signup',
            name: 'Регистрация',
            render: render_signup,
        },
        session_info: {
            href: '/session/info',
        },
        session_remove: {
            href: '/session/remove',
        },
    },
};

function unauthorize() {
    ajax.post({
        url: config.menu.session_remove.href,
    }).then(() => {
        update_auth();
    })
}

function auth_render(e) {
    e.preventDefault();
    change_overlay(config.menu.login)
}

function getCookie(name) {
    let cookieArr = document.cookie.split(";");
    for (let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("=");
        if (name === cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}

function hasSession() {
    let session = getCookie("session_id");
    return !(session === "" || session === null);
}

function update_auth() {
    const profileButton = document.getElementById("navbar__auth_button");
    if (hasSession()) {
        ajax.get({
            url: config.menu.session_info.href,
        }).then((response) => {
            if (response.status === 200) {
                profileButton.innerHTML = Handlebars.templates["authorized_user.html"]({
                    nickname: response.response.username
                });
                profileButton.removeEventListener("click", auth_render);
                profileButton.addEventListener('click', open_profile_menu);
            } else {
                profileButton.innerHTML = Handlebars.templates["unauthorized_user.html"]();
                profileButton.addEventListener('click', auth_render);
            }
        });
    } else {
        profileButton.innerHTML = Handlebars.templates["unauthorized_user.html"]();
        profileButton.addEventListener('click', auth_render);
    }
}

function goToPage(menuElement) {
    mainContentElement.innerHTML = '';
    mainContentElement.appendChild(menuElement.render());
    menuElement.render()
}

function render_overlay() {
    if (!root.contains(overlay)) {
        root.appendChild(overlay);
    }
    return overlay
}

function change_overlay(menuElement) {
    render_overlay()
    overlay.innerHTML = '';
    menuElement.render();
}

function close_overlay() {
    overlay.innerHTML = '';
    root.removeChild(overlay)
}

function open_profile_menu() {
    const profile_menu = document.getElementById('profile_menu');
    if (profile_menu === null) {
        root.innerHTML += Handlebars.templates["profile_menu.html"]();
        document.getElementById('profile_menu__unauthorize_button').addEventListener("click", () => {
            close_profile_menu();
            profileButton.removeEventListener('click', open_profile_menu);
            unauthorize();
        });
    }
    const profileButton = document.getElementById("navbar__auth_button");
    profileButton.removeEventListener('click', open_profile_menu);
    profileButton.addEventListener('click', close_profile_menu);
}

function close_profile_menu() {
    const profile_menu = document.getElementById('profile_menu');
    if (profile_menu) {
        root.removeChild(profile_menu);
    }
    const profileButton = document.getElementById("navbar__auth_button");
    profileButton.removeEventListener('click', close_profile_menu);
    profileButton.addEventListener('click', open_profile_menu);
}

function make_invalid(element, message) {
    const error_class = "error-message"
    const siblings = element.parentNode.childNodes;
    const wrong_sign = document.createElement('div');
    wrong_sign.innerHTML = `<div class=\"${error_class}\">${message}</div>`;
    element.setCustomValidity(message);

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

function make_valid(element) {
    element.setCustomValidity('');
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

function render_navbar() {
    const navbar = document.getElementById('navbar');
    navbar.innerHTML = Handlebars.templates['navbar.html']({});
    document.getElementById("navbar__popular")
        .addEventListener('click', (e) => {
            e.preventDefault();
            goToPage(config.menu.feed)
        });
    document.getElementById("navbar__auth_button").addEventListener('click', auth_render);
    update_auth();
}

function render_login() {
    overlay.innerHTML = Handlebars.templates["login_form.html"]({});
    const submit_button = document.getElementById("login_form__submit_button");

    submit_button.addEventListener('click', async (e) => {
        e.preventDefault();

        const email = document.getElementById("login_form__email_login");
        const password = document.getElementById("login_form__password");
        if (!validate_email(email.value.trim())) {
            make_invalid(email, "Неверный формат email");
            return
        }
        make_valid(email);

        if (!validate_password(password.value)) {
            make_invalid(password, "Неправильный формат пароля");
            return
        }
        make_valid(password);

        const response = await ajax.post({
            url: config.menu.login.href,
            body: {"user_data": {"email": email.value, "password": password.value}}
        });
        if (response.response === 200) {
            update_auth();
            close_overlay();
            goToPage(config.menu.feed);
        } else {
            make_invalid(document.getElementById("login_form__email_login"), "Неверный email или пароль");
        }
    });

    const reg_button = document.getElementById("login_form__signup_button");
    reg_button.addEventListener('click', (e) => {
        e.preventDefault();
        change_overlay(config.menu.signup)
    });

    const close_button = document.getElementById("login_form__cross");
    close_button.addEventListener('click', close_overlay);
}

async function render_signup() {
    overlay.innerHTML = Handlebars.templates["registration_form.html"]({});
    const submit_button = document.getElementById("registration_form__submit_button");

    submit_button.addEventListener('click', async (e) => {
        e.preventDefault();

        const email = document.getElementById("registration_form__email");
        const login = document.getElementById("registration_form__login");
        const username = document.getElementById("registration_form__username");
        const password = document.getElementById("registration_form__password");
        const rePassword = document.getElementById("registration_form__repeat-password");

        if (!validate_email(email.value.trim())) {
            make_invalid(email, "Неверный формат email");
            return;
        }
        make_valid(email);

        if (!validate_password(password.value)) {
            make_invalid(password, "Неверный формат пароля");
            return;
        }
        make_valid(password);

        if (password.value !== rePassword.value) {
            make_invalid(rePassword, "Пароли не совпадают");
            return;
        }
        make_valid(rePassword);

        const response = await ajax.post({
            url: config.menu.signup.href,
            body: {
                "new_user_data": {
                    "email": email.value,
                    "login": login.value,
                    "username": username.value,
                    "password": password.value
                }
            },
        });

        if (response.response === 200) {
            close_overlay();
            goToPage(config.menu.feed);
            update_auth();
        } else {
            if (response.response === 409) {
                make_invalid(email, "Email занят")
                return
            }
            const form = document.getElementById("reg_form");
            make_invalid(form, "Что-то пошло не так");
        }
    });

    const back_button = document.getElementById("login_form__go_back");
    back_button.addEventListener('click', (e) => {
        e.preventDefault();
        change_overlay(config.menu.login)
    });

    const close_button = document.getElementById("login_form__cross");
    close_button.addEventListener('click', close_overlay);
}

function render_feed() {
    const mainElement = document.createElement('div');

    ajax.get({
        url: config.menu.feed.href,
    }).then((response) => {
        const articles = response.response.articles;
        if (articles && Array.isArray(articles)) {
            mainContentElement.innerHTML = '';
            articles.forEach(({title, description, tags, category, rating, comments, authors}) => {
                mainContentElement.innerHTML += Handlebars.templates["article.html"]({
                    title: title,
                    description: description,
                    tags: tags,
                    category: category,
                    rating: rating,
                    comments: comments,
                    author: authors[0]
                })
            })
        }
    });
    return mainElement;
}

const validate_email = (email) => {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
};

const validate_password = (password) => {
    return password.length > 3;
};

render_navbar()
render_feed()
*/