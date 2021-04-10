"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _renderer = _interopRequireDefault(require("../core/renderer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function headerComponent() {
  (0, _renderer["default"])("\n    <h1>RECEPTES</h1>\n    <p>{{someContent}} {{andMore}}</p>\n  ")({
    parent: 'header',
    styles: null,
    data: {
      someContent: 'This is fun!',
      andMore: 'A lot of fun.'
    }
  });
}

var _default = headerComponent;
exports["default"] = _default;