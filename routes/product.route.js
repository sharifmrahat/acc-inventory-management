const express = require("express");
const router = express.Router();
const productController = require("../controller/product.controller");

//-----------Get and Post--------------\\
router
  .route("/")
  .get(productController.getProduct)
  .post(productController.createProduct);

//-----------Update and Delete--------------\\
router
  .route("/:id")
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

//-----------Bulk-Update and Bulk-Delete--------------\\
router.route("/bulk-update").patch(productController.bulkUpdateProduct);
router.route("/bulk-delete").delete(productController.bulkDeleteProduct);

module.exports = router;
