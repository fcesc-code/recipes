"use strict";

var _templateParser = _interopRequireDefault(require("./templateParser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('SUITE template.parseLiteral tests', function () {
  it('Should detect a double curled expression and substitute the variable for a value', function () {
    var sampleVariables = ['cool', 'there'];
    var sampleValues = ['really cool stuff', 'somewhere else'];
    var sampleTemplate = "<h2>some {{".concat(sampleVariables[0], "}} here and there</h2>");
    var testValuesMap = new Map();
    testValuesMap.set(sampleVariables[0], sampleValues[0]);
    var expected = "<h2>some really cool stuff here and there</h2>";
    ;

    var actual = _templateParser["default"].parseLiteral(sampleTemplate, testValuesMap);

    expect(actual).toBe(expected);
  });
  it('Should not detect single curled expressions', function () {
    var sampleTemplate = '<h2>some{notSoCool}stuff</h2>';
    var testValuesMap = new Map();
    var expected = sampleTemplate;

    var actual = _templateParser["default"].parseLiteral(sampleTemplate, testValuesMap);

    expect(actual).toBe(expected);
  });
  it('Should detect more than one double curled expression and substitute the variables for values', function () {
    var sampleVariables = ['cool', 'there'];
    var sampleValues = ['really cool stuff', 'somewhere else'];
    var sampleTemplate = "<h2>some {{".concat(sampleVariables[0], "}} here and {{").concat(sampleVariables[1], "}}</h2>");
    var testValuesMap = new Map();
    testValuesMap.set(sampleVariables[0], sampleValues[0]);
    testValuesMap.set(sampleVariables[1], sampleValues[1]);
    var expected = "<h2>some really cool stuff here and somewhere else</h2>";
    ;

    var actual = _templateParser["default"].parseLiteral(sampleTemplate, testValuesMap);

    expect(actual).toBe(expected);
  });
  it('Should not detect malformed curly expressions', function () {
    var sampleTemplate = '<h2>some{[not}</h2>';
    var testValuesMap = new Map();
    var expected = sampleTemplate;

    var actual = _templateParser["default"].parseLiteral(sampleTemplate, testValuesMap);

    expect(actual).toBe(expected);
  });
  it('Should not detect unproperly closed curly expressions', function () {
    var sampleTemplate = '<h2>some{[not{{</h2>';
    var testValuesMap = new Map();
    var expected = sampleTemplate;

    var actual = _templateParser["default"].parseLiteral(sampleTemplate, testValuesMap);

    expect(actual).toBe(expected);
  });
});