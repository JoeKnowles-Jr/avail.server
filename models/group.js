const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define our model
const groupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: []
    }],
    avents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Avent",
        default: []
    }],
    invites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: []
    }],
    restricted: { type: Boolean, required: false, default: true },
    requests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: []
    }],
    note: { type: String, required: false }
}, { timestamps: true });

groupSchema.methods.addJoinRequest = function (uid) {
    this.requests.addToSet(uid);
    this.save();
}

groupSchema.methods.addInvite = function (iid) {
    this.invites.addToSet(iid);
    this.save();
}

groupSchema.methods.addUser = function (uid) {
    this.users.addToSet(uid);
    this.save();
}

groupSchema.methods.addAvent = function (aid) {
    this.avents.addToSet(aid);
    this.save();
}

module.exports = mongoose.model('Group', groupSchema);
