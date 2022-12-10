//------------------------------------------------------------------------------------15----------------------------------------------------------------------------------
const { Schema, model } = require('mongoose');

const VerbSchema = Schema({

    verb: {
        type: String,
        required: true,
    },
    meaning: {
        type: String,
        required: true,
    },
    presentSimple: {
        type: String,
        required: true,
    },
    presentContinuous: {
        type: String,
        required: true,
    },
    presentPerfect: {
        type: String,
        required: true,
    },
    presentPerfectContinuous: {
        type: String,
        required: true,
    },
    pastSimple: {
        type: String,
        required: true,
    },
    pastContinuous: {
        type: String,
        required: true,
    },
    pastPerfect: {
        type: String,
        required: true,
    },
    pastPerfectContinuous: {
        type: String,
        required: true,
    },
    futureSimple: {
        type: String,
        required: true,
    },
    futureContinuous: {
        type: String,
        required: true,
    },
    futurePerfect: {
        type: String,
        required: true,
    },
    futurePerfectContinuous: {
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

VerbSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Verb', VerbSchema);
//------------------------------------------------------------------------------------15----------------------------------------------------------------------------------