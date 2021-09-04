const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define our model
const availSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    date: {
        type: Date,
        required: true
    },
    start: {
        type: String,
        required: true
    },
    end: {
        type: String,
        required: true
    },
    avent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Avent"
    },
    note: { type: String, required: false }
}, { timestamps: true });

// create the model class
const model = mongoose.model('Avail', availSchema);

// export the model
module.exports = model;
