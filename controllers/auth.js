//------------------------------------------------------------------------------------8----------------------------------------------------------------------------------
const bcrypt = require('bcryptjs');
//------------------------------------------------------------------------------------8----------------------------------------------------------------------------------
//------------------------------------------------------------------------------------7----------------------------------------------------------------------------------
const User = require('../models/User');
const Role = require('../models/Role');
//------------------------------------------------------------------------------------7----------------------------------------------------------------------------------
//------------------------------------------------------------------------------------10----------------------------------------------------------------------------------
const { generateJWT } = require('../helpers/jwt');
//------------------------------------------------------------------------------------10----------------------------------------------------------------------------------
//------------------------------------------------------------------------------------4----------------------------------------------------------------------------------
const { response } = require('express');

const registerUser = async (req, res = response) => {

    const { email, password } = (req.body); 
    const role = await Role.findOne({name:'user'}); //Setea por defecto al usuario el rol de user.
    req.body.role=role._id; 

    try {

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo.'
            });
        }

        user = new User(req.body);

        //------------------------------------------------------------------------------------8----------------------------------------------------------------------------------
        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
        //------------------------------------------------------------------------------------8----------------------------------------------------------------------------------

        //------------------------------------------------------------------------------------10----------------------------------------------------------------------------------
        await user.save();

        //Generar JWT
        const token = await generateJWT(user.id, user.name);

        res.status(201).json({
            ok: true,
            _id: user.id,
            name: user.name,
            token
        })
        //------------------------------------------------------------------------------------10----------------------------------------------------------------------------------

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor contacte con el administrador.'
        });
    }

}
//------------------------------------------------------------------------------------9----------------------------------------------------------------------------------
const loginUser = async (req, res = response) => {

    const { email, password } = (req.body);

    try {

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario no existe con ese correo.'
            });
        }

        //Confirmar los passwords
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecto.'
            })
        }

        //Generar JWT
        const token = await generateJWT(user.id, user.name);

        res.json({
            ok: true,
            _id: user.id,
            name: user.name,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor contacte con el administrador.'
        });
    }
}
//------------------------------------------------------------------------------------9----------------------------------------------------------------------------------
const revalidateToken = async (req, res = response) => {

    const { _id, name } = req;

    //Generar JWT
    const token = await generateJWT(_id, name);

    res.json({
        ok: true,
        _id, name,
        token
    })
}

module.exports = {
    registerUser,
    loginUser,
    revalidateToken
}
//------------------------------------------------------------------------------------4----------------------------------------------------------------------------------