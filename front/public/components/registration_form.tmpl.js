(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['registration_form.html'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"registration\">\n  <div class=\"enter-sign\">Зарегестрироваться</div>\n  <div class=\"input-box\">\n    <div class=\"log-label-wrapper\">\n      <label for=\"email\" class=\"log-label\">E-mail</label>\n      <input id=\"email\" type=\"text\" class=\"log-input\" placeholder=\"Введите email\">\n    </div>\n    <div class=\"log-label-wrapper\">\n      <label for=\"login\" class=\"log-label\">login</label>\n      <input id=\"login\" type=\"text\" class=\"log-input\" placeholder=\"Введите логин\">\n    </div>\n    <div class=\"log-label-wrapper\">\n      <label for=\"username\" class=\"log-label\">Ник</label>\n      <input id=\"username\" type=\"text\" class=\"log-input\" placeholder=\"Введите ник\">\n    </div>\n    <div class=\"log-label-wrapper\"><label for=\"password\" class=\"log-label\">Пароль</label>\n      <input id=\"password\" type=\"text\" class=\"log-input\" placeholder=\"Введите пароль\">\n\n      <input id=\"repeat-password\" type=\"text\" class=\"log-input\" placeholder=\"Повторите пароль\"></div>\n    <div class=\"log-button-container\">\n      <input type=\"submit\" value=\"Зарегестрироваться\" class=\"enter-button\">\n    </div>\n  </div>\n</div>";
},"useData":true});
})();