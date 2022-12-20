//------------------------------------------------------------------------------------14----------------------------------------------------------------------------------
const { response } = require('express');
const Word = require('../models/Word');

const getWords = async (req, res = response) => {

    const words = await Word.find();

    res.status(201).json({
        ok: true,
        words
    })
}

const createWord = async (req, res = response) => {

    try {
        //Destructuración de objeto req.body para obtener campos de word y meaning en bruto
        const { word, meaning } = req.body;
        //Configuración de variable la cual guarda el id del usuario logeado
        const user = req._id;
        //El find  lo hace por la palabra en bruto, ya que se tiene el string puro y no por todo el objeto
        const verifyWord = await Word.findOne({ word });
        //expRegText = /^\s+$/;

        //if(expRegText.test(word)){
        if (verifyWord) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Esta palabra ya existe.'
                })
            }
        //}

        const saveWord = await Word.create({ word, meaning, user });

        res.json({
            ok: true,
            word: saveWord
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador.'
        })
    }
}

const updateWord = async (req, res = response) => {

    const wordId = req.params.id;
    const _id = req._id;

    try {

        const word = await Word.findById(wordId);

        if (!word) {
            return res.status(404).json({
                ok: false,
                msg: 'Esta palabra no existe por ese id.'
            });
        }

        if (word.user.toString() !== _id) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar esta palabra.'
            });
        }

        const newWord = {
            ...req.body,
            user: _id
        }

        const updateWord = await Word.findByIdAndUpdate(wordId, newWord, { new: true });

        res.json({
            ok: true,
            word: updateWord
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador.'
        });
    }
}

const deleteWord = async (req, res = response) => {

    const wordId = req.params.id;

    try {

        const word = await Word.findById(wordId);

        if (!word) {
            return res.status(404).json({
                ok: false,
                msg: 'Esta palabra no existe por ese id.'
            });
        }

        await Word.findByIdAndDelete(wordId);

        res.json({
            ok: true
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador.'
        });
    }
}

module.exports = {
    getWords,
    createWord,
    updateWord,
    deleteWord
}
//------------------------------------------------------------------------------------14----------------------------------------------------------------------------------