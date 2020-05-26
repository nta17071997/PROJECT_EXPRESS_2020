const express = require("express");
const router = express.Router();
const validate = require("../validate/user.validate");
const authController = require("../controllers/auth.controller");

//Auth
router.get("/login", authController.login);
router.post("/login", authController.postLogin);


module.exports = router;
