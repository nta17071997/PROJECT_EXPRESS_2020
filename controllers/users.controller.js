var cloudinary = require('cloudinary').v2;
var shortid = require("shortid");
var User = require('../models/user.model');

cloudinary.config({
  cloud_name: "nguyenthanhan",
  api_key: "339941846778115",
  api_secret: "prD1h_aJXYSsFuQqsY2Ke-C4nPs"
});

module.exports.index = async (req, res) => {
  var page = parseInt(req.query.page) || 1;
  var perPage = 8;
  var numberPage = Math.ceil(User.find().length / perPage);
  var start = (page - 1) * perPage;
  var end = page * perPage;
  var users = await User.find();
  
  res.render("users/index", {
    users: users.slice(start, end),
    link: 'users',
    page: page + 1,
    numberPage: numberPage
  });
};
module.exports.search = async (req, res) => {
  var q = req.query.q;
  var matchedUsers = await User.find().filter(user => 
      user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1);
  
  res.render("users", {
    users: matchedUsers,
    question: q
  });
};
module.exports.create = (req, res) => {
  res.render("users/create");
};
module.exports.postCreate = async (req, res) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;
  //req.body.avatar = req.file.path.split('\\').slice(1).join('/');
  const file = req.files.avatar;
  cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
    var newUser = {
      name: name,
      phone: phone,
      email: email,
      avatar: result.url
    };
    var user = await newUser.save();
  })
  res.redirect("/users");
};
module.exports.delete = async (req, res) => {
  var deleteUser = await User.findById(req.params.id)
  await deleteUser.remove();
  res.redirect("/users");
};
module.exports.update = async (req, res) => {
  var updateUser = await User.findById(req.params.id);
  
  res.render("users/edit", {
    user: updateUser
  });
};
module.exports.postUpdate = async (req, res) => {
  var user = await User.findById(req.params.id);
  if(user){
     user.name = req.body.name;
    user.phone = req.body.phone;
    // user.email = req.body.email;
    // user.avatar = req.body.avatar;
  }
  var updateUser = await user.save();
  
  res.redirect("/users");
};
module.exports.profile = async (req, res) => {
  var user = await User.findById(req.params.id);
 
  res.render('users/profile', {
    user: user
  });
};
module.exports.avatar = async (req, res) => {
  var user = await User.findById(req.params.id);
  
  res.render('users/avatar', {
    user: user
  });
};
module.exports.postAvatar = async (req, res) => {
  var user = await User.findById(req.params.id);

  var file = req.files.avatar;
  cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
    if(user) {
      user.avatar = result.url;
    }
    var avatarUpdate = await user.save();
  });
  res.redirect('/users');
}
