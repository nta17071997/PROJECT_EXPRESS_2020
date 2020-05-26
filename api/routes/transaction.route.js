const express = require("express");
var router = express.Router();

const transactionController = require("../controllers/transaction.controller");

router.get("/", transactionController.index);
router.get("/create", transactionController.create);
router.post("/create", transactionController.postCreate);
router.get("/:id/complete", transactionController.complete);
router.get("/:id/edit", transactionController.edit);
router.post("/:id/edit", transactionController.postEdit);
router.get("/:id/delete", transactionController.delete);

module.exports = router;