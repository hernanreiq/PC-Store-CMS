'use strict'

var express = require('express');
var productController = require('../controllers/products');

var router = express.Router();

router.get('/', productController.home);
router.get('/register', productController.register);
router.post('/test', productController.test);

module.exports = router;