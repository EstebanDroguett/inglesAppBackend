//------------------------------------------------------------------------------------14----------------------------------------------------------------------------------
const { response } = require('express');
const User = require('../models/User');

const getUsers = async (req, res = response) => {

    try {
        const users = await User.find({}, '_id name lastName email role createdAt updatedAt').populate('role');
    
        res.status(201).json({
            ok: true,
            users
        });        
    } catch (error) {
        console.log(error);
    }
}

const getOneUsers = async (req, res = response) => {

    try {
        const id = req.params.id;
        const users = await User.findById(id, '_id name lastName email role createdAt updatedAt').populate('role');
    
        res.status(201).json({
            ok: true,
            users
        });
    } catch (error) {
        console.log(error);
    }
}

const updateUser = async (req, res = response) => {

    const userId = req.params.id;
    const _id = req._id; //Almacena el id del usuario logueado

    try {

        const user = await User.findById(userId); //Usuario que se quiere modificar
        const userLogged = await User.findById(_id); //Usuario logueado

        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: 'Este usuario no existe por ese id.'
            });
        }

        const loggedRole = userLogged.role.toString();
        //console.log(userId, _id)
        //console.log(loggedRole, '6394dccf474e3e52e12b4958')

        if (userId !== _id && loggedRole !== '6394dccf474e3e52e12b4958') { //
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
        const userLogged = await User.findById(_id); //Usuario logueado

        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: 'Este usuario no existe por ese id.'
            });
        }

        const loggedRole = userLogged.role.toString();

        if (loggedRole !== '6394dccf474e3e52e12b4958') {
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
    getOneUsers,
    updateUser,
    deleteUser
}
//------------------------------------------------------------------------------------14----------------------------------------------------------------------------------