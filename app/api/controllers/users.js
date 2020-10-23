// Cargamos el modelo recien creado
const userModel = require('../models/users');
// Cargamos el módulo de bcrypt
const bcrypt = require('bcrypt'); 
// Cargamos el módulo de jsonwebtoken
const jwt = require('jsonwebtoken');
const app = require('express');

// Codificamos las operaciones que se podran realizar con relacion a los usuarios
module.exports = {
 create: async function(req, res, next) {
  const userExists = await userModel.exists({email: req.body.email});
  if(!userExists){
    userModel.create({
      nombre: req.body.nombre, 
      apellido: req.body.apellido, 
      fechaDeNacimiento: req.body.fechaDeNacimiento, 
      estamento: req.body.estamento,
      residencia: req.body.residencia,
      nivelDeAcceso: 0,
      email: req.body.email, 
      password: req.body.password 
    }, 
    function (err, result) {
      if (err) 
       next(err);
      else{
        res.json({status: "Ok", message: "Usuario agregado exitosamente!!!", data: null});
      }
      
    });
  } else {
    res.status(500).json({status: "error", message: "Email invalido. Ya existe cuenta con este email"})
    next();
  }
  
 },
authenticate: async function(req, res, next) {
  let email = req.body.email;
  let password = req.body.password;
  if(email !== undefined || password !== undefined){
    await userModel.findOne({email:email}, function(err, userInfo){
      if (err) {
       next(err);
      } else {
       if(bcrypt.compareSync(password, userInfo.password)) {
         const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '1h' });
         res.json({status:"Ok", message: "El usuario ha sido autenticado!!!", data:{user: userInfo, token:token}});
       }else{
         res.json({status:"error", message: "Invalid email/password!!", data:null});
       }
      }
     });
  }
  
 },

}