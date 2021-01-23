const express = require("express");
const {
  loignController,
  registercontroller,
} = require("./user/user.controller");
const router = express.Router();

router.post("/users/login", loignController);
router.post("/users/register", registercontroller);

module.exports = router;
