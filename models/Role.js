//------------------------------------------------------------------------------------7----------------------------------------------------------------------------------
const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
    name: String,
},
    {
        versionKey: false,
        paranoid: true
    }
);

module.exports = model('Role', RoleSchema);
//------------------------------------------------------------------------------------7----------------------------------------------------------------------------------