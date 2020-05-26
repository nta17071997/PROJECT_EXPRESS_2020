const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  idBook: {type: String, ref: 'Book'},
  count: {type: Number}
});

const sessionSchema = new mongoose.Schema({
  cart: [cartSchema]
});

const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;