// Cargamos el módulo de mongoose
const mongoose = require('mongoose');
// Cargamos el módulo de bcrypt
const bcrypt = require('bcrypt');
// Definimos el factor de costo, el cual controla cuánto tiempo se necesita para calcular un solo hash de BCrypt. Cuanto mayor sea el factor de costo, más rondas de hash se realizan. Cuanto más tiempo sea necesario, más difícil será romper el hash con fuerza bruta.
const saltRounds = 10;
//Definimos los esquemas
const Schema = mongoose.Schema;
// Creamos el objeto del esquema con sus correspondientes campos
const EventoSchema = new Schema({
 nombre: {
  type: String,
  trim: false,  
  required: true,
 },
 organizador: {
     type: String
 },
 fechaCreacion:{
     type: Date,
     required: true
 },
 fechaUltimaMod: {
     type: Date,
     required: true,
 },
 tipo:{
     type:String,
     required:true,
 },
 ubicacion: {
     nombre: {type: String},
     lat: {type: Number},
     long: {type: Number}
 },
 asistentes: {type: Array, required: true},
 imagen: {
  type: String,
  trim: true,
  required: true
 },
 descripcion: {
  type: String,
  required: true
 },
 tags: {
     type: Array,
     required: true
 }

});

// Exportamos el modelo para usarlo en otros ficheros
module.exports = mongoose.model('Evento', EventoSchema);