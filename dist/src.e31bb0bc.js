// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"core/templateParser.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var REGEX_TO_PARSE = /(?<=\{\{)[^{}]*(?=\}\})/g;

function parseValues() {
  function getValuesFromHtmlText(htmlText) {
    var result = htmlText.match(REGEX_TO_PARSE);
    return result === null ? null : _toConsumableArray(result);
  }

  function substituteDynamicValues(htmlText, variables, mapOfValues) {
    var modifiedHtmlText = htmlText;
    var specialVariablesPattern = /(?<=%%)[^%\s]*(?=%%)/;

    var _iterator = _createForOfIteratorHelper(variables),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var variable = _step.value;

        if (specialVariablesPattern.test(variable)) {
          var target = mapOfValues.get(variable.replace(/%/g, ''));
          var list = target.list;
          var template = target.itemTemplate;
          var itemProperties = getValuesFromHtmlText(template);
          var resultList = '';

          var _iterator2 = _createForOfIteratorHelper(list),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var item = _step2.value;
              var mutableTemplate = template;

              var _iterator3 = _createForOfIteratorHelper(itemProperties),
                  _step3;

              try {
                for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                  var itemProp = _step3.value;
                  var itemTargetValue = item[itemProp];
                  mutableTemplate = mutableTemplate.replace("{{".concat(itemProp, "}}"), itemTargetValue);
                }
              } catch (err) {
                _iterator3.e(err);
              } finally {
                _iterator3.f();
              }

              resultList = "".concat(resultList).concat(mutableTemplate);
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }

          modifiedHtmlText = modifiedHtmlText.replace("{{".concat(variable, "}}"), resultList);
        } else {
          var targetValue = mapOfValues.get(variable);
          modifiedHtmlText = modifiedHtmlText.replace("{{".concat(variable, "}}"), targetValue);
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
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
exports.default = _default;
},{}],"core/renderComponent.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _templateParser = _interopRequireDefault(require("./templateParser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// import 'regenerator-runtime/runtime';
function renderComponent(htmlTextInput) {
  function findNode(query) {
    return document.querySelector(query);
  }

  function bindDataToNode(data) {
    function createDataMap() {
      var dataMap = new Map();
      Object.keys(data).forEach(function (prop) {
        return dataMap.set(prop, data[prop]);
      });
      return dataMap;
    }

    var inputData = data ? createDataMap(data) : null;

    var templateWithData = _templateParser.default.parseLiteral(htmlTextInput, inputData);

    var node = document.createRange().createContextualFragment(templateWithData);
    return node;
  }

  function addDOMElements(_ref) {
    var parent = _ref.parent,
        data = _ref.data;
    var node = bindDataToNode(data);
    findNode(parent).appendChild(node);
  }

  function addStyles(_x) {
    return _addStyles.apply(this, arguments);
  }

  function _addStyles() {
    _addStyles = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(stylesPath) {
      var link;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // const safePath = path.join(__dirname, stylesPath);
              // const loadedStyles = await fetch(safePath).then(response => response.text());
              console.warn(stylesPath);
              link = document.createElement('link');
              link.rel = 'stylesheet';
              link.type = 'text/css';
              link.href = '';
              findNode('head').appendChild(link);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _addStyles.apply(this, arguments);
  }

  function append(_ref2) {
    var parent = _ref2.parent,
        styles = _ref2.styles,
        data = _ref2.data;
    if (styles) addStyles(styles);
    addDOMElements({
      parent: parent,
      data: data
    });
  }

  return append;
}

var _default = renderComponent;
exports.default = _default;
},{"./templateParser":"core/templateParser.js"}],"mockdata/recipiesList.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  "name": "Crock Pot Roast",
  "id": "01",
  "category": "Roasts",
  "country": "United Kingdom",
  "ingredients": [{
    "quantity": "1",
    "name": " beef roast",
    "type": "Meat"
  }, {
    "quantity": "1 package",
    "name": "brown gravy mix",
    "type": "Baking"
  }, {
    "quantity": "1 package",
    "name": "dried Italian salad dressing mix",
    "type": "Condiments"
  }, {
    "quantity": "1 package",
    "name": "dry ranch dressing mix",
    "type": "Condiments"
  }, {
    "quantity": "1/2 cup",
    "name": "water",
    "type": "Drinks"
  }],
  "steps": ["Place beef roast in crock pot.", "Mix the dried mixes together in a bowl and sprinkle over the roast.", "Pour the water around the roast.", "Cook on low for 7-9 hours."],
  "timers": [0, 0, 0, 420],
  "imageURL": "http://img.sndimg.com/food/image/upload/w_266/v1/img/recipes/27/20/8/picVfzLZo.jpg",
  "originalURL": "http://www.food.com/recipe/to-die-for-crock-pot-roast-27208"
}, {
  "name": "Roasted Asparagus",
  "id": "02",
  "category": "Vegetables",
  "country": "Spain",
  "ingredients": [{
    "quantity": "1 lb",
    "name": " asparagus",
    "type": "Produce"
  }, {
    "quantity": "1 1/2 tbsp",
    "name": "olive oil",
    "type": "Condiments"
  }, {
    "quantity": "1/2 tsp",
    "name": "kosher salt",
    "type": "Baking"
  }],
  "steps": ["Preheat oven to 425°F.", "Cut off the woody bottom part of the asparagus spears and discard.", "With a vegetable peeler, peel off the skin on the bottom 2-3 inches of the spears (this keeps the asparagus from being all.\",string.\", and if you eat asparagus you know what I mean by that).", "Place asparagus on foil-lined baking sheet and drizzle with olive oil.", "Sprinkle with salt.", "With your hands, roll the asparagus around until they are evenly coated with oil and salt.", "Roast for 10-15 minutes, depending on the thickness of your stalks and how tender you like them.", "They should be tender when pierced with the tip of a knife.", "The tips of the spears will get very brown but watch them to prevent burning.", "They are great plain, but sometimes I serve them with a light vinaigrette if we need something acidic to balance out our meal."],
  "timers": [0, 0, 0, 0, 0, 0, 10, 0, 0, 0],
  "imageURL": "http://img.sndimg.com/food/image/upload/w_266/v1/img/recipes/50/84/7/picMcSyVd.jpg",
  "originalURL": "http://www.food.com/recipe/roasted-asparagus-50847"
}, {
  "name": "Curried Lentils and Rice",
  "id": "03",
  "category": "Meat Pies",
  "country": "Canada",
  "ingredients": [{
    "quantity": "1 quart",
    "name": "beef broth",
    "type": "Misc"
  }, {
    "quantity": "1 cup",
    "name": "dried green lentils",
    "type": "Misc"
  }, {
    "quantity": "1/2 cup",
    "name": "basmati rice",
    "type": "Misc"
  }, {
    "quantity": "1 tsp",
    "name": "curry powder",
    "type": "Condiments"
  }, {
    "quantity": "1 tsp",
    "name": "salt",
    "type": "Condiments"
  }],
  "steps": ["Bring broth to a low boil.", "Add curry powder and salt.", "Cook lentils for 20 minutes.", "Add rice and simmer for 20 minutes.", "Enjoy!"],
  "timers": [0, 0, 20, 20, 0],
  "imageURL": "https://minimalistbaker.com/wp-content/uploads/2017/09/AMAZING-Coconut-Curried-Golden-Lentils-20-minutes-healthy-SO-satisfying-vegan-lentil-curry-plantbased-coconut-dairyfree-glutenfree-12.jpg",
  "originalURL": "https://minimalistbaker.com/coconut-curried-golden-lentils-20-minutes/"
}, {
  "name": "Big Night Pizza",
  "id": "04",
  "category": "Pizza",
  "country": "Italy",
  "ingredients": [{
    "quantity": "5 teaspoons",
    "name": "yeast",
    "type": "Baking"
  }, {
    "quantity": "5 cups",
    "name": "flour",
    "type": "Baking"
  }, {
    "quantity": "4 tablespoons",
    "name": "vegetable oil",
    "type": "Baking"
  }, {
    "quantity": "2 tablespoons",
    "name": "sugar",
    "type": "Baking"
  }, {
    "quantity": "2 teaspoons",
    "name": "salt",
    "type": "Baking"
  }, {
    "quantity": "2 cups",
    "name": "hot water",
    "type": "Misc"
  }, {
    "quantity": "1/4 cup",
    "name": "pizza sauce",
    "type": "Misc"
  }, {
    "quantity": "3/4 cup",
    "name": "mozzarella cheese",
    "type": "Dairy"
  }],
  "steps": ["Add hot water to yeast in a large bowl and let sit for 15 minutes.", "Mix in oil, sugar, salt, and flour and let sit for 1 hour.", "Knead the dough and spread onto a pan.", "Spread pizza sauce and sprinkle cheese.", "Add any optional toppings as you wish.", "Bake at 400 deg Fahrenheit for 15 minutes.", "Enjoy!"],
  "timers": [15, 60, 0, 0, 0, 15, 0],
  "imageURL": "http://upload.wikimedia.org/wikipedia/commons/c/c7/Spinach_pizza.jpg",
  "originalURL": "https://tasty.co/recipe/pizza-dough"
}, {
  "name": "Cranberry and Apple Stuffed Acorn Squash Recipe",
  "id": "05",
  "category": "Desserts",
  "country": "United States of America",
  "ingredients": [{
    "quantity": "2",
    "name": "acorn squash",
    "type": "Produce"
  }, {
    "quantity": "1",
    "name": "boiling water",
    "type": "Drinks"
  }, {
    "quantity": "2",
    "name": "apples chopped into 1.4 inch pieces",
    "type": "Produce"
  }, {
    "quantity": "1/2 cup",
    "name": "dried cranberries",
    "type": "Produce"
  }, {
    "quantity": "1 teaspoon",
    "name": "cinnamon",
    "type": "Baking"
  }, {
    "quantity": "2 tablespoons",
    "name": "melted butter",
    "type": "Dairy"
  }],
  "steps": ["Cut squash in half, remove seeds.", "Place squash in baking dish, cut-side down.", "Pour 1/4-inch water into dish.", "Bake for 30 minutes at 350 degrees F.", "In large bowl, combine remaining ingredients.", "Remove squash from oven, fill with mix.", "Bake for 30-40 more minutes, until squash tender.", "Enjoy!"],
  "timers": [0, 0, 0, 30, 0, 0, 30, 0],
  "imageURL": "http://elanaspantry.com/wp-content/uploads/2008/10/acorn_squash_with_cranberry.jpg",
  "originalURL": "https://glutensugardairyfree.com/recipe-items/cranberry-apple-stuffed-acorn-squash/"
}, {
  "name": "Mic's Yorkshire Puds",
  "id": "06",
  "category": "Desserts",
  "country": "United Kingdom",
  "ingredients": [{
    "quantity": "200g",
    "name": "plain flour",
    "type": "Baking"
  }, {
    "quantity": "3",
    "name": "eggs",
    "type": "Dairy"
  }, {
    "quantity": "300ml",
    "name": "milk",
    "type": "Dairy"
  }, {
    "quantity": "3 tbsp",
    "name": "vegetable oil",
    "type": "Condiments"
  }],
  "steps": ["Put the flour and some seasoning into a large bowl.", "Stir in eggs, one at a time.", "Whisk in milk until you have a smooth batter.", "Chill in the fridge for at least 30 minutes.", "Heat oven to 220C/gas mark 7.", "Pour the oil into the holes of a 8-hole muffin tin.", "Heat tin in the oven for 5 minutes.", "Ladle the batter mix into the tin.", "Bake for 30 minutes until well browned and risen."],
  "timers": [0, 0, 0, 30, 0, 0, 5, 0, 30],
  "imageURL": "http://upload.wikimedia.org/wikipedia/commons/f/f9/Yorkshire_Pudding.jpg",
  "originalURL": "http://upload.wikimedia.org/wikipedia/commons/f/f9/Yorkshire_Pudding.jpg"
}, {
  "name": "Old-Fashioned Oatmeal Cookies",
  "id": "07",
  "category": "Desserts",
  "country": "United Kingdom",
  "ingredients": [{
    "quantity": "1 cup",
    "name": "raisins",
    "type": "Produce"
  }, {
    "quantity": "1",
    "name": "cup water",
    "type": "Drinks"
  }, {
    "quantity": "3/4 cup",
    "name": "shortening",
    "type": "Baking"
  }, {
    "quantity": "1 1/2 cups",
    "name": "sugar",
    "type": "Baking"
  }, {
    "quantity": "2 1/2 cups",
    "name": "flour",
    "type": "Baking"
  }, {
    "quantity": "1 tsp.",
    "name": "soda",
    "type": "Baking"
  }, {
    "quantity": "1 tsp.",
    "name": "salt",
    "type": "Baking"
  }, {
    "quantity": "1 tsp.",
    "name": "cinnamon",
    "type": "Baking"
  }, {
    "quantity": "1/2 tsp.",
    "name": "baking powder",
    "type": "Baking"
  }, {
    "quantity": "1/2 tsp.",
    "name": "cloves",
    "type": "Baking"
  }, {
    "quantity": "2 cups",
    "name": "oats",
    "type": "Baking"
  }, {
    "quantity": "1/2 cup",
    "name": "chopped nuts",
    "type": "Baking"
  }],
  "steps": ["Simmer raisins and water over medium heat until raisins are plump, about 15 minutes.", "Drain raisins, reserving the liquid.", "Add enough water to reserved liquid to measure 1/2 cup.", "Heat oven to 400°.", "Mix thoroughly shortening, sugar, eggs and vanilla.", "Stir in reserved liquid.", "Blend in remaining ingredients.", "Drop dough by rounded teaspoonfuls about 2 inches apart onto ungreased baking sheet.", "Bake 8 to 10 minutes or until light brown.", "About 6 1/2 dozen cookies."],
  "timers": [15, 0, 0, 0, 0, 0, 0, 0, 8, 0],
  "imageURL": "https://images.pexels.com/photos/2377477/pexels-photo-2377477.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "originalURL": "https://www.cookingclassy.com/oatmeal-cookies/"
}, {
  "name": "Blueberry Oatmeal Squares",
  "id": "08",
  "category": "Desserts",
  "country": "United States",
  "ingredients": [{
    "quantity": "2-1/2 cups",
    "name": "rolled oats, (not instant)",
    "type": "Baking"
  }, {
    "quantity": "1-1/4 cups",
    "name": "all-purpose flour",
    "type": "Baking"
  }, {
    "quantity": "1 tbsp",
    "name": "grated orange rind",
    "type": "Produce"
  }, {
    "quantity": "1/4 tsp",
    "name": "salt",
    "type": "Baking"
  }, {
    "quantity": "1 cup",
    "name": "cold butter, cubed",
    "type": "Baking"
  }, {
    "quantity": "3/4 cup",
    "name": "packed brown sugar",
    "type": "Baking"
  }, {
    "quantity": "3 cups",
    "name": "fresh blueberries",
    "type": "Produce"
  }, {
    "quantity": "1/2 cup",
    "name": "granulated sugar",
    "type": "Baking"
  }, {
    "quantity": "1/3 cup",
    "name": "orange juice",
    "type": "Produce"
  }, {
    "quantity": "4 tsp",
    "name": "cornstarch",
    "type": "Baking"
  }],
  "steps": ["Filling: In saucepan, bring blueberries, sugar and orange juice to boil; reduce heat and simmer until tender, about 10 minutes.", "Whisk cornstarch with 2 tbsp (25 mL) water; whisk into blueberries and boil, stirring, until thickened, about 1 minute.", "Place plastic wrap directly on surface; refrigerate until cooled, about 1 hour.", "In large bowl, whisk together oats, flour, sugar, orange rind and salt ; with pastry blender, cut in butter until in coarse crumbs.", "Press half into 8-inch (2 L) square parchment paper–lined metal cake pan; spread with blueberry filling.", "Bake in centre of 350°F oven until light golden, about 45 minutes.", "Let cool on rack before cutting into squares.", "(Make-ahead: Cover and refrigerate for up to 2 days or overwrap with heavy-duty foil and freeze for up to 2 weeks.)"],
  "timers": [10, 1, 60, 0, 0, 45, 0, 0],
  "imageURL": "https://m1.quebecormedia.com/emp/cl_prod/canadian_living-_-ec57f7d6-e56e-4b5e-9a51-fb1300b3e421-_-blueberry-oatmeal-squares2501359401339.jpg?impolicy=resize&width=1500&height=1500",
  "originalURL": "http://www.canadianliving.com/food/blueberry_oatmeal_squares.php"
}, {
  "name": "Curried chicken salad",
  "id": "09",
  "category": "Salads",
  "country": "France",
  "ingredients": [{
    "quantity": "3",
    "name": "skinless, boneless chicken breasts, halved lengthwise",
    "type": "Meat"
  }, {
    "quantity": "1/2 cup",
    "name": "mayonnaise",
    "type": "Baking"
  }, {
    "quantity": "1 tbsp",
    "name": "lemon zest",
    "type": "Produce"
  }, {
    "quantity": "1 tbsp ",
    "name": "lemon juice",
    "type": "Produce"
  }, {
    "quantity": "1 1/2 tsp",
    "name": "curry powder",
    "type": "Baking"
  }, {
    "quantity": "1/4 tsp",
    "name": "salt",
    "type": "Baking"
  }, {
    "quantity": "2",
    "name": "ripe mangoes, diced",
    "type": "Produce"
  }, {
    "quantity": "1/4 cup",
    "name": "dried cranberries",
    "type": "Produce"
  }, {
    "quantity": "2",
    "name": "green onions, thinly sliced",
    "type": "Produce"
  }, {
    "quantity": "1",
    "name": "celery stalk, finely chopped",
    "type": "Produce"
  }, {
    "quantity": "6 leaves",
    "name": "Boston lettuce",
    "type": "Produce"
  }, {
    "quantity": "6",
    "name": "English muffins, toasted",
    "type": "Misc"
  }],
  "steps": ["ARRANGE chicken in a single layer in a large pot.", "Add water to just cover.", "Bring to a boil over medium-high.", "Flip chicken, reduce heat to medium and simmer until cooked, about 6 more min.", "Cool.", "STIR mayo with lemon zest, juice, curry and salt in large bowl.", "Using 2 forks, shred chicken, then stir into mayo mixture with mango, cranberries, green onions and celery.", "Divide among muffins with lettuce leaves", "Sandwich with tops"],
  "timers": [0, 0, 0, 6, 0, 0, 0, 0, 0],
  "imageURL": "http://www.chatelaine.com/wp-content/uploads/2013/05/Curried-chicken-salad.jpg",
  "originalURL": "http://www.chatelaine.com/recipe/stovetop-cooking-method/curried-chicken-salad/"
}];
exports.default = _default;
},{}],"services/service.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _recipiesList = _interopRequireDefault(require("../mockdata/recipiesList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function service() {
  var DATA = _recipiesList.default;

  function getAll() {
    return DATA;
  }

  function getRecipeById(id) {
    return DATA.filter(function (element) {
      return element.id === id;
    });
  }

  function getRecipyByCategory(category) {
    return DATA.filter(function (element) {
      return element.category === category;
    });
  }

  function getRecipeByCountry(country) {
    return DATA.filter(function (element) {
      return element.country === country;
    });
  }

  function getCategories() {
    var list = new Set();
    DATA.forEach(function (element) {
      return list.add(element.category);
    });
    return _toConsumableArray(list);
  }

  function getCountry() {
    var list = new Set();
    DATA.forEach(function (element) {
      return list.add(element.country);
    });
    return _toConsumableArray(list);
  }

  return {
    getAll: getAll,
    getRecipeById: getRecipeById,
    getRecipyByCategory: getRecipyByCategory,
    getRecipeByCountry: getRecipeByCountry,
    getCategories: getCategories,
    getCountry: getCountry
  };
}

var SERVICE = service();
var _default = SERVICE;
exports.default = _default;
},{"../mockdata/recipiesList":"mockdata/recipiesList.js"}],"views/list.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _renderComponent = _interopRequireDefault(require("../core/renderComponent"));

var _service = _interopRequireDefault(require("../services/service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DATA = _service.default.getAll();

var neatList = DATA.map(function (recipy) {
  return {
    'title': recipy.name,
    'img': recipy.imageURL,
    'url': recipy.originalURL
  };
});
var itemTemplate = "<li><img src=\"{{img}}\"><a href=\"{{url}}\">{{title}}</a></li>";

function listComponent() {
  (0, _renderComponent.default)("\n    <ul class=\"recipies\">\n      {{%%list%%}}\n    </ul>\n  ")({
    parent: '#content',
    styles: null,
    data: {
      list: {
        list: neatList,
        itemTemplate: itemTemplate
      }
    }
  });
}

var _default = listComponent;
exports.default = _default;
},{"../core/renderComponent":"core/renderComponent.js","../services/service":"services/service.js"}],"views/about.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _renderComponent = _interopRequireDefault(require("../core/renderComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function aboutComponent() {
  (0, _renderComponent.default)("\n    <p>{{dummy}}</p>\n    <section>\n    <article>\n      <h2>About us</h2>\n        <p>\n          Why another recipies site? Which is the same as asking: in which way is this site different?\n          Very easy, we don't store cookies and bombard you with advertisments.\n          The recipies are from an open, crowd-funded database with repicies from all over the world: \n          <a href=\"https://rapidapi.com/thecocktaildb/api/themealdb\">The MealDB API.</a>\n        </p>\n        <p>\n          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum \n          deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non \n          provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum \n          fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis \n          est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis \n          voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis \n          aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. \n          Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias \n          consequatur aut perferendis doloribus asperiores repellat.\n        <p>\n    </article>\n    <article>\n      <h2>Credits</h2>\n      <p>This project had to be developed in VanillaJS, using only a few libraries but no framework\n        or backend was allowed. For the sake of it, the author has decided to use own template render\n        functions and own router, both very basic.\n      </p>\n      <p>\n        This website has been developed using following tech stack:\n        <ul>\n          <li>Parcel</li>\n          <li>Webpack</li>\n          <li>Babel</li>\n          <li>Jest</li>\n          <li>Sass</li>\n          <li>Sonarqube</li>\n          <li>VSCode</li>\n          <li>Github</li>\n          <li>Axios</li>\n          <li>Eslint</li>\n          <li>Prettier</li>\n          <li>Vanilla JS</li>\n        </ul>\n        Following pages were used as ressources for this page:\n        <ul>\n          <li><a href=\"https://www.pexels.com\">Pexels</a></li>\n          <li><a href=\"https://unsplash.com\">Unsplash</a></li>\n          <li><a href=\"coolors.co/\">coolors.co</a></li>\n          <li><a href=\"https://fonts.google.com/\">Google Fonts</a></li>\n        </ul>\n      </p>\n      <p>\n        This project is an exercise doing for \"HTML and CSS Tools 1\" Subject, as part of the \n        <abbr title=\"Universitat Oberta de Catalunya\"><a href=\"\">UOC</a></abbr> Master in \n        <a href=\"https://estudis.uoc.edu/ca/masters-universitaris/desenvolupament-llocs-aplicacions-web/presentacio\">\n        Webb app and sites development</a>. It has been developed in March and April 2021.\n      </p>\n      <p>\n        The code for this project is open source and was developed for educational purposes.\n        A repository of this project can be found in Github in this \n        <a href=\"https://github.com/fcesc-code/uoc-eines1-pac1#readme\">link</a>.\n      </p>\n    </article>\n  </section>\n  ")({
    parent: '#content',
    styles: null,
    data: {
      dummy: 'Urrah! this is an about page'
    }
  });
}

var _default = aboutComponent;
exports.default = _default;
},{"../core/renderComponent":"core/renderComponent.js"}],"views/surprise.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _renderComponent = _interopRequireDefault(require("../core/renderComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function surpriseComponent() {
  (0, _renderComponent.default)("\n    <p>{{dummy}}</p>\n  ")({
    parent: '#content',
    styles: null,
    data: {
      dummy: 'Urrah! this is a surprise page'
    }
  });
}

var _default = surpriseComponent;
exports.default = _default;
},{"../core/renderComponent":"core/renderComponent.js"}],"routes/appUrls.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _list = _interopRequireDefault(require("../views/list"));

var _about = _interopRequireDefault(require("../views/about"));

var _surprise = _interopRequireDefault(require("../views/surprise"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ROUTES = [{
  title: 'home',
  path: '/',
  display: false,
  body: _list.default
}, {
  title: 'recipies\' mosaic',
  path: '/',
  display: true,
  body: _list.default
}, {
  title: 'categories',
  path: '/categories/',
  display: true,
  body: _list.default
}, {
  title: 'surprise me!',
  path: '/recipies/',
  display: true,
  body: _surprise.default
}, {
  title: 'about & credits',
  path: '/about/',
  display: true,
  body: _about.default
}];
var _default = ROUTES;
exports.default = _default;
},{"../views/list":"views/list.js","../views/about":"views/about.js","../views/surprise":"views/surprise.js"}],"views/header.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _renderComponent = _interopRequireDefault(require("../core/renderComponent"));

var _appUrls = _interopRequireDefault(require("../routes/appUrls"));

var _service = _interopRequireDefault(require("../services/service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var categories = _service.default.getCategories();

var categoriesList = categories.map(function (item) {
  return {
    'category': item,
    'url': "/".concat(item.replace(/\s/g, '_'))
  };
});
var categoryTemplate = "<li><a href=\"{{url}}\">{{category}}</a></li>";

var urlList = _appUrls.default.filter(function (url) {
  return url.display === true;
}).map(function (route) {
  return {
    'title': route.title,
    'url': route.path,
    'body': route.body
  };
});

var navTemplate = "<li><a href=\"{{url}}\" onClick=\"renderApp({{body}})\">{{title}}</a></li>";

function headerComponent() {
  (0, _renderComponent.default)("\n    <h1 class=\"mainTitle\">RECEPTES</h1>\n    <p>{{emblem}}</p>\n    <nav><ul class=\"navMenu\">{{%%navMenu%%}}</ul></nav>\n    <ul class=\"categoriesMenu\">{{%%categories%%}}</ul>\n  ")({
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
exports.default = _default;
},{"../core/renderComponent":"core/renderComponent.js","../routes/appUrls":"routes/appUrls.js","../services/service":"services/service.js"}],"views/footer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _renderComponent = _interopRequireDefault(require("../core/renderComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function footerComponent() {
  (0, _renderComponent.default)("\n    <p>Francesc Brugarolas - <a href='{{url}}'>UOC</a> - Eines HTML i CSS I - PAC1 - Abril 2021</p>\n  ")({
    parent: 'footer',
    styles: null,
    data: {
      url: 'http://uoc.edu'
    }
  });
}

var _default = footerComponent;
exports.default = _default;
},{"../core/renderComponent":"core/renderComponent.js"}],"core/renderApp.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function renderApp(newBody) {
  console.warn('Triggered RenderApp');
  var content = document.querySelector('#content');
  content.innerHTML = '';
  return newBody();
}

var _default = renderApp;
exports.default = _default;
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _header = _interopRequireDefault(require("./views/header"));

var _footer = _interopRequireDefault(require("./views/footer"));

var _list = _interopRequireDefault(require("./views/list"));

var _renderApp = _interopRequireDefault(require("./core/renderApp"));

var _appUrls = _interopRequireDefault(require("./routes/appUrls"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function init() {
  (0, _header.default)();
  (0, _footer.default)();
  (0, _renderApp.default)(_list.default);
}

init();
window.onpopstate(function (event) {
  console.warn(event.state);
  console.warn('entering popstate!!!');
  var currentPath = window.location.pathname;
  var regEx = /\/(?=[^/]+$).+/g;
  var pathname = currentPath.match(regEx)[0];
  console.warn('pathname', pathname);
  window.history.pushState({}, pathname, window.location.origin + pathname);
  console.warn('entering popstate bis');

  var target = _appUrls.default.find(function (element) {
    return element.path === pathname;
  });

  (0, _renderApp.default)(target.body);
}); // window.onpopstate = () => {
//   const ROOT = document.querySelector('#content');
//   // ROOT.innerHTML = routes[window.location.pathname]
//   ROOT.innerHTML = ''
//   console.log('here here', window.location.pathname);
// }
// function onNavigate(){
//   const currentPath = window.location.pathname;
//   const regEx = /\/(?=[^/]+$).+/g;
//   const pathname = currentPath.match(regEx)[0];
//   window.history.pushState(
//     {},
//     pathname,
//     window.location.origin + pathname
//   )
// }
},{"./views/header":"views/header.js","./views/footer":"views/footer.js","./views/list":"views/list.js","./core/renderApp":"core/renderApp.js","./routes/appUrls":"routes/appUrls.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57389" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map