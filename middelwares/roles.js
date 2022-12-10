const Role = require('../models/Role');
const User = require('../models/User');

const isAdmin = async (req, res, next) => {
    try{
        const _id = req._id;
        //console.log({User});

        const user = await User.findById(_id);
        const role = await Role.findById(user.role);

        if(role.name !== 'admin'){
            return res.status(403).json({
                message: 'No tienes privilegios para realizar esta función.'
            })
        }
        next();
    }catch(err){
        return res.status(500).json({
            message: 'Mala respuesta.',
            error: err.message
        })
    }
}

const isModerator = async (req, res, next) => {
    try{
        const _id = req._id;
        //console.log({User});

        const user = await User.findById(_id);
        const role = await Role.findById(user.role);

        if(role.name !== 'moderator'){
            return res.status(403).json({
                message: 'No tienes privilegios para realizar esta función.'
            })
        }
        next();
    }catch(err){
        return res.status(500).json({
            message: 'Mala respuesta.',
            error: err.message
        })
    }
}

module.exports = {
    isAdmin,
    isModerator
}