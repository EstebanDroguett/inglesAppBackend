//------------------------------------------------------------------------------------1----------------------------------------------------------------------------------
const express = require('express');
require('dotenv').config();
//------------------------------------------------------------------------------------1----------------------------------------------------------------------------------
const cors = require('cors');
const {dbConenction} = require('./database/config');

//------------------------------------------------------------------------------------1----------------------------------------------------------------------------------
//Crear servidor de express
const app = express();
//------------------------------------------------------------------------------------1----------------------------------------------------------------------------------

//Base de datos
dbConenction();

//CORS
app.use(cors());

//Directorio Público
app.use( express.static('public'));

//Lectura y parseo del body
app.use(express.json());

//------------------------------------------------------------------------------------1----------------------------------------------------------------------------------
//Rutas
//------------------------------------------------------------------------------------3----------------------------------------------------------------------------------
app.use('/api/auth', require('./routes/auth'));
//------------------------------------------------------------------------------------3----------------------------------------------------------------------------------
app.use('/api/roles', require('./routes/roles'));
app.use('/api/users', require('./routes/users'));
app.use('/api/words', require('./routes/words'));
//------------------------------------------------------------------------------------1----------------------------------------------------------------------------------

//Al recargar la página ya en deploy, ésta no tendra problemas en recibir el url correspondiente
app.get('*', (req, res) => {
    res.sendFile( __dirname + '/public/index.html' );
});
    
//------------------------------------------------------------------------------------1----------------------------------------------------------------------------------
//Escuchar peticiones (Crear archivo .env con el PORT=4000 en su contenido)
app.listen(process.env.PORT, () =>{
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
});
//------------------------------------------------------------------------------------1----------------------------------------------------------------------------------