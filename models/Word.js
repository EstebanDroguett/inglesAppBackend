//------------------------------------------------------------------------------------15----------------------------------------------------------------------------------
const { Schema, model } = require('mongoose');

const WordSchema = Schema({

    word: {
        type: String,
        required: true
    },
    meaning: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
    {
        timestamps: true,
        versionKey: false,
        paranoid: true
    });

// Para ver el _id como id y no mostrar la versión

WordSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Word', WordSchema);
//------------------------------------------------------------------------------------15----------------------------------------------------------------------------------