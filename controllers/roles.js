const Role = require('../models/Role');

const getRoles = async (req, res) => {

    const roles = await Role.find();

    res.status(201).json({
        ok: true,
        roles
    })
};

const createRole = async (req, res = response) => {

    const {name} = req.body;
    const role = new Role({name});

    try {
        role.userId = req._id;

        const saveRole = await role.save();

        res.json({
            ok: true,
            role: saveRole
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador.'
        })
    }
}

const updateRole = async (req, res = response) => {

    const roleId = req.params.id;
    const _id = req._id;

    try {

        const role = await Role.findById(roleId);

        if (!role) {
            return res.status(404).json({
                ok: false,
                msg: 'Este usuario no existe por ese id.'
            });
        }

        if (role.role.toString() !== _id) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este rol.'
            });
        }

        const newRole = {
            ...req.body,
            role: _id
        }

        const updateRole = await Role.findByIdAndUpdate(roleId, newRole, { new: true });

        res.json({
            ok: true,
            role: updateRole
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador.'
        });
    }
}

const deleteRole = async (req, res = response) => {

    const roleId = req.params.id;
    const _id = req._id;

    try {

        const role = await Role.findById(roleId);

        if (!role) {
            return res.status(404).json({
                ok: false,
                msg: 'El rol no existe por ese id.'
            });
        }

        if (role.role.toString() !== _id) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar este rol.'
            });
        }

        await Role.findByIdAndDelete(roleId);

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

module.exports = { getRoles, createRole, updateRole, deleteRole }