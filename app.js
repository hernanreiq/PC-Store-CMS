'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// cargar archivos de rutas
var products_routes = require('./routes/products');

//middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//cors

//rutas
app.use('/', products_routes);

//exportar
module.exports = app;