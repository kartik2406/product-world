const express = require("express");
const { getProductsController } = require("./product/product.controller");
const {
  loignController,
  registercontroller,
} = require("./user/user.controller");
const router = express.Router();

router.post("/users/login", loignController);
router.post("/users/register", registercontroller);

router.get("/products", getProductsController);

module.exports = router;
