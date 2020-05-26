const bcrypt = require("bcrypt");
var User = require('../../models/user.model');

module.exports.login = (req, res) => {
  res.render("auth/login");
};

module.exports.postLogin = async (req, res) => {
  var user = await User.findOne({ email: req.body.email });
  
  if (!user) {
    res.render("auth/login", {
      errors: ["Users does not exist."],
      value: req.body
    });
    return;
  }
  var password = req.body.password;
  //var hashedPassword = bcrypt.hash(password, 10);
  bcrypt.compare(password, user.password, async (err, result) => {
    if (result) {
      res.cookie("userId", user._id);
      res.redirect("/");
    } else {
      var numberLogin = numberLogin + 1;
      if(user){
        user.wrongLoginCount = numberLogin
      }
      var userAuth = await user.save();
      res.render("auth/login", {
        errors: ["Wrong password."],
        value: req.body
      });
      return;
    }
  });

  res.cookie("userId", user.id, {
    signed: true
  });
  res.redirect("/users");
};
