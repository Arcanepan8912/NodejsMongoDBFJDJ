// Explica la constantes/modulos que requiere para establecer la conexión
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./bd/conexion.js');
const cors = require('cors');

//Especifica el puerto que se requiere para conectarse a la BD de MongoDB
require('dotenv').config({path:'./.evn'});
const port = process.env.PORT || 3000;
const app = express();

app
    .use(bodyParser.json())
    .use(cors())
    .use((req, res, next) => {
        res.setHeader('Acces-Control-Allow-Origin', '*');
        next();    
    })
    .use('/', require('./routes'));

mongodb.initDb((e, mongodb) => {
    if (e) {
        console.log(e);
    } else {
        app.listen(port);
        //Nos notifica que se logró la conexión al puerto
        console.log(`Conexión Exitosa en puerto: ${port}`);
    }
});