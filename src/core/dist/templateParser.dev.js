"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var REGEX_TO_PARSE = /(?<=\{\{)[^{]*(?=\}\})/g;

function parseValues() {
  function getValuesFromHtmlText(htmlText) {
    var result = htmlText.match(REGEX_TO_PARSE);
    return result === null ? null : _toConsumableArray(result);
  }

  function substituteDynamicValues(htmlText, variables, mapOfValues) {
    // eslint-disable-next-line no-restricted-syntax
    var modifiedHtmlText = htmlText;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = variables[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var variable = _step.value;
        var targetValue = mapOfValues.get(variable);
        modifiedHtmlText = modifiedHtmlText.replace("{{".concat(variable, "}}"), targetValue);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return modifiedHtmlText;
  }

  function parseLiteral(htmlTextInput, mapOfValues) {
    var dynamicVariables = getValuesFromHtmlText(htmlTextInput);
    return dynamicVariables === null || mapOfValues === null ? htmlTextInput : substituteDynamicValues(htmlTextInput, dynamicVariables, mapOfValues);
  }

  return {
    parseLiteral: parseLiteral
  };
}

var PARSER = parseValues();
var _default = PARSER;
exports["default"] = _default;