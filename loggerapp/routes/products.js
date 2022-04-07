var express = require("express");
var router = express.Router();
var productsController = require("../controllers/products");
router.get("/", productsController.productsIndex);
router.get("/details", productsController.productDetails);

module.exports = router;
