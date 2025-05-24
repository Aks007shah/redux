const express = require('express');
const router = express.Router();
const newProducts = require('../controllers/ProductsNew')

router.route('/get').get(newProducts.getAllProducts)
router.route('/add').post(newProducts.addProducts)
router.route('/:id').put(newProducts.editProduct)
router.route('/:id').post(newProducts.deleteProduct)

module.exports = router;