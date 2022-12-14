/*
Rutas de Usuarios / Auth
host + /api/words
*/

//------------------------------------------------------------------------------------13----------------------------------------------------------------------------------
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middelwares/validate-fields');
const { getWords, getOneWords, createWord, updateWord, deleteWord } = require('../controllers/words');
const { validateJWT } = require('../middelwares/validate-jwt');
const { isAdmin, isModerator } = require('../middelwares/roles');

const router = Router();

//Validar los datos
router.use(validateJWT);

//Obtener Palabras
router.get('/', getWords);

//Obtener solo una palabra
router.get('/:id', getOneWords);

//Crear
router.post('/',
    [
        check('word', 'La palabra es obligatoria.').not().isEmpty(),
        check('meaning', 'El significado es obligatorio.').not().isEmpty(),
        validateFields
    ],
    createWord);

//Actualizar 
router.put('/:id',
    [
        check('word', 'La palabra es obligatoria.').not().isEmpty(),
        check('meaning', 'El significado es obligatorio.').not().isEmpty(),
        validateFields
    ], updateWord);

//Borrar 
router.delete('/:id', [isAdmin, isModerator], deleteWord);

module.exports = router;
//------------------------------------------------------------------------------------13----------------------------------------------------------------------------------