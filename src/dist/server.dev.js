"use strict";

var _path = _interopRequireDefault(require("path"));

var _cors = _interopRequireDefault(require("cors"));

var _parcelBundler = _interopRequireDefault(require("parcel-bundler"));

var _express = _interopRequireDefault(require("express"));

var _appUrls = _interopRequireDefault(require("./routes/appUrls"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PORT = process.env.PORT || 3010;
var server = (0, _express["default"])();
server.use((0, _cors["default"])()); // function serverGetters( { path, params, page } ){
//   server.get(path, async (request, response) => {
//     const ROUTE_PARAMETERS = { query: request.params[params], parameter: params, fromPage: path };
//     //console.log('THESE ARE THE PARAMETERS', ROUTE_PARAMETERS, request.parameters, request.query);
//     response.locals = { body: page, header: COMPONENTS.header, nav: COMPONENTS.nav, footer: COMPONENTS.footer, parameters: ROUTE_PARAMETERS, ROUTES: ROUTES, heroStore };
//     response.render('index.ejs');
//   })
// }
// ROUTES.forEach( route => serverGetters(route) );

var file = _path["default"].resolve(__dirname, 'index.html');

var options = {};
var bundler = new _parcelBundler["default"](file, options);
server.use(bundler.middleware());
server.get('/', function (req, res) {
  res.sendFile(_path["default"].resolve(__dirname, './index.html'));
});
server.get('/about', function (req, res) {
  res.sendFile(_path["default"].resolve(__dirname, './views/about.html'));
});
server.listen(PORT, function () {
  console.log("Server running in port:".concat(PORT, "..."));
});