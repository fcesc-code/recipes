"use strict";

var _header = _interopRequireDefault(require("./views/header"));

var _footer = _interopRequireDefault(require("./views/footer"));

var _list = _interopRequireDefault(require("./views/list"));

var _router = _interopRequireDefault(require("./routes/router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function init() {
  (0, _header["default"])();
  (0, _footer["default"])();
  (0, _list["default"])();
}

init();

var navigateTo = function navigateTo(url) {
  window.history.pushState(null, null, url);
  (0, _router["default"])();
};

window.addEventListener("popstate", _router["default"]);
document.addEventListener("DOMContentLoaded", function () {
  document.body.addEventListener("click", function (event) {
    if (event.target.matches("[data-link]")) {
      event.preventDefault();
      navigateTo(event.target.href);
    }
  });
  (0, _router["default"])();
});