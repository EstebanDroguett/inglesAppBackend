//------------------------------------------------------------------------------------14----------------------------------------------------------------------------------
const { response } = require('express');
const User = require('../models/User');

const getUsers = async (req, res = response) => {

    const users = await User.find()
        .populate('user', 'name');

    res.status(201).json({
        ok: true,
        users
    })
}

const createUser = async (req, res = response) => {

    const user = new User(req.body);

    try {
        user.user = req._id;

        const saveUser = await user.save();

        res.json({
            ok: true,
            user: saveUser
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador.'
        })
    }
}

const updateUser = async (req, res = response) => {

    const userId = req.params.id;
    const _id = req._id;

    try {

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: 'Este usuario no existe por ese id.'
            });
        }

        if (user.user.toString() !== _id) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este usuario.'
            });
        }

        const newUser = {
            ...req.body,
            user: _id
        }

        const updateUser = await User.findByIdAndUpdate(userId, newUser, { new: true });

        res.json({
            ok: true,
            user: updateUser
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador.'
        });
    }
}

const deleteUser = async (req, res = response) => {

    const userId = req.params.id;
    const _id = req._id;

    try {

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: 'Este usuario no existe por ese id.'
            });
        }

        if (user.user.toString() !== _id) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar este evento'
            });
        }

        await User.findByIdAndDelete(userId);

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
    getUsers,
    createUser,
    updateUser,
    deleteUser
}
//------------------------------------------------------------------------------------14----------------------------------------------------------------------------------