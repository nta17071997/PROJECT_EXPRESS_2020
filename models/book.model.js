const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  image: {type: String, require: true}
});
const Book = mongoose.model('Book', bookSchema);
module.exports = Book;