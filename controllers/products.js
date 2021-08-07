'use strict'

var Product = require('../models/products');
var contenidoJSON = {};
var controller = {
    home: function(req, res){
        //CONFIGURANDO LA INFORMACION DE ESTA PANTALLA
        contenidoJSON.window = "Create, See, Update and Delete products";
        contenidoJSON.home_button = "d-none";
        res.status(200).render('index', contenidoJSON);
    },
    createProduct: function(req, res){
        //CONFIGURANDO LA INFORMACION DE ESTA PANTALLA
        contenidoJSON.window = "Create a product";
        contenidoJSON.home_button = "d-block";
        res.status(200).render('create-product', contenidoJSON);
    },
    saveProduct: function(req, res){
        // CREANDO EL PRODUCTO Y ASIGNANDO VALORES
        var product = new Product();
        var params = req.body;
        product.name = params.name_product;
        product.brand = params.brand_product;
        product.year = params.year_product;
        product.description = params.description_product;
        product.image = null;

        //GUARDANDO EL PRODUCTO EN LA BASE DE DATOS
        product.save((err, productStored) => {
            if(err){
                contenidoJSON.type_feedback = "fa-exclamation-circle text-danger";
                contenidoJSON.message = "500 - Error creating product";
            } else if(!productStored){
                contenidoJSON.type_feedback = "fa-exclamation-circle text-info";
                contenidoJSON.message = "404 - Product could not be created";
            } else if(res.status(200)){
                contenidoJSON.type_feedback = "fa-check-circle text-success";
                contenidoJSON.message = "Successfully created product!";
            }
            res.redirect('/feedback');
        });
    },
    getAllProducts: function(req, res){
        contenidoJSON.window = "See all products";
        contenidoJSON.home_button = "d-block";
        //BUSCANDO TODOS LOS PRODUCTOS EN LA BASE DE DATOS
        Product.find({}).sort({year: 1}).exec((err, products) => {
            if(err){
                contenidoJSON.type_feedback = "fa-exclamation-circle text-danger";
                contenidoJSON.message = "500 - There was an error searching for the products";
                res.redirect('/feedback');
            } else if(!products){
                contenidoJSON.type_feedback = "fa-exclamation-circle text-info";
                contenidoJSON.message = "404 - There are no products";
                res.redirect('/feedback');
            } else if(res.status(200)){
                contenidoJSON.type_feedback = "fa-check-circle text-success";
                contenidoJSON.message = "Successfully created product!";
                contenidoJSON.products = products;
                contenidoJSON.products_length = products.length;
                res.render('get-all-products', contenidoJSON);
            }
        });
    },
    getProduct: function(req, res){
        //OBTENER EL ID PARA HACER LA BÚSQUEDA
        var productId = req.params.id;

        //COMPROBAR QUE EL ID SE HAYA ENVIADO POR GET
        if(productId == null) return res.status(404).send({message: "El producto no existe"});
        
        //BUSCANDO EL PRODUCTO EN LA BASE DE DATOS
        Product.findById(productId, (err, product) => {
            if(err) return res.status(500).send({message: "Hubo un error al buscar el producto"});
            if(!product) return res.status(404).send({message: "El producto no existe"});
            return res.status(200).send({product});
        });
    },
    updateProduct: function(req, res){
        //OBTENEMOS EL ID Y LOS DATOS PASADOS POR POST
        var productId = req.params.id;
        var update = req.body;
        //BUSCAR POR ID Y ACTUALIZAR
        Product.findByIdAndUpdate(productId, update, {new:true}, (err, productUpdated) => {
            if(err) return res.status(500).send({message: "Hubo un error al actualizar el producto"});
            if(!productUpdated) return res.status(404).send({message: "El producto no existe"});
            return res.status(200).send({product: productUpdated});
        });
    },
    removeProduct: function(req, res){
        var productId = req.params.id;
        //BUSCAR POR ID Y ELIMINAR EL PRODUCTO
        Product.findByIdAndRemove(productId, (err, productRemoved) => {
            if(err) return res.status(500).send({message: "Hubo un error al eliminar el producto"});
            if(!productRemoved) return res.status(404).send({message: "El producto no existe"});
            return res.status(200).send({product: productRemoved});
        });
    },
    feedback: function(req, res){
        contenidoJSON.window = "Feedback";
        contenidoJSON.home_button = "d-block";
        if(contenidoJSON.type_feedback == "" || contenidoJSON == ""){
            contenidoJSON.type_feedback = "fa-exclamation-circle text-info";
            contenidoJSON.message = "There is nothing to show";
        }
        res.status(200).render('feedback', contenidoJSON);
        contenidoJSON.type_feedback = "";
        contenidoJSON.message = "";
    }
};

module.exports = controller;