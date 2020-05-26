const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: {type: String, required: true},
  bookId: {type: String, required: true},
  isComplete: {type: Boolean, default: false, require: true}
});
const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;