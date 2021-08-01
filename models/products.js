'use stric'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//CREACION DE LA ESTRUCTURA QUE TENDRÁN LOS OBJETOS EN MongoDB
var ProductSchema = Schema({
    name: String,
    brand: String,
    year: Number,
    description: String,
    image: String
});

module.exports = mongoose.model('Product', ProductSchema);