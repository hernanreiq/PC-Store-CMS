'use strict'

var Product = require('../models/products');

var controller = {
    home: function(req, res){
        return res.status(200).send({
            message: "Home de la aplicación web"
        });
    },
    register: function(req, res){
        return res.status(200).send({
            message: "Estamos en la ventana de registro"
        });
    },
    test: function(req, res){
        return res.status(200).send({
            message: "Test de la aplicación web"
        });
    },
    saveProduct: function(req, res){
        // CREANDO EL PRODUCTO Y ASIGNANDO VALORES
        var product = new Product();
        var params = req.body;
        product.name = params.name;
        product.brand = params.brand;
        product.year = params.year;
        product.description = params.description;
        product.image = null;

        //GUARDANDO EL PRODUCTO EN LA BASE DE DATOS
        product.save((err, productStored) => {
            if(err) return res.status(500).send({message: "Hubo un error al guardar el producto"});
            if(!productStored) return res.status(404).send({message: "No se ha podido guardar el producto"});
            return res.status(200).send({product: productStored});
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
    getAllProducts: function(req, res){
        //BUSCANDO TODOS LOS PRODUCTOS EN LA BASE DE DATOS
        Product.find({}).sort({year: 1}).exec((err, products) => {
            if(err) return res.status(500).send({message: "Hubo un error al buscar los productos"});
            if(!products) return res.status(404).send({message: "No hay productos"});
            return res.status(200).send({products});
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
    }
};

module.exports = controller;