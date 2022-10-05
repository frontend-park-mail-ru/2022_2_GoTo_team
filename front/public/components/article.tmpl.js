(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['article.html'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "        <div class=\"tag\">"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression(container.lambda(depth0, depth0))
    + " ";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"article\">\n    <div class=\"tagbox\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"tags") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":3,"column":8},"end":{"line":5,"column":17}}})) != null ? stack1 : "")
    + "    </div>\n    <div class=\"article-title\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"Title") || (depth0 != null ? lookupProperty(depth0,"Title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Title","hash":{},"data":data,"loc":{"start":{"line":7,"column":31},"end":{"line":7,"column":40}}}) : helper)))
    + "</div>\n    <div class=\"article-description\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"description") || (depth0 != null ? lookupProperty(depth0,"description") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data,"loc":{"start":{"line":8,"column":37},"end":{"line":8,"column":52}}}) : helper)))
    + "</div>\n    <div class=\"article-cover\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"picture") || (depth0 != null ? lookupProperty(depth0,"picture") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"picture","hash":{},"data":data,"loc":{"start":{"line":9,"column":31},"end":{"line":9,"column":42}}}) : helper)))
    + "</div>\n    <div class=\"article-bottom-bar\">\n        <div class=\"author-pfp\"></div>\n        <div class=\"author-username\">"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"authors") : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":12,"column":37},"end":{"line":12,"column":72}}})) != null ? stack1 : "")
    + "</div>\n        <div class=\"article-posting-time\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"time") || (depth0 != null ? lookupProperty(depth0,"time") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"time","hash":{},"data":data,"loc":{"start":{"line":13,"column":42},"end":{"line":13,"column":50}}}) : helper)))
    + "</div>\n        <div class=\"article-feedback-info\">\n            <div class=\"article-comments-count\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"comments") || (depth0 != null ? lookupProperty(depth0,"comments") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"comments","hash":{},"data":data,"loc":{"start":{"line":15,"column":48},"end":{"line":15,"column":60}}}) : helper)))
    + "\n            </div>\n            <div class=\"article-rating-info\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"rating") || (depth0 != null ? lookupProperty(depth0,"rating") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"rating","hash":{},"data":data,"loc":{"start":{"line":17,"column":45},"end":{"line":17,"column":55}}}) : helper)))
    + "</div>\n        </div>\n    </div>\n</div>";
},"useData":true});
})();