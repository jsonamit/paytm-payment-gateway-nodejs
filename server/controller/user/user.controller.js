const jwt = require('jsonwebtoken');
// const nodemailer = require('nodemailer');
const User = require('../../models/user/user.model');

module.exports.register = (req, res) => {
  const response = {};
  if (req.body.name && req.body.email) {
    User.find({ email: req.body.email }, (err, userdata) => {
      if (err) {
        response.status = 401;
        response.msg = 'Data not inserted';
        response.err = err;
        res.send(response);
      } else if (userdata) {
        User.create(req.body, (error, userRegister) => {
          if (error) {
            response.status = 401;
            response.msg = 'Data not inserted';
            res.send(response);
          } else {
            const pay = { subject: userRegister._id };
            const token = jwt.sign(pay, 'secretkey');
            response.status = 200;
            response.msg = 'Data successfully inserted';
            response.token = token;
            response.data = userRegister;
            res.send(response);
          }
        });
      } else {
        response.status = 402;
        response.msg = 'Duplicate email id found';
        response.data = userdata;
        res.send(response);
      }
    });
  } else {
    response.status = 500;
    response.msg = 'server error';
    res.send(response);
  }
};
module.exports.getallUser = (req, res) => {
  const response = {};
  User.find((err, userdata) => {
    if (err) {
      response.status = 401;
      response.msg = 'Data not getting';
      response.err = err;
      res.send(response);
    } else {
      response.status = 200;
      response.msg = 'Data successfully getting';
      response.data = userdata;
      res.send(response);
    }
  });
};
module.exports.getUserById = (req, res) => {
  const response = {};
  if (req.body.id) {
    User.find({ _id: req.body.id }, (err, userdata) => {
      if (err) {
        response.status = 401;
        response.msg = 'Data not getting';
        response.err = err;
        res.send(response);
      } else {
        response.status = 200;
        response.msg = 'Data successfully getting';
        response.data = userdata;
        res.send(response);
      }
    });
  } else {
    response.status = 401;
    response.msg = 'user id missing';
    res.send(response);
  }
};
module.exports.userLogin = (req, res) => {
  const response = {};
  if (req.body.email && req.body.password) {
    User.find({ email: req.body.email }, (err, userData) => {
      if (err) {
        response.status = 500;
        response.msg = 'server error';
        res.send(response);
      } else if (userData) {
        const pay = { subject: userData._id };
        const token = jwt.sign(pay, 'secertkey');
        response.status = 200;
        response.msg = 'login successfully';
        response.data = userData;
        response.token = token;
        res.send(response);
      } else {
        response.status = 402;
        response.msg = 'Check email and password';
        res.send(response);
      }
    });
  } else {
    response.status = 401;
    response.msg = 'missing some data';
    res.send(response);
  }
};
