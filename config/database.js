//Cargando el modulo de mongoose
const mongoose = require('mongoose');
//Configurando la conexion para MongoDB, Debemos indicar el puerto y la IP de nuestra BD 


module.exports = {
    connect: function(){
        mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true});
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
        console.log('Mongodb is now connected!')
        });
    }
    ,
};