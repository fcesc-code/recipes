import path from 'path';
import cors from 'cors';
import Bundler from 'parcel-bundler';
import express from 'express';

import ROUTES from './routes/appUrls';

const PORT = process.env.PORT || 3010;
const server = express();

server.use(cors());

// function serverGetters( { path, params, page } ){
//   server.get(path, async (request, response) => {
//     const ROUTE_PARAMETERS = { query: request.params[params], parameter: params, fromPage: path };
//     //console.log('THESE ARE THE PARAMETERS', ROUTE_PARAMETERS, request.parameters, request.query);
//     response.locals = { body: page, header: COMPONENTS.header, nav: COMPONENTS.nav, footer: COMPONENTS.footer, parameters: ROUTE_PARAMETERS, ROUTES: ROUTES, heroStore };
//     response.render('index.ejs');
//   })
// }

// ROUTES.forEach( route => serverGetters(route) );

const file = path.resolve(__dirname, 'index.html');
const options = {};

const bundler = new Bundler(file, options);
server.use(bundler.middleware());

server.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './index.html'));
})

server.get('/about', (req, res) => {
  res.sendFile(path.resolve(__dirname, './views/about.html'));
})

server.listen(PORT, () => {
  console.log(`Server running in port:${PORT}...`);
})