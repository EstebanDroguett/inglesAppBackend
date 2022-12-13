/*
Rutas de Usuarios / Auth
host + /api/users
*/

//------------------------------------------------------------------------------------13----------------------------------------------------------------------------------
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middelwares/validate-fields');
const { getUsers,getOneUsers, updateUser, deleteUser } = require('../controllers/users');
const { validateJWT } = require('../middelwares/validate-jwt');
const { isAdmin } = require('../middelwares/roles');

const router = Router();

//Validar los datos
router.use(validateJWT);


//Obtener Usuarios
router.get('/', isAdmin, getUsers);

//Obtener solo un usuario
router.get('/:id', getOneUsers);

//Actualizar 
router.put('/:id',
    [
        check('name', 'El nombres obligatorio.').not().isEmpty(),
        check('lastName', 'El apellido es obligatorio.').not().isEmpty(),
        check('email', 'El correo es obligatorio.').not().isEmpty(),
        check('password', 'La contraseña es obligatoria.').not().isEmpty(),
        check('role', 'El rol es obligatoria.').not().isEmpty(),
        validateFields
    ], updateUser);

//Borrar 
router.delete('/:id', isAdmin, deleteUser);

module.exports = router;
//------------------------------------------------------------------------------------13----------------------------------------------------------------------------------