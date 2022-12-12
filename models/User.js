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
        type: Schema.Types.ObjectId,
        ref: 'Role',
        required: true,
    },
},
    {
        timestamps: true,
        versionKey: false,
        paranoid: true
    }
);

module.exports = model('User', UserSchema);
//------------------------------------------------------------------------------------7----------------------------------------------------------------------------------