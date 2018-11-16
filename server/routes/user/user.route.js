const express = require('express');

const route = express.Router();
const userController = require('../../controller/user/user.controller');
const paytmController = require('../../controller/paytm/paytm.controller');

route.get('/', userController.getallUser);
route.get('/paywithpaytm', paytmController.initPayment);
route.post('/paywithpaytmresponse', paytmController.paywithpaytmresponse);

module.exports = route;
