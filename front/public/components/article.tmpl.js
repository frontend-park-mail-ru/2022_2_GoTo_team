(function() {
  var template = Handlebars.template, templates = Handlebars.templates || {};
templates['article.html'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"article\">\n    <div class=\"tagbox\">\n        <div class=\"tag\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"tag") || (depth0 != null ? lookupProperty(depth0,"tag") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tag","hash":{},"data":data,"loc":{"start":{"line":3,"column":25},"end":{"line":3,"column":32}}}) : helper)))
    + "</div>\n        <div class=\"tag\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"tag") || (depth0 != null ? lookupProperty(depth0,"tag") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tag","hash":{},"data":data,"loc":{"start":{"line":4,"column":25},"end":{"line":4,"column":32}}}) : helper)))
    + "</div>\n    </div>\n    <div class=\"article-title\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"Title") || (depth0 != null ? lookupProperty(depth0,"Title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Title","hash":{},"data":data,"loc":{"start":{"line":6,"column":31},"end":{"line":6,"column":40}}}) : helper)))
    + "</div>\n    <div class=\"article-description\">"
    + alias4((lookupProperty(helpers,"Pretty")||(depth0 && lookupProperty(depth0,"Pretty"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"long") : depth0),(depth0 != null ? lookupProperty(depth0,"and") : depth0),(depth0 != null ? lookupProperty(depth0,"informative") : depth0),(depth0 != null ? lookupProperty(depth0,"description") : depth0),{"name":"Pretty","hash":{},"data":data,"loc":{"start":{"line":7,"column":37},"end":{"line":7,"column":80}}}))
    + "</div>\n    <div class=\"article-cover\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"picture") || (depth0 != null ? lookupProperty(depth0,"picture") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"picture","hash":{},"data":data,"loc":{"start":{"line":8,"column":31},"end":{"line":8,"column":42}}}) : helper)))
    + "</div>\n    <div class=\"article-bottom-bar\">\n        <div class=\"author-pfp\"></div>\n        <div class=\"author-username\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"author") || (depth0 != null ? lookupProperty(depth0,"author") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"author","hash":{},"data":data,"loc":{"start":{"line":11,"column":37},"end":{"line":11,"column":47}}}) : helper)))
    + "</div>\n        <div class=\"article-posting-time\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"time") || (depth0 != null ? lookupProperty(depth0,"time") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"time","hash":{},"data":data,"loc":{"start":{"line":12,"column":42},"end":{"line":12,"column":50}}}) : helper)))
    + "</div>\n        <div class=\"article-feedback-info\">\n            <div class=\"article-comments-count\">12\n            </div>\n            <div class=\"article-rating-info\">233</div>\n        </div>\n    </div>\n</div>";
},"useData":true});
})();