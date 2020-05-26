var cloudinary = require('cloudinary').v2;
var shortid = require("shortid");
var Book = require('../../models/book.model');

cloudinary.config({
  cloud_name: "nguyenthanhan",
  api_key: "339941846778115",
  api_secret: "prD1h_aJXYSsFuQqsY2Ke-C4nPs"
});

module.exports.index = async (req, res) => {
    var page = parseInt(req.query.page) || 1;
    var perPage = 6;
    var numberPage = Math.ceil(Book.find().length / perPage);
    var start = (page - 1) * perPage;
    var end = page * perPage;
    const books = await Book.find();
  
  res.render('book/index', {
    book: books.slice(start, end),
    page: page + 1,
    numberPage: numberPage,
    link: 'book'
  })
};
module.exports.search = async (req, res) => {
  var q = req.query.q;
  var matchedBook = await Book.find();
  res.render("book", {
    book: matchedBook.filter(book => 
      book.title.toLowerCase().indexOf(q.toLowerCase()) !== -1),
    question: q
  });
};
module.exports.create = (req, res) => {
  res.render('book/create');
};
module.exports.postCreate = async (req, res) => {
  const file = req.files.coverUrl;
  cloudinary.uploader.upload(file.tempFilePath, async (err, result) =>{
    const book = new Book({
      title: req.body.title,
      description: req.body.description,
      image: result.url
    });
    const newBook = await book.save();
  })
  res.redirect('/book');
}