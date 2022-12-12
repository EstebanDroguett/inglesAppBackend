/*
Rutas de Usuarios / Auth
host + /api/roles
*/

//------------------------------------------------------------------------------------13----------------------------------------------------------------------------------
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middelwares/validate-fields');
const { getRoles, createRole, updateRole, deleteRole } = require('../controllers/roles');
const { validateJWT } = require('../middelwares/validate-jwt');
const { isAdmin } = require('../middelwares/roles');

const router = Router();

//Validar los datos
router.use(validateJWT);


//Obtener Roles
router.get('/', isAdmin, getRoles);

//Crear
router.post('/',
    [
        check('name', 'El rol es obligatorio.').not().isEmpty(),
        validateFields
    ],
    isAdmin, createRole);

//Actualizar 
router.put('/:id',
    [
        check('name', 'El rol es obligatorio.').not().isEmpty(),

        validateFields
    ], isAdmin, updateRole);

//Borrar 
router.delete('/:id', isAdmin, deleteRole);

module.exports = router;
//------------------------------------------------------------------------------------13----------------------------------------------------------------------------------