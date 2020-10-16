const mongoose = require('mongoose');
let photoSchema = mongoose.Schema({
  user_id: {
    ref: 'Users',
    type: mongoose.Schema.Types.ObjectId
  },
  title: {
    type: String,
    require: true
  },
  description: {
    type: String,
    default: 'there is noe description'
  },
  image: {
    type: String,
    require: true
  },
  views: {
    type: Number,
    default: 0
  }
});

const Photos = (module.exports = mongoose.model('Photos', photoSchema))
