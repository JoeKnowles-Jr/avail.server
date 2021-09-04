const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

// User Schema
const UserSchema = mongoose.Schema({
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: true },
    needsPwUpdate: { type: Boolean, required: false },
    role: { type: String, required: false },
    groups: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
        required: false,
        default: []
    }],
    avents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Avent",
        required: false,
        default: []
    }],
    avails: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Avail",
        required: false,
        default: []
    }]
}, { timestamps: true });

UserSchema.pre('save', function (next) {
    // get access to the user model
    const user = this;

    if (!user.isModified('password')) return next();

    // hash our password using the salt
    bcrypt.hash(user.password, SALT_WORK_FACTOR, (err, hash) => {
        if (err) { return next(err); }

        // overwrite plain text password with encrypted password
        user.password = hash;
        next();
    });
});

UserSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) { return callback(err); }

        console.log("isMatch");
        console.log(isMatch);
        callback(null, isMatch);
    });
};

UserSchema.methods.addGroup = function (gid) {
    this.groups.addToSet(gid);
    this.save();
};

UserSchema.methods.addAvent = function (aid) {
    console.log(aid)
    this.avents.addToSet(aid);
    this.save();
};

UserSchema.methods.addAvail = function (aid) {
    this.avails.addToSet(aid);
    this.save();
};

module.exports = mongoose.model('User', UserSchema);
