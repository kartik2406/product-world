const express = require("express");
const { paymentGatewayController } = require("./cart/cart.controller");
const { getProductsController } = require("./product/product.controller");
const {
  loignController,
  registercontroller,
} = require("./user/user.controller");
const router = express.Router();
const { authenticateUser } = require("../utils/authenticationMiddleWare");

router.post("/users/login", loignController);
router.post("/users/register", registercontroller);

router.get("/products", getProductsController);

router.post("/cart/checkout", authenticateUser, paymentGatewayController);

module.exports = router;
