var db = require("../db");
var shortid = require("shortid");
var Transaction = require('../models/transaction.model');
var User = require('../models/user.model');
var Book = require('../models/book.model');

module.exports.index = async (req, res) => {
  var page = parseInt(req.query.page) || 1;
  var transaction = await Transaction.find();
  var perPage = 8;
  var numberPage = Math.ceil(transaction.length / perPage);
  var start = (page - 1) * perPage;
  var end = page * perPage;
  
  res.render("transactions/index", {
    transactions: transaction.slice(start, end),
    numberPage: numberPage,
    link: "transactions",
    page: page + 1
  });
};
module.exports.create = async (req, res) => {
  var matchedUsers = await User.find();
  var matchedBooks = await Book.find();
  
  res.render("transactions/create", {
    users: matchedUsers,
    books: matchedBooks
  });
};
module.exports.postCreate = async (req, res) => {
  var transaction = await Transaction.find();
  transaction.push(req.body);
  var transactionSave = await transaction.save();
  
  res.redirect("/transactions");
};

module.exports.complete = async (req, res) => {
  var transaction = await Transaction.findById(req.params.id);
  
  res.render("transactions/complete", { transaction });
};
module.exports.edit = async(req, res) => {
  var transaction = await Transaction.findById(req.params.id);
 
  res.render("transactions/edit", { transaction });
};
module.exports.postEdit = async (req, res) => {
  var transaction = await Transaction.findById(req.params.id);
  if(transaction){
    transaction.isComplete = req.body.isComplete
  }
  var transactionSave = await transaction.save();
  res.redirect("/transactions");
};
module.exports.delete = async (req, res) => {
  var transaction = await Transaction.findById(req.params.id);
  
  res.redirect("/transactions");
};
