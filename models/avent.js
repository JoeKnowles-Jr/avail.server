const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define our model
const aventSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    avails: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Avail"
    }],
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    requests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group"
    }
}, { timestamps: true });

aventSchema.methods.addUser = function (uid) {
    this.users.addToSet(uid);
    this.save();
}

aventSchema.methods.addAvail = function (aid) {
    this.avails.addToSet(aid);
    this.save();
}

aventSchema.methods.addRequest = function (rid) {
    this.requests.addToSet(rid);
    this.save();
}

module.exports = mongoose.model('Avent', aventSchema);
