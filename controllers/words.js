//------------------------------------------------------------------------------------14----------------------------------------------------------------------------------
const { response } = require('express');
const Word = require('../models/Word');

const getWords = async (req, res = response) => {

    const words = await Word.find()
        .populate('user', 'name');

    res.status(201).json({
        ok: true,
        words
    })
}

const createWord = async (req, res = response) => {

    const word = new Word(req.body);

    try {
        word.user = req._id;

        const saveWord = await word.save();

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
    const _id = req._id;

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