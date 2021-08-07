'use strict'

var express = require('express');
var productController = require('../controllers/products');

var router = express.Router();

router.get('/', productController.home);
router.get('/create-product', productController.createProduct);     //PANTALLA
router.post('/create-product', productController.saveProduct);      //FUNCION
router.get('/get-all-products', productController.getAllProducts);  //PANTALLA
router.get('/get-product/:id?', productController.getProduct);      //PANTALLA
router.put('/update-product/:id', productController.updateProduct);
router.get('/remove-product/:id', productController.removeProduct); //FUNCION
router.get('/feedback', productController.feedback);                //PANTALLA

module.exports = router;