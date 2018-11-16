const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  address: [{
    user_id: {
      type: String,
    },
    street: {
      type: String,
    },
    state: {
      type: String,
    },
  },
  ],
});

const user = mongoose.model('user', userSchema);
module.exports = user;
