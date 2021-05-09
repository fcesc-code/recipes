import path from 'path';
import cors from 'cors';
import Bundler from 'parcel-bundler';
import express from 'express';
import debug from 'debug';

const PORT = process.env.PORT || 3010;
const server = express();

server.use(cors());

const file = path.resolve(__dirname, 'index.html');
const options = {};

const bundler = new Bundler(file, options);
server.use(bundler.middleware());

server.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './index.html'));
})

server.listen(PORT, () => {
  debug(`Server running in port: ${PORT}...`);
})