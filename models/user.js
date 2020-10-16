const mongoose = require('mongoose');
let userSchema = mongoose.Schema({
  username: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  info: {
    type: String,
    require: true
  },
  pic:{
    type: String,
    default: '/uploads/avatar.jpg'
  }
});

const Users = (module.exports = mongoose.model('Users', userSchema))
