/*
Rutas de Usuarios / Auth
host + /api/roles
*/

//------------------------------------------------------------------------------------13----------------------------------------------------------------------------------
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middelwares/validate-fields');
const { getRoles, createRole, deleteRole } = require('../controllers/roles');
const { validateJWT } = require('../middelwares/validate-jwt');

const router = Router();

//Validar los datos
router.use(validateJWT);


//Obtener Roles
router.get('/', getRoles);

//Crear
router.post('/',
    [
        check('name', 'El rol es obligatorio').not().isEmpty(),
        validateFields
    ],
    createRole);

//Borrar 
router.delete('/:id', deleteRole);

module.exports = router;
//------------------------------------------------------------------------------------13----------------------------------------------------------------------------------