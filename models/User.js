//------------------------------------------------------------------------------------7----------------------------------------------------------------------------------
const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
},
    {
        timestamps: true,
        versionKey: false
    }
);

module.exports = model('User', UserSchema);
//------------------------------------------------------------------------------------7----------------------------------------------------------------------------------