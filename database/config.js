//------------------------------------------------------------------------------------6----------------------------------------------------------------------------------

const moongose = require('mongoose');

const dbConenction = async() => {

    try {
       await moongose.connect(process.env.DB_CNN);
       console.log('DB Online')
    } catch (error) {
        console.log(error);
        throw new Error('Error al inicializar DB');
    }
}

module.exports = {
    dbConenction
}
//------------------------------------------------------------------------------------6----------------------------------------------------------------------------------
