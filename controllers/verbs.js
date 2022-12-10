//------------------------------------------------------------------------------------14----------------------------------------------------------------------------------
const { response } = require('express');
const Verb = require('../models/Verb');

const getVerbs = async (req, res = response) => {

    const verbs = await Verb.find()
        .populate('user', 'name');

    res.status(201).json({
        ok: true,
        verbs
    })
}

const createVerb = async (req, res = response) => {

    const verb = new Verb(req.body);

    try {
        verb.user = req._id;

        const saveVerb = await verb.save();

        res.json({
            ok: true,
            verb: saveVerb
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador.'
        })
    }
}

const updateVerb = async (req, res = response) => {

    const verbId = req.params.id;
    const _id = req._id;

    try {

        const verb = await Verb.findById(verbId);

        if (!verb) {
            return res.status(404).json({
                ok: false,
                msg: 'El verbo no existe por ese id.'
            });
        }

        if (verb.user.toString() !== _id) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este verbo.'
            });
        }

        const newVerb = {
            ...req.body,
            user: _id
        }

        const updateVerb = await Verb.findByIdAndUpdate(verbId, newVerb, { new: true });

        res.json({
            ok: true,
            verb: updateVerb
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador.'
        });
    }
}

const deleteVerb = async (req, res = response) => {

    const verbId = req.params.id;
    const _id = req._id;

    try {

        const verb = await Verb.findById(verbId);

        if (!verb) {
            return res.status(404).json({
                ok: false,
                msg: 'El verbo no existe por ese id.'
            });
        }

        await Verb.findByIdAndDelete(verbId);

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
    getVerbs,
    createVerb,
    updateVerb,
    deleteVerb
}
//------------------------------------------------------------------------------------14----------------------------------------------------------------------------------