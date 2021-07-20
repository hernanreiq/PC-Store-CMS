'use stric'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//CREACION DE LA ESTRUCTURA QUE TENDRÁN LOS OBJETOS EN MongoDB
var ProductSchema = Schema({
    nombre: String,
    marca: String,
    year: Number,
    description: Object
});

module.exports = mongoose.model('Product', ProductSchema);