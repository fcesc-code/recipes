"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _list = _interopRequireDefault(require("../views/list"));

var _about = _interopRequireDefault(require("../views/about"));

var _surprise = _interopRequireDefault(require("../views/surprise"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ROUTES = [{
  title: 'home',
  path: '/',
  display: false,
  body: _list["default"],
  page: ''
}, {
  title: 'recipies\' mosaic',
  path: '/',
  display: true,
  body: _list["default"],
  page: ''
}, {
  title: 'categories',
  path: '/categories/',
  display: true,
  body: _list["default"],
  page: ''
}, {
  title: 'surprise me!',
  path: '/recipies/',
  display: true,
  body: _surprise["default"],
  page: ''
}, {
  title: 'about & credits',
  path: '/about/',
  display: true,
  body: _about["default"],
  page: ''
}];
var _default = ROUTES;
exports["default"] = _default;