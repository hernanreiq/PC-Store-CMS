'use strict'
var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;

//Conectando una base de datos de MongoDB al proyecto
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/hrstore')
        .then(() => {
            console.log('Conexión a la base de datos de MongoDB realizada con éxito!');
            
            //CREACION DEL SERVIDOR
            app.listen(port, () =>{
                console.log('Servidor en línea en la URL localhost:'+ port);
            })
        })
        .catch(err => {
            console.log('Error al conectar con la base de datos de MongoDB: ', err);
        });
