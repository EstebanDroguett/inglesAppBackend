/*
Rutas de Usuarios / Auth
host + /api/verbs
*/

//------------------------------------------------------------------------------------13----------------------------------------------------------------------------------
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middelwares/validate-fields');
const { getVerbs, createVerb, updateVerb, deleteVerb } = require('../controllers/verbs');
const { validateJWT } = require('../middelwares/validate-jwt');
const { isAdmin, isModerator } = require('../middelwares/roles');

const router = Router();

//Validar los datos
router.use(validateJWT);


//Obtener Verbos
router.get('/', getVerbs);

//Crear
router.post('/',
    [
        check('verb', 'El verbo es obligatorio').not().isEmpty(),
        check('meaning', 'El significado es obligatorio').not().isEmpty(),
        check('presentSimple', 'El Presente Simple es obligatorio').not().isEmpty(),
        check('presentContinuous', 'El Presente Continuo es obligatorio').not().isEmpty(),
        check('presentPerfect', 'El Presente Perfecto es obligatorio').not().isEmpty(),
        check('presentPerfectContinuous', 'El Presente Perfecto Continuo es obligatorio').not().isEmpty(),
        check('pastSimple', 'El Pasado Simple es obligatorio').not().isEmpty(),
        check('pastContinuous', 'El Pasado Continuo es obligatorio').not().isEmpty(),
        check('pastPerfect', 'El Pasado Perfecto es obligatorio').not().isEmpty(),
        check('pastPerfectContinuous', 'El Pasado Perfecto Continuo es obligatorio').not().isEmpty(),
        check('futureSimple', 'El Futuro Simple es obligatorio').not().isEmpty(),
        check('futureContinuous', 'El Futuro Continuo es obligatorio').not().isEmpty(),
        check('futurePerfect', 'El Futuro Perfecto es obligatorio').not().isEmpty(),
        check('futurePerfectContinuous', 'El Futuro Perfecto Continuo es obligatorio').not().isEmpty(),
        validateFields
    ],
    createVerb);

//Actualizar 
router.put('/:id',
    [
        check('verb', 'El verbo es obligatorio').not().isEmpty(),
        check('meaning', 'El significado es obligatorio').not().isEmpty(),
        check('presentSimple', 'El Presente Simple es obligatorio').not().isEmpty(),
        check('presentContinuous', 'El Presente Continuo es obligatorio').not().isEmpty(),
        check('presentPerfect', 'El Presente Perfecto es obligatorio').not().isEmpty(),
        check('presentPerfectContinuous', 'El Presente Perfecto Continuo es obligatorio').not().isEmpty(),
        check('pastSimple', 'El Pasado Simple es obligatorio').not().isEmpty(),
        check('pastContinuous', 'El Pasado Continuo es obligatorio').not().isEmpty(),
        check('pastPerfect', 'El Pasado Perfecto es obligatorio').not().isEmpty(),
        check('pastPerfectContinuous', 'El Pasado Perfecto Continuo es obligatorio').not().isEmpty(),
        check('futureSimple', 'El Futuro Simple es obligatorio').not().isEmpty(),
        check('futureContinuous', 'El Futuro Continuo es obligatorio').not().isEmpty(),
        check('futurePerfect', 'El Futuro Perfecto es obligatorio').not().isEmpty(),
        check('futurePerfectContinuous', 'El Futuro Perfecto Continuo es obligatorio').not().isEmpty(),
        validateFields
    ], updateVerb);

//Borrar 
router.delete('/:id',[isAdmin, isModerator], deleteVerb); // Cuando son multiples roles, se colocan en conrchetes

module.exports = router;
//------------------------------------------------------------------------------------13----------------------------------------------------------------------------------