'use strict'

var Product = require('../models/products');
var fs = require('fs'); // LIBRERIA PARA BORRAR ARCHIVOS
var contenidoJSON = {};
var controller = {
    home: function(req, res){
        //CONFIGURANDO LA INFORMACION DE ESTA PANTALLA
        contenidoJSON.window = "Create and see all the products";
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
        product.quantity = params.quantity_product;
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
        contenidoJSON.window = "See, update or remove a product";
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
                contenidoJSON.products = products;
                contenidoJSON.products_length = products.length;
                res.render('get-all-products', contenidoJSON);
            }
        });
    },
    removeProduct: function(req, res){
        var productId = req.params.id;

        //BUSCAR EL PRODUCTO PARA BORRARLE LA FOTO
        Product.findById(productId, (err, product) => {
            if(err){
                contenidoJSON.type_feedback = "fa-exclamation-circle text-danger";
                contenidoJSON.message = "500 - There was an error searching for the product";
                res.redirect('/feedback');
            } else if(!product){
                contenidoJSON.type_feedback = "fa-exclamation-circle text-info";
                contenidoJSON.message = "404 - Product does not exist";
            } else if(res.status(200)){
                //SI EL PRODUCTO EXISTE ENTONCES SE LE BORRA LA FOTO
                var filePath = './public/img/products/' + product.image; 
                fs.unlink(filePath, (err) => {                    
                    //BUSCAR POR ID Y ELIMINAR EL PRODUCTO
                    Product.findByIdAndRemove(productId, (err, productRemoved) => {
                        if(err){
                            contenidoJSON.type_feedback = "fa-exclamation-circle text-danger";
                            contenidoJSON.message = "500 - There was an error removing the product";
                        } else if(!productRemoved){
                            contenidoJSON.type_feedback = "fa-exclamation-circle text-info";
                            contenidoJSON.message = "404 - Product does not exist";
                        } else if(res.status(200)){
                            contenidoJSON.type_feedback = "fa-check-circle text-success";
                            contenidoJSON.message = "Product deleted successfully!";
                        }
                    });
                });
            }
            res.redirect('/feedback');
        });
    },
    getProduct: function(req, res){
        contenidoJSON.window = "Product details";
        contenidoJSON.home_button = "d-block";
        //OBTENER EL ID PARA HACER LA BÚSQUEDA
        var productId = req.params.id;

        //COMPROBAR QUE EL ID SE HAYA ENVIADO POR GET
        if(productId != null) {            
            //BUSCANDO EL PRODUCTO EN LA BASE DE DATOS
            Product.findById(productId, (err, product) => {
                if(err){
                    contenidoJSON.type_feedback = "fa-exclamation-circle text-danger";
                    contenidoJSON.message = "500 - There was an error searching for the product";
                    res.redirect('/feedback');
                } else if(!product){
                    contenidoJSON.type_feedback = "fa-exclamation-circle text-info";
                    contenidoJSON.message = "404 - Product does not exist";
                    res.redirect('/feedback');
                } else if(res.status(200)){
                    contenidoJSON.currentProduct = product;
                    res.render('get-product', contenidoJSON);
                }
            });
        } else {
            contenidoJSON.type_feedback = "fa-exclamation-circle text-info";
            contenidoJSON.message = "404 - Product does not exist";
            res.redirect('/feedback');
        }
        
    },
    productUpdater: function(req, res){
        contenidoJSON.window = "Product updater";
        contenidoJSON.home_button = "d-block";
        //OBTENER EL ID PARA HACER LA BÚSQUEDA
        var productId = req.params.id;

        //COMPROBAR QUE EL ID SE HAYA ENVIADO POR GET
        if(productId != null) {            
            //BUSCANDO EL PRODUCTO EN LA BASE DE DATOS
            Product.findById(productId, (err, product) => {
                if(err){
                    contenidoJSON.type_feedback = "fa-exclamation-circle text-danger";
                    contenidoJSON.message = "500 - There was an error searching for the product";
                    res.redirect('/feedback');
                } else if(!product){
                    contenidoJSON.type_feedback = "fa-exclamation-circle text-info";
                    contenidoJSON.message = "404 - Product does not exist";
                    res.redirect('/feedback');
                } else if(res.status(200)){
                    contenidoJSON.currentProduct = product;
                    res.render('product-updater', contenidoJSON);
                }
            });
        } else {
            contenidoJSON.type_feedback = "fa-exclamation-circle text-info";
            contenidoJSON.message = "404 - Product does not exist";
            res.redirect('/feedback');
        }
    },
    updateProduct: function(req, res){
        //OBTENEMOS EL ID Y LOS DATOS PASADOS POR POST
        var productId = req.params.id;
        var update = req.body;
        //BUSCAR POR ID Y ACTUALIZAR
        Product.findByIdAndUpdate(productId, update, {new:true}, (err, productUpdated) => {
            if(err){
                contenidoJSON.type_feedback = "fa-exclamation-circle text-danger";
                contenidoJSON.message = "500 - There was an error updating the product";
            } else if(!productUpdated){
                contenidoJSON.type_feedback = "fa-exclamation-circle text-info";
                contenidoJSON.message = "404 - Product does not exist";
            } else if(res.status(200)){
                contenidoJSON.type_feedback = "fa-check-circle text-success";
                contenidoJSON.message = "Product updated successfully!";
            }
            res.redirect('/feedback');
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
    },
    uploadImage: function(req, res){
        contenidoJSON.window = "Product details";
        contenidoJSON.home_button = "d-block";
		var productId = req.params.id;
		if(req.files){
            //BLOQUE DE CODIGO PARA OBTENER EL NOMBRE DEL ARCHIVO
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[3];
            //BLOQUE DE CODIGO PARA OBTENER LA EXTENSION
            var extSplit = fileName.split('\.');
            var fileExt = extSplit[1];

            //SI ES UNA EXTENSIÓN DE ARCHIVO PERMITIDA ENTONCES SE GUARDARÁ
            if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){
                //BUSCAR EL PRODUCTO PARA BORRARLE LA FOTO VIEJA
                Product.findById(productId, (err, product) => {
                    if(res.status(200)){
                        //SI EL PRODUCTO EXISTE ENTONCES SE LE BORRA LA FOTO VIEJA
                        var oldFilePath = './public/img/products/' + product.image; 
                        fs.stat(oldFilePath, (err, stat) => {
                            if(err, stat){
                                fs.unlink(oldFilePath, (err) => {});
                            }
                            Product.findByIdAndUpdate(productId, {image: fileName}, {new: true}, (err, productUpdated) => {
                                if(err){
                                    contenidoJSON.type_feedback = "fa-exclamation-circle text-danger";
                                    contenidoJSON.message = "500 - There was an error uploading the image";
                                    res.redirect('/feedback');
                                } else if(!productUpdated){
                                    contenidoJSON.type_feedback = "fa-exclamation-circle text-info";
                                    contenidoJSON.message = "404 - Product does not exist";
                                    res.redirect('/feedback');
                                } else if(res.status(200)){
                                    contenidoJSON.currentProduct = productUpdated;
                                    res.render('get-product', contenidoJSON);
                                }
                            });
                        });
                    }
                });
            } else { // SI NO ES PERMITIDA ENTONCES SE BORRARÁ ESE ARCHIVO
                fs.unlink(filePath, (err) => {
                    contenidoJSON.type_feedback = "fa-exclamation-circle text-danger";
                    contenidoJSON.message = "500 - That type of files is not valid";
                    res.redirect('/feedback');
                });
            }
        } else {
            contenidoJSON.type_feedback = "fa-exclamation-circle text-danger";
            contenidoJSON.message = "500 - Image not uploaded";
            res.redirect('/feedback');
        }
	}
};

module.exports = controller;