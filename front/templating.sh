rm -rf front/public/components/tmpl
mkdir front/public/components/tmpl
handlebars front/public/components/html/navbar.html -f front/public/components/tmpl/navbar.tmpl.js
handlebars front/public/components/html/article.html -f front/public/components/tmpl/article.tmpl.js
handlebars front/public/components/html/login_form.html -f front/public/components/tmpl/login_form.tmpl.js
handlebars front/public/components/html/registration_form.html -f front/public/components/tmpl/registration_form.tmpl.js
