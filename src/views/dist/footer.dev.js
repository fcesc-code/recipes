"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _renderer = _interopRequireDefault(require("../core/renderer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function footerComponent() {
  (0, _renderer["default"])("\n    <p>Francesc Brugarolas - <a href='http://uoc.edu'>UOC</a> - Eines HTML i CSS I - PAC1 - Abril 2021</p>\n  ")({
    parent: 'footer',
    styles: null,
    data: {
      someContent: 'This is fun!'
    }
  });
}

var _default = footerComponent;
exports["default"] = _default;