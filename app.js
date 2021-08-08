'use strict'

var express = require('express');
var bodyParser = require('body-parser');
const path = require('path');

var app = express();

// cargar archivos de rutas
var products_routes = require('./routes/products');

//SETTINGS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//archivos estaticos - static files
app.use(express.static(path.join(__dirname, 'public')));

//middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//cors y cabeceras
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//rutas
app.use('/', products_routes);

//exportar
module.exports = app;