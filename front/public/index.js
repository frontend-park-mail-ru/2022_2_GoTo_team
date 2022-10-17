`use strict`;
/* global Handlebars */

import {Ajax} from "./modules/ajax.js"

const root = document.getElementById('root');
const mainContentElement = document.createElement('div');
mainContentElement.classList.add('feed');
root.appendChild(mainContentElement);
const overlay = document.createElement('div')
overlay.classList.add("overlay")

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
    change_overlay(config.menu.login)
};

function goToPage(menuElement) {
    mainContentElement.innerHTML = '';
    mainContentElement.appendChild(menuElement.render());
    menuElement.render()
}

function render_overlay() {
    if(!root.contains(overlay)) {
        root.appendChild(overlay);
    }
    return overlay
}

function change_overlay(menuElement) {
    render_overlay()
    overlay.innerHTML = '';
    menuElement.render();
}

function close_overlay(){
    overlay.innerHTML = '';
    root.removeChild(overlay)
}

function hasClass(element, className) {
    return (' ' + element.className + ' ').indexOf(' ' + className+ ' ') > -1;
}

function make_wrong(element, message){
    const error_class = "error-message"
    const siblings = element.parentNode.childNodes;
    const wrong_sign = document.createElement('div');
    wrong_sign.innerHTML = `<div class=\"${error_class}\">${message}</div>`;

    for (let i = 0; i < siblings.length; i++){
        if (siblings[i] === element){
            if (siblings[i+1].nodeName === "#text"){
                element.after(wrong_sign);
                break;
            }
            if (!(siblings[i+1].innerHTML === wrong_sign.innerHTML)){
                element.after(wrong_sign);
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
}

function render_login() {
    overlay.innerHTML = Handlebars.templates["login_form.html"]({});
    const form = document.getElementById("login_form")

    /*const make_wrong = () => {
        const wrong_sign = document.createElement('div');
        wrong_sign.innerHTML = "<div id=\"log-error\">Неверный email или пароль</div>";
        const container = form.childNodes[1];
        console.log(container.childNodes.length);
        if (container.childNodes.length < 14) {
            container.insertBefore(wrong_sign, container.children[4]);
        }
    }*/

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById("login_form__email_login");
        const password = document.getElementById("login_form__password");
        if (!validate_email(email.value.trim())) {
            make_wrong(document.getElementById("login_form__email_login"), "Wrong Email");
            return
        }
        if (!validate_password(password.value)) {
            make_wrong(password, "Wrong password");
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
            make_wrong(document.getElementById("login_form__email_login"), "Wrong Email");
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
    const form = document.getElementById("reg_form");

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const login = document.getElementById("login").value.trim();
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;
        const rePassword = document.getElementById("repeat-password").value;

        if (!validate_email(email)) {
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

    const back_button = document.getElementById("login_form__go_back");
    back_button.addEventListener('click', (e) => {
        e.preventDefault();
        change_overlay(config.menu.login)
    });

    const close_button = document.getElementById("login_form__cross");
    close_button.addEventListener('click', close_overlay);
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

const validate_email = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const validate_password = (password) => {
    return password.length > 3;
};

render_navbar()
render_feed()