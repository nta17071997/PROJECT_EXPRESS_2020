const express = require("express");
var multer  = require('multer');
const router = express.Router();
const validate = require("../../validate/user.validate");
const userController = require("../controllers/user.controller");
var upload = multer({ dest: './public/uploads/' })

var authMiddleware = require("../../middlewares/auth.middleware");

//USERS
router.get("/", authMiddleware.requireAuth, userController.index);
//USERS SEARCH
router.get("/search", authMiddleware.requireAuth, userController.search);
//CREATE USER
router.get("/create", authMiddleware.requireAuth, userController.create);
router.post("/create", validate.postCreate, authMiddleware.requireAuth, userController.postCreate);
//DELETE USER
router.get("/delete/:id", authMiddleware.requireAuth, userController.delete);
//EDIT USERS
router.get("/update/:id", authMiddleware.requireAuth, userController.update);
router.post("/update/:id", authMiddleware.requireAuth, userController.postUpdate);
//Change Avatar
router.get("/profile/:id", authMiddleware.requireAuth, userController.profile);
router.get('/profile/avatar/:id', authMiddleware.requireAuth, userController.avatar);
router.post('/profile/avatar/:id', authMiddleware.requireAuth, userController.postAvatar);

module.exports = router;
