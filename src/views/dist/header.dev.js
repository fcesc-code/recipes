"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _renderComponent = _interopRequireDefault(require("../core/renderComponent"));

var _appUrls = _interopRequireDefault(require("../routes/appUrls"));

var _service = _interopRequireDefault(require("../services/service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var categories = _service["default"].getCategories();

var categoriesList = categories.map(function (item) {
  return {
    'category': item,
    'url': "/".concat(item.replace(/\s/g, '_'))
  };
});
var categoryTemplate = "<li><a href=\"{{url}}\">{{category}}</a></li>";

var urlList = _appUrls["default"].filter(function (url) {
  return url.display === true;
}).map(function (route) {
  return {
    'title': route.title,
    'url': route.path,
    'body': route.body
  };
});

var navTemplate = "<li><a href=\"{{url}}\">{{title}}</a></li>";

function headerComponent() {
  (0, _renderComponent["default"])("\n    <h1 class=\"mainTitle\">RECEPTES</h1>\n    <p>{{emblem}}</p>\n    <nav><ul class=\"navMenu\">{{%%navMenu%%}}</ul></nav>\n    <ul class=\"categoriesMenu\">{{%%categories%%}}</ul>\n  ")({
    parent: 'header',
    styles: null,
    data: {
      emblem: 'Quick, romantic, healthy or delicious cooking? Find recipies for all your needs.',
      categories: {
        list: categoriesList,
        itemTemplate: categoryTemplate
      },
      navMenu: {
        list: urlList,
        itemTemplate: navTemplate
      }
    }
  });
}

var _default = headerComponent;
exports["default"] = _default;