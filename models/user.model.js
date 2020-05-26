const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  phone: {type: Number, required: true},
  email: {type: String, require: true},
  password: {type: String, require: true},
  avatar: {type: String, require: true}
});
const User = mongoose.model('User', userSchema);
module.exports = User;