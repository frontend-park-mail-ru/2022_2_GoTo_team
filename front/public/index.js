`use strict`;
/* global Handlebars */

import {Ajax} from "./modules/ajax.js"

const root = document.getElementById('root');
const mainContentElement = document.createElement('div');
mainContentElement.classList.add('feed');
root.appendChild(mainContentElement);

const ajax = new(Ajax);

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
    },
};

const auth_render = (e) => {
    e.preventDefault();
    goToPage(config.menu.login)
};

function goToPage(menuElement) {
    mainContentElement.innerHTML = '';
    mainContentElement.appendChild(menuElement.render());
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
}

function render_overlay() {
    const overlay = document.createElement('div')
    overlay.classList.add("overlay")
    mainContentElement.appendChild(overlay);
    return overlay
}

function render_login() {
    render_overlay()
    const login_form = document.createElement('div')
    login_form.innerHTML = Handlebars.templates["login_form.html"]({});
    mainContentElement.appendChild(login_form);
    const form = document.getElementById("login_form")

    const make_wrong = () => {
        const wrong_sign = document.createElement('div');
        wrong_sign.innerHTML = "<div id=\"log-error\">Неверный email или пароль</div>";
        const container = form.childNodes[1];
        console.log(container.childNodes.length);
        if (container.childNodes.length < 14) {
            container.insertBefore(wrong_sign, container.children[4]);
        }
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById("email-login").value.trim();
        const password = document.getElementById("password").value;
        if (!validateEmail(email) || !validatePassword(password)) {
            make_wrong();
            return
        }

        const response = await ajax.post({
            url: config.menu.login.href,
            body: {"user_data": {email, password}}
        });
        if (response.response === 200) {
            const profileButton = document.getElementById("navbar__auth_button");
            profileButton.innerHTML = "<div>" + email + "</div>";
            profileButton.removeEventListener("click", auth_render);
            goToPage(config.menu.feed)
        } else {
            make_wrong();
        }

    });

    const reg_button = document.getElementById("login_form__signup_button");
    reg_button.addEventListener('click', (e) => {
        e.preventDefault();
        goToPage(config.menu.signup)
    });

    return login_form
}

async function render_feed() {
    const mainElement = document.createElement('div');

    const response = await ajax.get({
        url: config.menu.feed.href,
    })
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

    return mainElement;
}

async function render_signup() {
    const reg_form = document.createElement('div')
    reg_form.innerHTML = Handlebars.templates["registration_form.html"]({});
    mainContentElement.appendChild(reg_form);
    const form = document.getElementById("reg_form");

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const login = document.getElementById("login").value.trim();
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;
        const rePassword = document.getElementById("repeat-password").value;

        if (!validateEmail(email)) {
            const wrong_sign = document.createElement('div');
            wrong_sign.innerHTML = "<div id=\"log-error\">Неверный email</div>";
            const container = form.childNodes[1];
            if (container.childNodes.length < 6) {
                container.insertBefore(wrong_sign, container.childNodes[5]);
            }
        }

        if (password !== rePassword) {
            const wrong_sign = document.createElement('div');
            wrong_sign.innerHTML = "<div id=\"log-error\">Пароли не совпадают</div>";
            const container = form.childNodes[7];

            if (container.childNodes.length < 6) {
                container.insertBefore(wrong_sign, container.childNodes[5]);
            }
            return
        }

        const response = await ajax.post({
            url: config.menu.signup.href,
            body: {email, login, username, password},
        });

        if (response.response === 200) {
            goToPage(config.menu.login);
        } else {
            if (response.response === 409) {
                const wrong_sign = document.createElement('div');
                wrong_sign.innerHTML = "<div id=\"log-error\">Email занят</div>";
                const container = form.childNodes[1];
                if (container.childNodes.length < 5) {
                    container.insertBefore(wrong_sign, container.childNodes[4]);
                }
                return
            }
            const wrong_sign = document.createElement('div');
            wrong_sign.innerHTML = "<div id=\"log-error\">Что-то пошло не так</div>";
            const container = form.childNodes[3];
            console.log(container.childNodes.length);
            if (container.childNodes.length < 14) {
                container.insertBefore(wrong_sign, container.childNodes[12]);
            }
        }
    });

    return reg_form
}

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const validatePassword = (password) => {
    return password.length > 4
};

render_navbar()
render_feed()