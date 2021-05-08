"use strict";

var _header = _interopRequireDefault(require("./views/header"));

var _footer = _interopRequireDefault(require("./views/footer"));

var _list = _interopRequireDefault(require("./views/list"));

var _appUrls = _interopRequireDefault(require("./routes/appUrls"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function renderBody(newBody) {
  console.warn('Triggered RenderBody with', newBody.name);
  return newBody();
}

function init() {
  (0, _header["default"])();
  (0, _footer["default"])();
  renderBody(_list["default"]);
}

init();
window.addEventListener('onpopstate', function (event) {
  consolw.error('TRIGGERED ONPOPSTATE');
  console.warn(event.state);
  console.warn('entering popstate!!!');
  var currentPath = window.location.pathname;
  var regEx = /\/(?=[^/]+$).+/g;
  var pathname = currentPath.match(regEx)[0];
  console.warn('pathname', pathname);
  window.history.pushState({}, pathname, window.location.origin + pathname);
  console.warn('entering popstate bis');

  var target = _appUrls["default"].find(function (element) {
    return element.path === pathname;
  });

  console.warn('this is what we got from target', target);
  renderBody(target.body);
});