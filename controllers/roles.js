const Role = require('../models/Role');

const getRoles = async (req, res) =>{
  try{
  
    const roles = await Role.findAll();

    return res.status(200).json({
      message: 'Get all roles',
      data: roles
    })
  }catch(err){
    return res.status(500).json({
      message: 'Bad request',
      error: err.message
    })
  }
};

const createRole = async (req, res = response) => {

    const role = new Role(req.body);

    try {
        role.user = req._id;

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

        if (role.user.toString() !== _id) {
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

module.exports = {getRoles, createRole, deleteRole}