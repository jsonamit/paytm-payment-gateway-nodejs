const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const route = require('../routes/index');
// const p = require('../paymentgateway/views');
module.exports = (app) => {
  app.set('view engine', 'ejs');
  // app.use(express.static(`${__dirname}../views`));
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  route(app);
};
