'use strict'

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
    }
};

module.exports = controller;