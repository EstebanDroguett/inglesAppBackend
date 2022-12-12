/*
Rutas de Usuarios / Auth
host + /api/users
*/

//------------------------------------------------------------------------------------13----------------------------------------------------------------------------------
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middelwares/validate-fields');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users');
const { validateJWT } = require('../middelwares/validate-jwt');
const { isAdmin } = require('../middelwares/roles');

const router = Router();

//Validar los datos
router.use(validateJWT);


//Obtener Palabras
router.get('/', getUsers);

//Crear
router.post('/',
    [
        check('user', 'El usuario es obligatorio.').not().isEmpty(),
        check('meaning', 'El significado es obligatorio.').not().isEmpty(),
        validateFields
    ],
    createUser);

//Actualizar 
router.put('/:id',
    [
        check('user', 'El usuario es obligatorio.').not().isEmpty(),
        check('meaning', 'El significado es obligatorio.').not().isEmpty(),
        validateFields
    ], updateUser);

//Borrar 
router.delete('/:id', [isAdmin], deleteUser);

module.exports = router;
//------------------------------------------------------------------------------------13----------------------------------------------------------------------------------