const express = require('express');
const router = express.Router();
const productController = require('../controllers/Products')

router.get("/getproducts", productController.getAllProducts);
router.post("/addproducts", productController.addProducts);
router.get('/showpro', productController.showLimitedProducts);
router.get('/productconditions', productController.showProductsWithConditions);
router.get("/:id", productController.getProductId);
router.post('/update/:id', productController.updateProducts);
router.post('/delete/:id', productController.deleteProduct);


module.exports = router;