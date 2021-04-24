const express = require('express');
require('dotenv').config();

const port = process.env.PORT;


const app = express(); //Creando el servidor de express


//Levantar el servidor

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
})

// Directorio publico
app.use(express.static('build'))

// Rutas

app.use('/', require('./routes/mainRout'))