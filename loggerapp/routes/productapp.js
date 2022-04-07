var express = require("express");
var router = express.Router();
let product = [];
router.get("/", function (req, res) {
  res.json(product);
});
router.post("/", function (req, res) {
  let { name, price, description, category, status } = req.body;
  console.log(req.body);
  product.push({ name, price, description, category, status });
  res.json({ status: "Adding Product Sucessfully" });
});
router.delete("/:indexToDelete", (req, res) => {
  let newProducts = product.filter((val, index) => {
    if (index === parseInt(req.params.indexToDelete)) {
      return false;
    } else {
      return true;
    }
  });
  product = newProducts;
  res.json({ status: "deleted successfull" });
});
router.get("/deleteall", (req, res) => {
  product = [];
  res.json({ status: "All Products Deleted Successfully" });
});
module.exports = router;
