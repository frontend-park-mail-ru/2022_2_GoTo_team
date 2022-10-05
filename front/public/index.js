`use strict`;

const root = document.getElementById('root');
const mainContentElement = document.createElement('div');
mainContentElement.classList.add('feed');
root.appendChild(mainContentElement);
document.getElementById("navbar-popular")
    .addEventListener('click', (e) => {
        e.preventDefault();
        goToPage(config.menu.feed)
    });

document.getElementById("auth-button")
    .addEventListener('click', (e) => {
        e.preventDefault();
        goToPage(config.menu.login)
    });


/*
const main = document.createElement('div');
const template = Handlebars.templates["login_form.html"];
article.innerHTML = template({});
feed.appendChild(article)
*/

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

function goToPage(menuElement) {
    mainContentElement.innerHTML = '';
    mainContentElement.appendChild(menuElement.render());
}

function render_login() {
    const login_form = document.createElement('div')
    login_form.innerHTML = Handlebars.templates["login_form.html"]({});
    mainContentElement.appendChild(login_form);
    const form = document.getElementById("login-form")

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById("email-login").value.trim();
        const password = document.getElementById("password").value;

        ajax.post({
            url: config.menu.login.href,
            body: {email, password},
            callback: (status => {
                if (status === 200) {
                    //goToPage(config.menu.profile);
                    return;
                }

                alert('АХТУНГ! НЕВЕРНЫЙ ЕМЕЙЛ ИЛИ ПАРОЛЬ');
            })
        });
    });

    const reg_button = document.getElementById("signup-button");
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
    console.log(articles && Array.isArray(articles))
    if (articles && Array.isArray(articles)) {
        mainContentElement.innerHTML = '';
        articles.forEach(({title, description, tags, category, rating, comments, author}) => {
            mainContentElement.innerHTML += Handlebars.templates["article.html"]({
                Title: title,
                description: description, tags: tags, category: category, rating: rating,
                comments: comments, author: author
            })
        })
    }

    return mainElement;
}

function render_signup() {
    const reg_form = document.createElement('div')
    reg_form.innerHTML = Handlebars.templates["registration_form.html"]({});
    mainContentElement.appendChild(reg_form);
    const form = document.getElementById("reg-form")

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const login = document.getElementById("login").value.trim();
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;

        ajax.post({
            url: config.menu.signup.href,
            body: {email, login, username, password},
            callback: (status => {
                if (status === 200) {
                    goToPage(config.menu.feed);
                    return;
                }

                alert('АХТУНГ! НЕВЕРНЫЙ ЕМЕЙЛ ИЛИ ПАРОЛЬ');
            })
        });
    });
    return reg_form
}

render_login()