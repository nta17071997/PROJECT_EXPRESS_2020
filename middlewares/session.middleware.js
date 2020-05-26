var shortid = require("shortid");
var Session = require("../models/sessions.model");

module.exports = async function(req, res, next) {
  if (!req.signedCookies.sessionId) {
    var sessionId = shortid.generate();
    res.cookie("sessionId", sessionId, {
      signed: true
    });
    Session.create({id: sessionId});
    //db.get('sessions').push({id: sessionId}).write();
  }
  var cart = await Session.findOne({ id: req.signedCookies.sessionId }).cart;
  var count = 0;
  for (var key in cart) {
    count += cart[key];
  }

  res.locals.count = count;

  next();
};
