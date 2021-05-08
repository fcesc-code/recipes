import path from 'path';
import cors from 'cors';
import Bundler from 'parcel-bundler';
import express from 'express';
import debug from 'debug';

import SERVICE from './services/service';

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
  console.log('ENTERED ABOUT')
  res.sendFile('./views/about.html');
})

server.get('/:recipeId', (req, res) => {
  console.log('ENTERED STUFF');
  const query = req.params.recipeId;
  console.log('query', query);
  const data = SERVICE.getRecipeById(query);
  console.log('data', data);
  res.status(200);
  res.json(data);
  console.log('res', res);
})

server.listen(PORT, () => {
  debug(`Server running in port: ${PORT}...`);
})