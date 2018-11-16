const { initPayment, responsePayment } = require('../../paymentgateway/paytm/services/index');
const config = require('../../paymentgateway/paytm/config');

module.exports.initPayment = (req, res) => {
  initPayment(req.query.amount).then(
    (success) => {
      res.render('../paymentgateway/views/paytmRedirect.ejs', {
        resultData: success,
        paytmFinalUrl: config.PAYTM_FINAL_URL,
      });
    },
    (error) => {
      res.send(error);
    },
  );
}
module.exports.paywithpaytmresponse = (req, res) => {
  responsePayment(req.body).then(
    (success) => {
      res.render('../paymentgateway/views/response.ejs', {resultData: 'true', responseData: success});
    },
    (error) => {
      res.send(error);
    },
  );
}
