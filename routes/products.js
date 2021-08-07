'use strict'

var express = require('express');
var productController = require('../controllers/products');

var router = express.Router();

router.get('/', productController.home);
router.get('/create-product', productController.createProduct);
router.post('/create-product', productController.saveProduct);
router.get('/get-all-products', productController.getAllProducts);
router.get('/get-product/:id?', productController.getProduct);
router.put('/update-product/:id', productController.updateProduct);
router.delete('/remove-product/:id', productController.removeProduct);
router.get('/feedback', productController.feedback);

module.exports = router;