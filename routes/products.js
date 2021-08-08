'use strict'

var express = require('express');
var productController = require('../controllers/products');

var router = express.Router();

//MIDDLEWARE
var multipart = require('connect-multiparty');
//RUTA DONDE SE GUARDARÁN LAS IMAGENES
var multipartMiddleware = multipart({uploadDir: './public/img/products'});

router.get('/', productController.home);
router.get('/create-product', productController.createProduct);     //PANTALLA
router.post('/create-product', productController.saveProduct);      //FUNCION
router.get('/get-all-products', productController.getAllProducts);  //PANTALLA
router.get('/get-product/:id?', productController.getProduct);      //PANTALLA
router.put('/update-product/:id', productController.updateProduct);
router.get('/remove-product/:id', productController.removeProduct); //FUNCION
router.get('/feedback', productController.feedback);                //PANTALLA
// EL MIDDLEWARE SE EJECUTA ANTES QUE EL METODO
router.post('/upload-image/:id', multipartMiddleware, productController.uploadImage); //FUNCION
module.exports = router;