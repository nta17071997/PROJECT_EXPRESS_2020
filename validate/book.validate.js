module.exports.postCreate = (req, res, next) => {
    var errors = [];
    if(!req.body.title){
      errors.push("Title is required.");
    }
    if(!req.body.description){
      errors.push("Description is required.");
    }
    if(errors.length){
      res.render("books/create", {
        errors: errors,
        values: req.body
      });
      return;
    }
    next();
  };