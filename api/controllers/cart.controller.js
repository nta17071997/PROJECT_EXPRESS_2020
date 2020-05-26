var Sessions = require('../../models/sessions.model');
var Book = require('../../models/book.model');
var User = require('../../models/user.model');
var Transaction = require('../../models/transaction.model');

module.exports.index = async function(req, res) {
  var sessionId = req.signedCookies.sessionId;
  var cart = await Sessions.findById({sessionId}).cart;
  var carts = [];
  for(var key in cart) {
    carts.push(
      { 
        book: await Book.find({id: key}),
        count: cart[key]   
      }
    )
  }
  
  res.render('cart/index', {
    carts: carts
  });
}

module.exports.post = async function(req, res) {
  var sessionId = req.signedCookies.sessionId;
  var userId = await User.find({id: req.signedCookies.userId});
  var cart = await Sessions.find({id: sessionId}).cart;
  var carts = [];
  for(var key in cart) {
    carts.push(
      { 
        book: await Book.find({id: key}),
        count: cart[key]   
      }
    )
  }
  
  for(var cart of carts) {
    var newTransaction = {
      userId: userId.name,
      bookId: cart.book.title,
      isComplete: false
    };
    await Transaction.unshift(newTransaction).save;
  }
  var session = await Sessions.find({id: sessionId});
  if(session){
    session.cart = {}
  }
  var sessionCart = await session.save();
  
  res.redirect('/transactions');
}

module.exports.addToCart = async function(req, res) {
  var idBook = req.params.bookId;
  var sessionId = req.signedCookies.sessionId;
  
  var count = await Sessions.find({id: sessionId}).get('cart.' + idBook, 0);
  var sessionBook = await Sessions.find({id: sessionId}).set('cart.' + idBook, count + 1);
  var sessionSave = await sessionBook.save();
  
  res.redirect('/book');

}
