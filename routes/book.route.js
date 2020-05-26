const express = require("express");
var router = express.Router();
const validate = require("../validate/book.validate");
const bookController = require("../controllers/book.controller");

router.get("/", bookController.index);
//book search
router.get("/search", bookController.search);
//books create
router.get("/create", bookController.create);
router.post("/create", validate.postCreate, bookController.postCreate);
// //books detelte
// router.get("/:id/delete", bookController.delete);
// //books update
// router.get("/:id/update", bookController.update);
// router.post("/:id/update", bookController.postUpdate);
module.exports = router;
