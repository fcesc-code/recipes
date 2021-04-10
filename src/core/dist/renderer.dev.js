"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _templateParser = _interopRequireDefault(require("./templateParser"));

require("regenerator-runtime/runtime");

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function renderComponent(htmlTextInput) {
  function findNode(query) {
    return document.querySelector(query);
  }

  function append(_ref) {
    var parent = _ref.parent,
        styles = _ref.styles,
        data = _ref.data;
    if (styles) addStyles(styles);
    addDOMElements({
      parent: parent,
      data: data
    });
  }

  function addDOMElements(_ref2) {
    var parent = _ref2.parent,
        data = _ref2.data;
    var node = bindDataToNode(data);
    findNode(parent).appendChild(node);
  }

  function addStyles(stylesPath) {
    var safePath, loadedStyles, link;
    return regeneratorRuntime.async(function addStyles$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            safePath = _path["default"].join(__dirname, stylesPath);
            _context.next = 3;
            return regeneratorRuntime.awrap(fetch(safePath).then(function (response) {
              return response.text();
            }));

          case 3:
            loadedStyles = _context.sent;
            console.warn(loadedStyles);
            link = document.createElement('link');
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = '';
            findNode('head').appendChild(link);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    });
  }

  function bindDataToNode(data) {
    function createDataMap() {
      var dataMap = new Map();

      for (var prop in data) {
        dataMap.set(prop, data[prop]);
      }

      return dataMap;
    }

    var inputData = data ? createDataMap(data) : null;

    var templateWithData = _templateParser["default"].parseLiteral(htmlTextInput, inputData);

    var node = document.createRange().createContextualFragment(templateWithData);
    return node;
  }

  return append;
}

var _default = renderComponent;
exports["default"] = _default;