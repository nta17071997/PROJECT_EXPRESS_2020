const express = require("express");
var router = express.Router();
const validate = require("../../validate/book.validate");
const bookController = require("../../controllers/book.controller");

router.get("/", bookController.index);
//book search
router.get("/search", bookController.search);
//books create
router.get("/create", bookController.create);
router.post("/create", validate.postCreate, bookController.postCreate);

module.exports = router;
