const path = require('path');
const Bundler = require('parcel-bundler');
const express = require('express');

const PORT = process.env.PORT || 3010;
const server = express();

const file = path.resolve(__dirname, 'index.html');
const options = {};

const bundler = new Bundler(file, options);
server.use(bundler.middleware());

server.use('/img', express.static(path.resolve(__dirname, '../assets/img')));

server.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
})

server.listen(PORT, () => {
  console.log(`Server running in port: ${PORT}...`);
})